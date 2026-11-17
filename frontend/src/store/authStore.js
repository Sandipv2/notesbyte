import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const backendUrl = import.meta.env.MODE == 'development'
    ? 'http://localhost:3000/api/auth'
    : '/api/auth';


const authAPI = axios.create({
    baseURL: backendUrl,
    withCredentials: true
})

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    isLoggedIn: false,

    signup: async (name, email, password) => {
        set({ isLoading: true });
        try {
            const { data } = await authAPI.post('/register', {
                name,
                email,
                password
            });

            set({
                user: data.user,
                isLoading: false,
                isLoggedIn: true,
            })

            toast.success("OTP sent to your mail");
            return data;
        } catch (error) {
            set({ isLoading: false });
            toast.error(error.response?.data?.message || error.message);
            throw err;
        }
    },

    verifyEmail: async (otp) => {
        set({ isLoading: true });
        try {
            const { data } = await authAPI.post('/verify-email', { otp });

            set({
                user: data.user,
                isLoading: false,
                isLoggedIn: true,
            })

            toast.success("Email verified");
            return data;
        } catch (error) {
            set({ isLoading: false });
            toast.error(error.response?.data?.message || error.message);
            throw err;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const { data } = await authAPI.post('/login', { email, password });

            set({
                user: data.user,
                isLoading: false,
                isLoggedIn: true,
            })

            return data;
        } catch (error) {
            set({ isLoading: false });
            toast.error(error.response?.data?.message || error.message);
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            const { data } = await authAPI.post('/logout');
            set({ isLoading: false, user: null, isLoggedIn: false });

            return data;
        } catch (err) {
            set({ isLoading: false });
            toast.error(err.response?.data?.message || err.message);
            throw err;
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true });
        try {
            const { data } = await authAPI.post('/forgot-password', { email });
            set({ isLoading: false });
            toast.success("Reset link sent to your mail");

            return data;
        } catch (err) {
            set({ isLoading: false });
            toast.error(err.response?.data?.message || err.message);
            throw err;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true });
        try {
            const { data } = await authAPI.post(`/reset-password/${token}`, { password });

            set({ isLoading: false });
            toast.success("Password reset success");

            return data;
        } catch (err) {
            set({ isLoading: false });
            toast.error(err.response?.data?.message || err.message);
            throw err;
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const { data } = await authAPI.get('/check-auth');

            set({ isLoading: false, user: data.user, isLoggedIn: true });

            return data;
        } catch (err) {
            set({ isLoading: false, user: null, isLoggedIn: false });
            return null
        }
    },

    deleteAccount: async () => {
        set({ isLoading: true });
        try {
            const { data } = await authAPI.post('/delete-account');

            set({ isLoading: false });
            toast.success("Account deleted!");

            return data;
        } catch (err) {
            set({ isLoading: false });
            toast.error(err.response?.data?.message || err.message);
            throw err;
        }
    }
}))