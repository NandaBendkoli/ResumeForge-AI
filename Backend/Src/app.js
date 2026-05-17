import express from "express";
import { connectToDb } from "../mongodb/db.js";
import router from "./Routes/index.js";
import cookieParser from "cookie-parser";



const app = express();

app.use(express.json())
app.use(cookieParser());

// connection with mongodb
connectToDb();

// routes
app.use("/ResumeForge-AI/web/v1", router);



export default app;
