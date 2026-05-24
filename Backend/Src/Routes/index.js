import express from "express";
import userRoutes from "./user.route.js";
import interviewReportRoutes from "./interview.route.js";

const router = express.Router();

router.use("/user",userRoutes);
router.use("/interviewReport",interviewReportRoutes);

export default router;