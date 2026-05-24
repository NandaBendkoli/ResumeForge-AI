import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  MessageSquare,
  Users,
  MapPin,
  X,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { useInterview } from "../hooks/useInterview.hooks.js";

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { report } = useInterview();

  useEffect(() => {
    if (!report) return;

    setInterviewData({
      technicalQuestions: report?.technicalQuestions || [],

      behavioralQuestions: report?.behavioralQuestions || [],

      skillGaps: report?.skillGaps || [],

      preparationPlan: report?.preparationPlan || [],
    });

    setLoading(false);
  }, [report]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-white text-lg">Loading interview data...</div>
      </main>
    );
  }

  const technicalQuestions = interviewData?.technicalQuestions || [];
  const behavioralQuestions = interviewData?.behavioralQuestions || [];
  const skillGaps = interviewData?.skillGaps || [];
  const preparationPlan = interviewData?.preparationPlan || [];

  const currentQuestions =
    activeTab === "technical"
      ? technicalQuestions
      : activeTab === "behavioral"
        ? behavioralQuestions
        : preparationPlan;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-500/20 border-red-500/40 text-red-300";
      case "Medium":
        return "bg-yellow-500/20 border-yellow-500/40 text-yellow-300";
      case "Low":
        return "bg-green-500/20 border-green-500/40 text-green-300";
      default:
        return "bg-slate-500/20 border-slate-500/40 text-slate-300";
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Interview Preparation
          </h1>
          <p className="text-slate-400">
            Master your interview with AI-powered questions and guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sticky top-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-pink-500" />
                Content Type
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveTab("technical");
                    setSelectedQuestion(0);
                    setShowAnswer(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                    activeTab === "technical"
                      ? "bg-pink-500/20 border border-pink-500/40 text-pink-300"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    Technical
                  </span>
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>

                <button
                  onClick={() => {
                    setActiveTab("behavioral");
                    setSelectedQuestion(0);
                    setShowAnswer(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                    activeTab === "behavioral"
                      ? "bg-pink-500/20 border border-pink-500/40 text-pink-300"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users size={16} />
                    Behavioral
                  </span>
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>

                <button
                  onClick={() => {
                    setActiveTab("roadmap");
                    setSelectedQuestion(0);
                    setShowAnswer(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                    activeTab === "roadmap"
                      ? "bg-pink-500/20 border border-pink-500/40 text-pink-300"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    Prep Plan
                  </span>
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              </div>

              {/* PROGRESS BAR */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-slate-400 text-sm mb-3">Progress</p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${((selectedQuestion + 1) / currentQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  {selectedQuestion + 1} of {currentQuestions.length}
                </p>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 h-full min-h-96 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {activeTab === "technical"
                    ? "Technical Questions"
                    : activeTab === "behavioral"
                      ? "Behavioral Questions"
                      : "7-Day Prep Plan"}
                </h2>
              </div>

              {/* QUESTION CONTENT */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === "roadmap" ? (
                  <div className="space-y-4">
                    <div className="bg-[#1e293b] rounded-xl p-6 mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-pink-400 text-sm font-semibold">
                            Day {currentQuestions[selectedQuestion]?.day}
                          </span>
                          <h3 className="text-xl text-white font-bold mt-2">
                            {currentQuestions[selectedQuestion]?.focus}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-slate-300 text-sm font-semibold">
                          Tasks to Complete:
                        </p>
                        {currentQuestions[selectedQuestion]?.tasks.map(
                          (task, idx) => (
                            <div
                              key={idx}
                              className="flex gap-3 text-slate-400 text-sm"
                            >
                              <span className="text-pink-500 font-bold">•</span>
                              <p>{task}</p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#1e293b] rounded-xl p-8 space-y-6">
                    <div>
                      <span className="text-pink-400 text-sm font-semibold">
                        Question {selectedQuestion + 1} of{" "}
                        {currentQuestions.length}
                      </span>
                      <h3 className="text-xl text-white font-bold mt-3 leading-relaxed">
                        {currentQuestions[selectedQuestion]?.question}
                      </h3>
                    </div>

                    {/* INTENTION SECTION */}
                    <div className="bg-[#0f172a] rounded-lg p-4 border border-slate-700">
                      <p className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                        <AlertCircle size={16} className="text-blue-400" />
                        Interview Intention:
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {currentQuestions[selectedQuestion]?.intention}
                      </p>
                    </div>

                    {/* ANSWER SECTION */}
                    {showAnswer && (
                      <div className="bg-linear-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border border-pink-500/30 animate-in">
                        <p className="text-pink-300 text-sm font-semibold mb-2">
                          ✨ Suggested Answer Guide:
                        </p>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {currentQuestions[selectedQuestion]?.answer}
                        </p>
                      </div>
                    )}

                    {/* YOUR ANSWER AREA */}
                    <div>
                      <label className="text-slate-300 text-sm mb-3 block font-semibold">
                        Your Answer
                      </label>
                      <textarea
                        placeholder="Type your answer here and get instant AI feedback..."
                        className="w-full h-40 bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-500 resize-none outline-none focus:border-pink-500 transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-700">
                <button
                  onClick={() =>
                    setSelectedQuestion(Math.max(0, selectedQuestion - 1))
                  }
                  disabled={selectedQuestion === 0}
                  className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>

                {activeTab !== "roadmap" && (
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="px-8 py-3 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transition-all"
                  >
                    {showAnswer ? "Hide Answer" : "Show Answer Guide"}
                  </button>
                )}

                <button
                  onClick={() =>
                    setSelectedQuestion(
                      Math.min(
                        currentQuestions.length - 1,
                        selectedQuestion + 1,
                      ),
                    )
                  }
                  disabled={selectedQuestion === currentQuestions.length - 1}
                  className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR - SKILL GAPS */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sticky top-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-pink-500" />
                Skill Gaps
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {skillGaps.length > 0 ? (
                  skillGaps.map((skillGap, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-xl p-4 transition-all ${getSeverityColor(
                        skillGap.severity,
                      )}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {skillGap.skill}
                          </p>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded-md bg-black/20">
                          {skillGap.severity}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400 text-sm">
                      No skill gaps identified
                    </p>
                  </div>
                )}
              </div>

              {/* ACTION BUTTON */}
              {skillGaps.length > 0 && (
                <button className="w-full mt-6 py-3 rounded-xl bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm hover:scale-[1.02] transition-all">
                  Start Improvement Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Interview;
