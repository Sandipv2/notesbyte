import { User } from "../models/user.model.js";
import { Note } from "../models/note.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendAccountDeletedMail, sendPasswordResetMail, sendPasswordResetSuccessMail, sendVerificationMail, sendWelcomeMail } from "../emails/emails.js";

import bcrypt from "bcryptjs";

import crypto from "crypto";


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyOtp = crypto.randomInt(100000, 1000000);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verifyOtp,
            verfiyOtpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationMail(user.name, user.email, verifyOtp);

        res.status(201).json({
            success: true,
            message: "User creates successfully",
            user: {
                ...user.toObject(),
                password: undefined,
            }
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId;

    try {
        const submittedOtp = Number(otp);
        if (otp === undefined || otp === null || !Number.isInteger(submittedOtp)) {
            return res.status(400).json({
                success: false,
                message: "OTP is required",
            })
        }
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Not registered.",
            })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found - register first"
            });
        }

        if (new Date() > user.verfiyOtpExpiresAt) {
            return res.status(400).json({
                success: false,
                message: "OTP, expired! Try again."
            })
        }

        if (user.verifyOtp !== submittedOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP!"
            })
        }

        user.isAccountVerified = true;
        user.verifyOtp = undefined;
        user.verfiyOtpExpiresAt = undefined;
        await user.save();

        await sendWelcomeMail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user.toObject(),
                password: undefined,
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

export const resendOtp = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not registered!"
            })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found while resending OTP!"
            })
        }

        if (user.isAccountVerified) {
            return res.status(400).json({
                success: false,
                message: "Account is already verified."
            });
        }

        const otp = crypto.randomInt(100000, 1000000);
        user.verifyOtp = otp;
        user.verfiyOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await user.save();
        await sendVerificationMail(user.name, user.email, otp);

        res.status(200).json({
            success: true,
            message: "OTP Resent successfully."
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                ...user.toObject(),
                password: undefined,
            }
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email does not exists."
            });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetMail(user.name, user.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: "Password reset link sent."
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: "Password and token are required."
            });
        }

        const user = await User.findOne({ resetPasswordToken: token });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }

        if (user.resetPasswordTokenExpiresAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Reset password token expired, try again."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();

        await sendPasswordResetSuccessMail(user.name, user.email);

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password").lean();

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found while deleting the account."
            })
        }

        await Note.deleteMany({ userId });
        await User.findByIdAndDelete(userId);

        await sendAccountDeletedMail(user.name, user.email);

        res.clearCookie("token");

        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}