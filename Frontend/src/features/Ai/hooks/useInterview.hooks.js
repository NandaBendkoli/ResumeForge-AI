import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportWithId
} from "../Services/interview.api.js";

import { useContext } from "react";

import { InterviewContext }
    from "../Interview.context";

export const useInterview = () => {

    const context =
        useContext(InterviewContext);

    if (!context) {

        throw new Error(
            "useInterview must be used within an InterviewProvider"
        );

    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

    // GENERATE REPORT
    const generateReport = async ({
        resumeFile,
        jobDescription,
        selfDescription
    }) => {

        setLoading(true);

        try {

            const response =
                await generateInterviewReport({
                    resumeFile,
                    jobDescription,
                    selfDescription
                });

            // setReport(
            //     response.interviewReport
            // );
            setReport(response.data);

            return response;

        } catch (error) {

            console.error(
                "Error generating interview report:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    // GET REPORT BY ID
    const getReportsById = async ({
        interviewId
    }) => {

        setLoading(true);

        try {

            const response =
                await getInterviewReportWithId({
                    interviewId
                });

            setReport(response.data);

        } catch (error) {

            console.error(
                "Error fetching interview report:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    // GET ALL REPORTS
    const getAllReports = async () => {

        setLoading(true);

        try {

            const response =
                await getAllInterviewReports();

          setReport(response.data);

        } catch (error) {

            console.error(
                "Error fetching interview reports:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportsById,
        getAllReports
    };

};