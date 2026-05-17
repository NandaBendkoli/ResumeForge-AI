import UserModel from "../Model/user.model.js";
import { getNextSequence } from "../Util/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
    errorResponse,
    successResponse
} from "../Util/responses.js";


dotenv.config();

export const createUser = async (req, res) => {

    try {

        const { name, email, password, gender } = req.body;

        // validation
        if (!name || !email || !password || !gender) {

            return errorResponse(
                res,
                "All fields are required!",
                400
            );

        }

        // check existing email
        const isFoundEmail = await UserModel.findOne({
            email,
            isDeleted: false
        });

        if (isFoundEmail) {

            return errorResponse(
                res,
                "User already exists with this email!",
                400
            );

        }

        // generate custom user id
        const userId = await getNextSequence(
            "User",
            100000
        );
        console.log(userId)

        // hash password
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(
            password,
            salt
        );

        // create user
        const response = await UserModel.create({
            userId: `User_${userId}`,
            name,
            email,
            password: hashPassword,
            gender
        });

        // remove password from response
        response.password = undefined;

        return successResponse(
            res,
            "User created successfully!",
            response
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            "Error occurred during user creation!",
            500
        );

    }

};


export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // validation
        if (!email || !password) {

            return errorResponse(
                res,
                "Email and password are required!",
                400
            );

        }

        // check user
        const user = await UserModel.findOne({
            email,
            isDeleted: false
        });

        if (!user) {

            return errorResponse(
                res,
                "User not found! Please Sign Up",
                404
            );

        }

        // compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return errorResponse(
                res,
                "Invalid password!",
                400
            );

        }

        // =========================
        // ACCESS TOKEN
        // =========================

        const accessToken = jwt.sign(
            {
                userId: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender
            },
            process.env.SECRETE_KEY,
            {
                expiresIn: "15m"
            }
        );
        const refreshToken = jwt.sign(
            {
                userId: user._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // save refresh token in DB
        user.refreshToken = refreshToken;

        await user.save();

        // store refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // hide password
        user.password = undefined;

        return successResponse(
            res,
            "Login Successfully!",
            {
                accessToken,
                user
            }
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            "Error occurred during login!",
            500
        );

    }

};

export const logoutUser = async (req, res) => {

    try {

        const { userId } = req.body;

        if (!userId) {

            return errorResponse(
                res,
                "UserId is required!",
                400
            );

        }

        // find user
        const user = await UserModel.findOne({
            userId,
            isDeleted: false
        });

        // check user
        if (!user) {

            return errorResponse(
                res,
                "User not found!",
                404
            );

        }

        // get token
        const token = user.token;

        // save token in blacklist
        await blackListModel.create({
            token
        });

        // remove token from user
        user.token = null;

        await user.save();

        return successResponse(
            res,
            "Logout Successfully!"
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            "Error occurred during logout!",
            500
        );

    }

};

export const getAllUser = async (req, res) => {

    try {

        const users = await UserModel.find({
            isDeleted: false
        }).select("-password");

        if (!users.length) {

            return errorResponse(
                res,
                "No users found!",
                404
            );

        }

        return successResponse(
            res,
            "Users fetched successfully!",
            users
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            "Error fetching users!",
            500
        );

    }

};


export const updateUser = async (req, res) => {

    try {

        const { userId, name, gender, email } = req.body;

        if (!userId) {

            return errorResponse(
                res,
                "UserId is required!",
                400
            );

        }

        const updatedUser = await UserModel.findOneAndUpdate(
            {
                userId,
                isDeleted: false
            },
            {
                name,
                gender,
                email
            },
            {
                new: true
            }
        ).select("-password");

        if (!updatedUser) {

            return errorResponse(
                res,
                "User not found!",
                404
            );

        }

        return successResponse(
            res,
            "User updated successfully!",
            updatedUser
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            "Error updating user!",
            500
        );

    }

};

export const deleteUser = async (req, res) => {

    try {

        const { userId } = req.body;

        if (!userId) {

            return errorResponse(
                res,
                "UserId is required!",
                400
            );

        }

        const deletedUser = await UserModel.findOneAndUpdate(
            {
                userId,
                isDeleted: false
            },
            {
                isDeleted: true
            },
            {
                new: true
            }
        );

        if (!deletedUser) {

            return errorResponse(
                res,
                "User not found!",
                404
            );

        }

        return successResponse(
            res,
            "User deleted successfully!"
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            "Error deleting user!",
            500
        );

    }

};