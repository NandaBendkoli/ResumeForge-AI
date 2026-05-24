import express from "express";

import {
    createUser,
    getAllUser,
    loginUser,
    updateUser,
    deleteUser,
    logoutUser,
    getUser
} from "../Controller/user.controller.js";
import { AuthMiddlware } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.get("/getAllUser", getAllUser);

router.post("/updateUser", updateUser);

router.post("/deleteUser", deleteUser);

router.post("/logoutUser", AuthMiddlware, logoutUser);

router.post("/getUser", getUser);

export default router;