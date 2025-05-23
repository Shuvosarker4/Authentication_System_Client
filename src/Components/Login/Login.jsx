import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useAuthContext from "../../hooks/useAuthContext";
import ErrorMessageAlert from "../ErrorMessage/ErrorMessageAlert";
import SuccessMessageAlert from "../SuccessMessage/SuccessMessageAlert";

const Login = () => {
  const { loginUser, errorMessage } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [loading, setLoading] = useState(false);

  const onsubmit = async (data) => {
    setLoading(true);
    try {
      const result = await loginUser(data);
      reset();
      if (result.success) {
        setRedirecting(true);
        setCountdown(3);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (redirecting) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => {
        clearInterval(countdownInterval);
        clearTimeout(timeout);
      };
    }
  }, [redirecting, navigate]);

  return (
    <div className="min-h-screen bg-base-200 px-4 py-6 flex flex-col items-center justify-center relative">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-primary bg-base-100 shadow hover:bg-primary hover:text-white transition-all duration-200 border border-primary"
        >
          <span className="text-lg">←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="card w-full max-w-md shadow-xl bg-base-100 mt-12 sm:mt-0">
        <div className="card-body pt-10">
          {errorMessage && <ErrorMessageAlert error={errorMessage} />}
          {redirecting && (
            <SuccessMessageAlert
              message={`Login successful! Redirecting... ${countdown}`}
            />
          )}
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4 mt-4">
            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email address must be required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-12"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password must be required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <label className="label justify-end">
                <Link to="/forgot-password" className="link link-primary">
                  Forgot password?
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/registration" className="link link-primary">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
