import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.route.jsx";
import { AuthProvider } from "./features/auth/AuthContext.jsx";
import { InterviewProvider } from "./features/Ai/Interview.context.jsx";
const App = () => {
  return (
    <>
      <div className="bg-slate-800 min-h-screen text-white">
        <AuthProvider>
         <InterviewProvider>
          <RouterProvider router={router} />
         </InterviewProvider>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
