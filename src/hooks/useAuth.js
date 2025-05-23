import { useState } from "react";
import authClient from "../services/authClient";

const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState("");

  // get token
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };
  const [authTokens, setAuthTokens] = useState(getToken());

  // login user
  const loginUser = async (userData) => {
    setErrorMessage("");
    try {
      const response = await authClient.post("/auth/jwt/create", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      return {
        success: true,
      };
    } catch (error) {
      setErrorMessage(error.response.data?.detail);
    }
  };

  // register a user
  const registerUser = async (userData) => {
    setErrorMessage("");
    try {
      await authClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successful. Check your email to activate your account.",
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data)
          .flat()
          .join("\n");
        setErrorMessage(errorMessage);
        return { success: false, message: errorMessage };
      }
      setErrorMessage("Registration failed. Please try again");
      return {
        success: false,
        message: "Registration failed. Please try again",
      };
    }
  };

  return { loginUser, errorMessage, registerUser };
};

export default useAuth;
