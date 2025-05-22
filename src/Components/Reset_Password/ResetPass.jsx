import { Link } from "react-router";

const ResetPass = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p className="text-sm text-center text-base-content/70">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>

          <form className="space-y-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="input input-bordered w-full"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Send Reset Link
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
