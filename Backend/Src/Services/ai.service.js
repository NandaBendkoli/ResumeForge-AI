import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const interviewReportSchema = z.object({

    title: z.string().describe(
        "The title of the job for which the interview report is generated!"
    ),

    matchScore: z.number().describe(
        "A percentage score representing how well the candidate's resume, skills, and experience match the job description requirements."
    ),

    technicalQuestions: z.array(
        z.object({

            question: z.string()
                .describe(
                    "A technical interview question based on the candidate's resume, skills, projects, and job description."
                ),

            intention: z.string()
                .describe(
                    "The reason why the interviewer is asking this technical question and what skill or knowledge is being evaluated."
                ),

            answer: z.string()
                .describe(
                    "A detailed and professional approach for answering the technical question including key concepts, examples, and important points to cover."
                )

        })
    ).describe(
        "A list of technical interview questions along with interviewer intentions and ideal answering approaches."
    ),

    behavioralQuestions: z.array(
        z.object({

            question: z.string()
                .describe(
                    "A behavioral or HR interview question related to teamwork, communication, leadership, challenges, or career goals."
                ),

            intention: z.string()
                .describe(
                    "The purpose behind asking the behavioral question and the personality trait or soft skill being evaluated."
                ),

            answer: z.string()
                .describe(
                    "A professional and structured way to answer the behavioral question using real examples and the STAR method when applicable."
                )

        })
    ).describe(
        "A list of behavioral interview questions with interviewer intentions and ideal response strategies."
    ),

    skillGaps: z.array(
        z.object({

            severity: z.string()
                .describe(
                    "The importance level of the missing or weak skill such as low, medium, or high."
                ),

            skill: z.string()
                .describe(
                    "The skill, technology, concept, or area where the candidate needs improvement for the target role."
                )

        })
    ).describe(
        "A list of missing or weak skills identified from the comparison between the resume and the job description."
    ),

    preparationPlan: z.array(
        z.object({

            day: z.number()
                .describe(
                    "The day number or timeline for the preparation schedule."
                ),

            focus: z.string()
                .describe(
                    "The primary learning topic or interview preparation area to focus on for that day."
                ),

            tasks: z.array(
                z.string()
                    .describe(
                        "A specific preparation task, practice activity, or learning goal for the day."
                    )
            )

        })
    ).describe(
        "A structured interview preparation roadmap with daily focus areas and actionable learning tasks."
    ),

});

// export const generateInterviewReport = async ({
//     resume,
//     selfDescription,
//     jobDescription
// }) => {

//     try {

//         const prompt = `
// You are an expert AI Interview Preparation Assistant.

// Analyze the candidate's resume, self description, and the target job description carefully.

// Generate a complete interview preparation report in VALID JSON format only.

// IMPORTANT RULES:
// - Return ONLY valid JSON.
// - Do NOT add markdown.
// - Do NOT add explanation text.
// - Do NOT use snake_case.
// - Use EXACT field names provided below.
// - All arrays must contain proper JSON objects.
// - matchScore must be a number between 0 and 100.

// Use EXACTLY this JSON structure:

// {
//   "matchScore": 0,
//   "technicalQuestions": [
//     {
//       "question": "",
//       "intention": "",
//       "answer": ""
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "",
//       "intention": "",
//       "answer": ""
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "",
//       "severity": ""
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "",
//       "tasks": [
//         ""
//       ]
//     }
//   ]
// }

// Instructions for report generation:

// 1. Match Score
// - Give a realistic score based on how well the candidate matches the job description.

// 2. Technical Questions
// - Generate technical interview questions based on:
//   - candidate skills
//   - projects
//   - technologies
//   - job requirements

// 3. Behavioral Questions
// - Generate HR and behavioral interview questions.

// 4. Skill Gaps
// - Identify missing or weak skills compared to the job description.

// 5. Preparation Plan
// - Create a 7-day preparation roadmap.

// Candidate Resume:
// ${resume}

// Candidate Self Description:
// ${selfDescription}

// Target Job Description:
// ${jobDescription}
// `;

//         const response = await ai.models.generateContent({

//             // model: "gemini-3.1-pro-preview",
//             model: "gemini-2.0-flash",

//             contents: prompt,

//             config: {
//                 responseMimeType: "application/json"
//             }

//         });

//         const parsedData =
//             JSON.parse(response.text);

//         const validatedData =
//             interviewReportSchema.parse(parsedData);

//         // console.log(
//         //     JSON.stringify(
//         //         validatedData,
//         //         null,
//         //         2
//         //     )
//         // );

//         return validatedData;

//     } catch (error) {

//         console.log(error);

//     }

// };


export const generateInterviewReport = async ({
    resume,
    selfDescription,
    jobDescription
}) => {

    try {

        const prompt = `
You are an expert AI Interview Preparation Assistant.

Analyze the candidate resume, self description, and target job description carefully.

Generate COMPLETE interview preparation report.

IMPORTANT:
- Return ONLY VALID JSON
- No markdown
- No explanation text
- No backticks

Return EXACTLY this structure:

{
  "title": "Full Stack Developer Intern",

  "matchScore": 85,

  "technicalQuestions": [
    {
      "question": "Explain JWT authentication.",
      "intention": "Check backend authentication knowledge.",
      "answer": "JWT authentication works by..."
    }
  ],

  "behavioralQuestions": [
    {
      "question": "Tell me about yourself.",
      "intention": "Evaluate communication skills.",
      "answer": "Start with your background..."
    }
  ],

  "skillGaps": [
    {
      "skill": "Docker",
      "severity": "Medium"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "React Revision",
      "tasks": [
        "Revise hooks",
        "Build mini project"
      ]
    }
  ]
}

Generate:
- minimum 1 technicalQuestions
- minimum 1 behavioralQuestions
- minimum 1 skillGaps
- complete 1-day preparationPlan

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}
`;

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt,

            config: {
                responseMimeType: "application/json"
            }

        });

        console.log("RAW RESPONSE:");
        console.log(response.text);

        const parsedData =
            JSON.parse(response.text);

        console.log("PARSED DATA:");
        console.log(parsedData);

        const validatedData =
            interviewReportSchema.parse(parsedData);

        return validatedData;

    } catch (error) {

        console.log("AI ERROR:");
        console.log(error);

        throw error;
    }

};