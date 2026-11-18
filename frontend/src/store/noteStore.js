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

    
}));
