import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
