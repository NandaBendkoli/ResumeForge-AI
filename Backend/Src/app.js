import express from "express";
import { connectToDb } from "../mongodb/db.js";
import router from "./Routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        // "vercel"
    ],

    credentials: true
}))

// connection with mongodb
connectToDb();

// routes
app.use("/ResumeForge-AI/web/v1", router);



export default app;
