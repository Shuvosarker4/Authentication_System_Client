import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const allData = useAuth();

  return (
    <AuthContext.Provider value={allData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
