import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/notes"
    : "/api/notes";

const noteAPI = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
});

export const useNoteStore = create((set) => ({
    notes: [],
    isLoading: false,

    createNote: async (noteData) => {
        try {
            set({ isLoading: true });
            const { data } = await noteAPI.post('/', noteData);
            set({ isLoading: false });
            toast.success("Note created!");
            return data;
        } catch (error) {
            set({ isLoading: false });
            toast.error(err.response.data.message || err.message);
            throw error;
        }
    },

    getAllNotes: async () => {
        try {
            set({ isLoading: true });
            const { data } = await noteAPI.get('/');

            set({ isLoading: false, notes: data.notes });
            return data;
        } catch (error) {
            set({ isLoading: false });
            toast.error(err.response.data.message || err.message);
            throw error;
        }
    },

    updateNote: async (noteId, noteData) => {
        try {
            set({ isLoading: true });

            const { data } = await noteAPI.put(`/${noteId}`, noteData);
            set({ isLoading: false });
            return data;
        } catch (error) {
            set({ isLoading: false });
            toast.error(err.response.data.message || err.message);
            throw error;
        }
    },

    deleteNote: async (noteId) => {
        try {
            set({ isLoading: true });

            const { data } = await noteAPI.delete(`/${noteId}`);
            set({ isLoading: false });
            return data;

        } catch (error) {
            set({ isLoading: false });
            toast.error(err.response.data.message || err.message);
            throw error;
        }
    },

    getNote: async (noteId) => {
        try {
            set({ isLoading: true });

            const { data } = await noteAPI.get(`/${noteId}`);
            set({ isLoading: false });
            return {...data.note, isOwner: data.isOwner};
        } catch (error) {
            set({ isLoading: false });
            toast.error(error.response.data.message || error.message);
            throw error;
        }
    }
}));