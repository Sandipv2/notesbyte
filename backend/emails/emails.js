import { brevoClient } from "../config/brevo.js";
import {
    verificationTemplate,
    welcomeTemplate,
    passwordResetTemplate,
    resetPasswordSuccessTemplate,
    accountDeletedTemplate,
} from "./emailTemplates.js";

export const sendVerificationMail = async (name, email, otp) => {
    try {
        await brevoClient.post("", {
            sender: {
                email: process.env.SENDER_EMAIL,
                name: "Notesbyte",
            },
            to: [{ email }],
            subject: "Email verification OTP - Notesbyte",
            htmlContent: verificationTemplate
                .replace("{name}", name)
                .replace("{otp}", otp)
                .replace("{year}", new Date().getFullYear()),
        });
    } catch (err) {
        console.error(
            "Brevo verification mail error:",
            err.response?.data || err.message
        );
        throw new Error("Failed to send verification mail");
    }
};

export const sendWelcomeMail = async (email, name) => {
    try {
        await brevoClient.post("", {
            sender: { email: process.env.SENDER_EMAIL, name: "Notesbyte" },
            to: [{ email }],
            subject: "Welcome to Notesbyte!",
            htmlContent: welcomeTemplate
                .replace("{name}", name)
                .replace("{year}", new Date().getFullYear()),
        });
    } catch (err) {
        console.error("Brevo welcome mail error:", err.message);
        throw new Error("Failed to send welcome mail");
    }
};

export const sendPasswordResetMail = async (name, email, resetUrl) => {
    try {
        await brevoClient.post("", {
            sender: { email: process.env.SENDER_EMAIL, name: "Notesbyte" },
            to: [{ email }],
            subject: "Password reset mail - Notesbyte",
            htmlContent: passwordResetTemplate
                .replace("{name}", name)
                .replace("{resetLink}", resetUrl)
                .replace("{year}", new Date().getFullYear()),
        });
    } catch (err) {
        console.error("Brevo password reset error:", err.message);
        throw new Error("Failed to send password reset mail");
    }
};

export const sendPasswordResetSuccessMail = async (name, email) => {
    try {
        await brevoClient.post("", {
            sender: { email: process.env.SENDER_EMAIL, name: "Notesbyte" },
            to: [{ email }],
            subject: "Password reset successfully",
            htmlContent: resetPasswordSuccessTemplate
                .replace("{name}", name)
                .replace("{year}", new Date().getFullYear()),
        });
    } catch (err) {
        console.error("Brevo reset success error:", err.message);
        throw err;
    }
};

export const sendAccountDeletedMail = async (name, email) => {
    try {
        await brevoClient.post("", {
            sender: { email: process.env.SENDER_EMAIL, name: "Notesbyte" },
            to: [{ email }],
            subject: "Account deleted successfully!",
            htmlContent: accountDeletedTemplate
                .replace("{name}", name)
                .replace("{year}", new Date().getFullYear()),
        });
    } catch (err) {
        console.error("Brevo account deleted error:", err.message);
        throw err;
    }
};