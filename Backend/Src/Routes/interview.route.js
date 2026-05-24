import express from "express";
import { generateInterviewReports, getAllInterviewReports, getInterviewReportWithId } from "../Controller/interview.controller.js";
import { AuthMiddlware } from "../Middleware/AuthMiddleware.js";
import { upload } from "../Middleware/file.middleware.js";


const router = express.Router();

router.post("/generateInterviewReports", AuthMiddlware, upload.single("resumeFile"), generateInterviewReports)
router.post("/getInterviewReportWithId", AuthMiddlware, getInterviewReportWithId),
router.get("/getAllInterviewReports", AuthMiddlware,  getAllInterviewReports)

export default router 