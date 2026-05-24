import * as pdfParse from "pdf-parse";
import { generateInterviewReport } from "../Services/ai.service.js";
import { errorResponse, successResponse } from "../Util/responses.js";
import InterviewReportModel from "../Model/interview.report.model.js";
import { getNextSequence } from "../Util/index.js";
export const generateInterviewReports = async (req, res) => {
    try {
        const resumeFile = req.file;
        // const resumeContent = pdfParse(req.file.buffer);
        // const resumeContent = await (new pdfParse.PDFParse(req.file.buffer)).getText()
        const uint8Array = new Uint8Array(req.file.buffer);
        const interviewId = await getNextSequence("InterviewReport", 100000);


        const resumeContent =
            await (
                new pdfParse.PDFParse(uint8Array)
            ).getText();

        const { selfDescription, jobDescription } = req.body

        const response = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });
        const interviewReport = await InterviewReportModel.create({
            interviewId: `InterviewReport_${interviewId}`,
            user: req.user.userId,
            resumeScript: resumeContent.text,
            selfDescription,
            jobDescription,
            ...response,
        })
        return successResponse(res, "Interview report generated successfully!", interviewReport);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error occurred during interview report generation!", 500);
    }

}

export const getInterviewReportWithId = async (
    req,
    res
) => {

    try {
        const { interviewId } = req.params;;

        // validation
        if (!interviewId) {

            return errorResponse(
                res,
                "Report id is required",
                400
            );

        }

        // find report
        const interviewReport =
            await InterviewReportModel.findOne({
                interviewId
            }).select("-resumeScript -selfDescription -jobDescription")

        // check report exists
        if (!interviewReport) {

            return errorResponse(
                res,
                "Interview report not found",
                404
            );

        }

        // authorization
        if (
            interviewReport.user.toString()
            !== req.user.userId
        ) {

            return errorResponse(
                res,
                "Unauthorized access to this report",
                403
            );

        }

        return successResponse(
            res,
            "Interview report retrieved successfully",
            interviewReport
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            "Error occurred while fetching interview report",
            500
        );

    }

};

export const getAllInterviewReports = async (req, res) => {

    try {
        const interviewReports = await InterviewReportModel.find().select("-resumeScript -selfDescription -jobDescription")
        return successResponse(res, "Interview reports fetched successfully", interviewReports)
    } catch (error) {
        console.log(error);
        return errorResponse(
            res,
            "Error occurred while fetching interview reports",
            500
        );
    }
}