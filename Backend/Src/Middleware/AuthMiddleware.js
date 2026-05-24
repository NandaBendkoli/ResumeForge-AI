import { errorResponse } from "../Util/responses.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


export const AuthMiddlware = (req, res, next) => {

    try {

        let accessToken = req.cookies && req.cookies.accessToken;

        // fallback to Authorization header if cookie not present
        if (!accessToken) {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                accessToken = authHeader.split(" ")[1];
            }
        }

        if (!accessToken) {
            return errorResponse(
                res,
                "No token found!"
            );
        }

        const decode = jwt.verify(
            accessToken,
            process.env.SECRETE_KEY
        );

        req.user = decode;

        next();

    }

    catch (error) {

        return errorResponse(
            res,
            "Invalid token!"
        );

    }

}