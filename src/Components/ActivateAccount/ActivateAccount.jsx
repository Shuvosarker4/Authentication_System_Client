import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import authClient from "../../services/authClient";
import ErrorMessageAlert from "../ErrorMessage/ErrorMessageAlert";
import SuccessMessageAlert from "../SuccessMessage/SuccessMessageAlert";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { uid, token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    authClient
      .post("/auth/users/activation/", { uid, token })
      .then(() => {
        setMessage(
          "Account activate successfully!Redirecting to login page..."
        );
        setTimeout(() => navigate("/login"), 5000);
      })
      .catch(() => {
        setError("Something Went Wrong. Please check your activation link");
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold">Account Activation</h2>
        {message && <SuccessMessageAlert message={message} />}
        {error && <ErrorMessageAlert error={error} />}
      </div>
    </div>
  );
};

export default ActivateAccount;
