import React from "react";
import { Navigate } from "react-router";
import { UseAuth } from "../hooks/UseAuth";

const Protected = ({ children }) => {

  const { loading } = UseAuth();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (loading) {
    return (
      <h1 className="flex items-center justify-center h-screen font-bold">
        Loading...
      </h1>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;