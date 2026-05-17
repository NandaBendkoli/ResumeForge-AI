import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDb = async () => {
    try {
        const url = process.env.MONGODB_URL;
        await mongoose.connect(url);

        console.log("Connection Sucessfull!".bgMagenta);

    }
    catch (error) {
        console.log("Error in connection with mongodb!");
    }
}