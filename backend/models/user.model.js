import mongoose from "mongoose";

const userSchema =new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        isAccountVerified:{
            type: Boolean,
            default:false,
        },
        lastLogin:{
            type: Date,
            default: Date.now,
        },
        verifyOtp: Number,
        verifyOtpExpiresAt: Date,
        resetPasswordToken: String,
        resetPasswordTokenExpiresAt: Date,
    },
    {timestamps: true}
);

export const User = mongoose.model("User", userSchema);
