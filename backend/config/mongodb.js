import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectDB() {
    try {   
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        console.log('Database connected successfully!');
    } catch(err) {
        console.log('MongoDB connection error: ',err.mesaage);
    }
}

export default connectDB;