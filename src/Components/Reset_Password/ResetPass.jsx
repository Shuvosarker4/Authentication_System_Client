import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import ErrorMessageAlert from "../ErrorMessage/ErrorMessageAlert";
import SuccessMessageAlert from "../SuccessMessage/SuccessMessageAlert";

const ResetPass = () => {
  const { resetPassword, errorMessage } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await resetPassword(data);
    if (result.success) {
      setSuccessMsg(result.message);
      reset();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          {errorMessage && <ErrorMessageAlert error={errorMessage} />}
          {successMsg && <SuccessMessageAlert message={successMsg} />}
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p className="text-sm text-center text-base-content/70">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="example@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading && <span className="loading loading-spinner"></span>}
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Remember your password?{" "}
            <Link to="/login" className="link link-primary">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
