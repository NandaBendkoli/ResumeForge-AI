import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UseAuth } from "./../hooks/UseAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleLogin } = UseAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({
      email,
      password,
    });

    if (success) {
      navigate("/");
    }
  };

  if (loading)
    return (
      <h1 className="flex items-center justify-center h-screen font-bold">
        Loading...
      </h1>
    );

  return (
    <main className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-600 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-linear-to-br from-violet-600 to-indigo-700 text-white">
          <div>
            <h1 className="text-5xl font-bold leading-tight">ResumeForge AI</h1>

            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Build ATS-friendly resumes, prepare for interviews, and accelerate
              your tech career using AI-powered tools.
            </p>
          </div>

          <div className="mt-10 space-y-4 text-white/90">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <p>AI Resume Builder</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <p>ATS Resume Analysis</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <p>Interview Preparation</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <p>Placement Focused Dashboard</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div>
            <h2 className="text-4xl font-bold text-white">Welcome Back 👋</h2>

            <p className="text-slate-400 mt-2">
              Login to continue your journey
            </p>
          </div>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* EMAIL */}
            <div>
              <label className="text-sm text-slate-300">Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-violet-500"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            {/* PASSWORD */}
            <div>
              <label className="text-sm text-slate-300">Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-violet-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-violet-400 hover:text-violet-300 transition"
              >
                Forgot Password?
              </button>
            </div>
            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold active:scale-95 transition-all duration-300 shadow-lg shadow-violet-900/40"
            >
              Login
            </button>
            {/* REGISTER */}
            <p className="text-center text-slate-400">
              Don&apos;t have an account?
              <span className="text-violet-400 ml-2 cursor-pointer hover:text-violet-300">
                <Link to={"/register"}> Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
