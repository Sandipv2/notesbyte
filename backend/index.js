import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route.js';

import connectDB from './config/mongodb.js';


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running http://localost:${PORT}`);
})