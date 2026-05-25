import axios from "axios";


const api = axios.create({
    // baseURL: "http://localhost:8070/ResumeForge-AI/web/v1",
    baseURL: import.meta.env.VITE_API_URL +
        "/ResumeForge-AI/web/v1",

    withCredentials: true,
});

export const generateInterviewReport = async ({ resumeFile, jobDescription, selfDescription }) => {

    try {
        const formData = new FormData();
        formData.append("resumeFile", resumeFile);
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);


        const accessToken = localStorage.getItem("accessToken");

        const response = await api.post("/interviewReport/generateInterviewReports", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error generating interview report:", error);
        throw error;

    }

}
export const getInterviewReportWithId = async ({ interviewId }) => {
    try {
        const response = await api.get(`/interviewReport/getInterviewReportWithId/${interviewId}`);
        return response.data;

    } catch (error) {
        console.error("Error fetching interview report:", error);
        throw error;
    }

}
export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/interviewReport/getAllInterviewReports");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching interview report:", error);
        throw error;
    }

}


