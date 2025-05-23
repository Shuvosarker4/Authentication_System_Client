import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authClient from "../../services/authClient";
import SuccessMessageAlert from "../SuccessMessage/SuccessMessageAlert";

const PassResetConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("new_password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: data.new_password,
        re_new_password: data.re_new_password,
      });
      reset();
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">
          Reset Your Password 🔐
        </h2>
        {success ? (
          <SuccessMessageAlert message="Password reset successful! Redirecting to login..." />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">New Password</label>
              <input
                type="password"
                {...register("new_password", { required: true, minLength: 8 })}
                className="input input-bordered w-full"
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm">
                  Minimum 8 characters required.
                </p>
              )}
            </div>

            <div>
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                {...register("re_new_password", {
                  required: "This field is required.",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match.",
                })}
                className="input input-bordered w-full"
              />
              {errors.re_new_password && (
                <p className="text-red-500 text-sm">
                  {errors.re_new_password.message}
                </p>
              )}
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading && <span className="loading loading-spinner"></span>}
              {loading ? "Resetting..." : "Confirm Reset"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PassResetConfirm;
