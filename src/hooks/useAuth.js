import { useEffect, useState } from "react";
import authClient from "../services/authClient";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // get token
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };
  const [authTokens, setAuthTokens] = useState(getToken());

  // Fetch user Profile

  useEffect(() => {
    if (authTokens) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [authTokens]);

  const fetchUserProfile = async () => {
    try {
      const response = await authClient.get("/auth/users/me", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
      setAuthTokens(null);
      localStorage.removeItem("authTokens");
    } finally {
      setLoading(false);
    }
  };

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

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("cartId");
  };

  return {
    loginUser,
    loading,
    errorMessage,
    registerUser,
    fetchUserProfile,
    user,
    logoutUser,
  };
};

export default useAuth;
