import mongoose from "mongoose";


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }

}, { _id: false })

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }

}, { _id: false })

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    }

}, { _id: false })

const prepationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    focus: {
        type: String,
        required: true

    },
    tasks: [{
        type: String,
        required: true
    }]
})
const interviewReportSchema = new mongoose.Schema({
    interviewId: {
        type: String,
        unique: true,

    },
    jobDescription: {
        type: String,
        required: true
    },
    resumeScript: {
        type: String,

    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100

    },
    title: {
        type: String

    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [prepationPlanSchema],
    user: {
        type: String,
        ref: "user"
    }
}, { timestamps: true })

const InterviewReportModel = mongoose.model("interviewReport", interviewReportSchema);
export default InterviewReportModel 