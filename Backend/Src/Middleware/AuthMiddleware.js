import { errorResponse } from "../Util/responses.js";
import dotnev from "dotenv";
import jwt from "jsonwebtoken";
dotnev.config();


export const AuthMiddlware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return errorResponse(res, "No token found!");
        }
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.SECRETE_KEY);
        req.user = decode;

        next();
    }
    catch (error) {
        return errorResponse(res, "Invalid token!");

    }
}