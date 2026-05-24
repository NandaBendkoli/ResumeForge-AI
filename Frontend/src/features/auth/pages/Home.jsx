import React, { useState, useRef } from "react";
import { Upload, Sparkles, FileText, User } from "lucide-react";
import { useInterview } from "./../../Ai/hooks/useInterview.hooks";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport } = useInterview();
  const resumeRef = useRef(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [selfDescription, setSelfDescription] = useState(null);
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeRef.current.files[0];
    const data = await generateReport({
      resumeFile,
      jobDescription,
      selfDescription,
    });
    // navigate(`/interviewReport/${data.interviewReport.interviewId}`);
    navigate("/interview");
  };

  return (
    <main className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="w-full max-w-6xl">
        {/* HEADING */}

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Create Your Custom{" "}
            <span className="bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Interview Plan
            </span>
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        {/* MAIN CARD */}

        <div className=" bg-[#0f172a]border border-slate-800 rounded-3xlp-6shadow-2xl ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SIDE */}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <FileText size={18} className="text-pink-500" />
                  Target Job Description
                </h2>

                <span className="text-xs bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full">
                  REQUIRED
                </span>
              </div>

              <textarea
                name="jobDescription"
                onChange={(e) => {
                  setJobDescription(e.target.value);
                }}
                value={jobDescription}
                id="jobDescription"
                placeholder="Paste the full job description here..."
                className="w-full h-105 bg-[#1e293b] border border-slate-700 rounded-2xl p-5 text-white placeholder:text-slate-500 resize-none outline-non  focus:border-pink-500 transition-all"
              />
            </div>

            {/* RIGHT SIDE */}

            <div className="flex flex-col gap-5">
              {/* PROFILE HEADER */}

              <div className="flex items-center gap-2">
                <User size={18} className="text-pink-500" />

                <h2 className="text-white font-semibold">Your Profile</h2>
              </div>

              {/* FILE UPLOAD */}

              <div>
                <label className="text-slate-300 text-sm mb-2 block">
                  Upload Resume
                </label>

                <label
                  htmlFor="resume"
                  className="
                    w-full
                    h-42.5
                    border-2
                    border-dashed
                    border-slate-700
                    rounded-2xl
                    bg-[#1e293b]
                    flex
                    flex-col
                    items-center
                    justify-center
                    cursor-pointer
                    hover:border-pink-500
                    transition-all
                    gap-3
                  "
                >
                  <Upload size={35} className="text-pink-500" />

                  <div className="text-center">
                    <p className="text-white font-medium">
                      Click to upload or drag & drop
                    </p>

                    <p className="text-slate-400 text-sm mt-1">
                      PDF or DOCX (Max 5MB)
                    </p>
                  </div>

                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    className="hidden"
                    ref={resumeRef}
                  />
                </label>
              </div>

              {/* DIVIDER */}

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-700"></div>

                <span className="text-slate-500 text-sm">OR</span>

                <div className="flex-1 h-px bg-slate-700"></div>
              </div>

              {/* SELF DESCRIPTION */}

              <div>
                <label
                  htmlFor="selfDescription"
                  className="text-slate-300 text-sm mb-2 block"
                >
                  Quick Self-Description
                </label>

                <textarea
                  name="selfDescription"
                  onChange={(e) => {
                    setSelfDescription(e.target.value);
                  }}
                  value={selfDescription}
                  id="selfDescription"
                  placeholder="Briefly describe your experience, skills, and goals..."
                  className="
                    w-full
                    h-37.5
                    bg-[#1e293b]
                    border
                    border-slate-700
                    rounded-2xl
                    p-4
                    text-white
                    placeholder:text-slate-500
                    resize-none
                    outline-none
                    focus:border-pink-500
                    transition-all
                  "
                />
              </div>

              {/* INFO BOX */}

              <div
                className="
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  rounded-2xl
                  p-4
                  text-sm
                  text-blue-300
                "
              >
                Either a Resume or a Self Description is required to generate a
                personalized interview strategy.
              </div>

              {/* BUTTON */}

              <button
                className="
                  mt-2
                  w-full
                  py-4
                  rounded-2xl
                  bg-linear-to-r
                  from-pink-500
                  to-purple-600
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                "
                onClick={handleGenerateReport}
              >
                <Sparkles size={18} />
                Generate My Interview Strategy
              </button>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="
              mt-8
              pt-5
              border-t
              border-slate-800
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-4
            "
          >
            <p className="text-slate-500 text-sm">
              AI-Powered Strategy Generation · Approx 30s
            </p>

            <div className="flex items-center gap-5 text-sm text-slate-500">
              <button className="hover:text-white transition-all">
                Privacy Policy
              </button>

              <button className="hover:text-white transition-all">
                Terms of Service
              </button>

              <button className="hover:text-white transition-all">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
