import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import ErrorMessageAlert from "../ErrorMessage/ErrorMessageAlert";
import SuccessMessageAlert from "../SuccessMessage/SuccessMessageAlert";

const Registration = () => {
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const { registerUser, errorMessage } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (data) => {
    delete data.confirmPassword;
    try {
      const result = await registerUser(data);
      if (result.success) {
        setSuccessMsg(result.message);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-6 flex flex-col items-center justify-center relative">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-primary bg-base-100 shadow hover:bg-primary hover:text-white transition-all duration-200 border border-primary"
        >
          <span className="text-lg">←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="card w-full max-w-lg shadow-xl bg-base-100 mt-12 sm:mt-0">
        <div className="card-body">
          {errorMessage && <ErrorMessageAlert error={errorMessage} />}
          {successMsg && <SuccessMessageAlert message={successMsg} />}
          <h2 className="text-2xl font-bold text-center">Create an Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="input input-bordered w-full"
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered w-full"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="123 Main St, City, ZIP"
                className="input input-bordered w-full"
                {...register("address")}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="+1 234 567 8901"
                className="input input-bordered w-full"
                {...register("phone_number")}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Register
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
