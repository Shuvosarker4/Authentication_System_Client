import { Link } from "react-router";

const Login = () => {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-6 flex flex-col items-center justify-center relative">
      {/* Back to Home Button (Top-left, Responsive) */}
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
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form className="space-y-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
              <label className="label justify-end">
                <Link to="/forgot-password" className="link link-primary">
                  Forgot password?
                </Link>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
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
