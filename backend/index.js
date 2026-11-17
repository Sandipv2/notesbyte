import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRouter from './routes/auth.route.js';
import noteRouter from './routes/note.route.js';

import connectDB from './config/mongodb.js';


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running http://localost:${PORT}`);
})