import React, { useState } from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { UseAuth } from "../hooks/UseAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const { loading, handleRegister } = UseAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ name, email, password, gender });
    navigate("/login");
  };

  if (loading)
    return (
      <h1 className="flex items-center justify-center h-screen font-bold">
        Loading...
      </h1>
    );
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#312e81,#020617)] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Blur Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-600 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/3 backdrop-blur-xl shadow-2xl">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-linear-to-br from-[#6d28d9] to-[#4338ca] text-white">
          <div className="flex items-center gap-3">
            <FileText size={42} />
            <h1 className="text-5xl font-bold">ResumeForge AI</h1>
          </div>

          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            Create professional ATS-friendly resumes, prepare for interviews,
            and accelerate your placement journey with AI.
          </p>

          <div className="mt-10 space-y-5 text-white/90">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <p>AI Resume Builder</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <p>ATS Resume Optimization</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <p>Mock Interview Preparation</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <p>Placement Dashboard</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div>
            <h2 className="text-4xl font-bold text-white">Create Account 🚀</h2>

            <p className="text-slate-400 mt-2">
              Start your AI-powered placement journey
            </p>
          </div>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* NAME */}
            <div>
              <label className="text-sm text-slate-300">Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-slate-300">Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-slate-300">Password</label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Gender</label>

              <input
                type="gender"
                placeholder="Gender"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                value={gender}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-900/40 transition-all duration-300"
            >
              Create Account
            </button>

            {/* LOGIN */}
            <p className="text-center text-slate-400">
              Already have an account?
              <span className="text-violet-400 ml-2 cursor-pointer hover:text-violet-300">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
