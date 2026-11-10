import { Router } from "express";
import {
    checkAuth,
    deleteAccount,
    forgotPassword,
    login,
    logout,
    register,
    resendOtp,
    resetPassword,
    verifyEmail
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/verify-email', verifyToken, verifyEmail);
authRouter.post('/resend-otp', verifyToken, resendOtp);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);
authRouter.get('/check-auth', verifyToken, checkAuth);
authRouter.delete('/delete-account', verifyToken, deleteAccount);

export default authRouter;