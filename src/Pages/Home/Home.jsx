import { Link } from "react-router-dom";
import { LogIn, User, UserPlus } from "lucide-react";
import { Loader2 } from "lucide-react";
import useAuthContext from "../../hooks/useAuthContext";

const Home = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-base-100 p-8 rounded-2xl shadow-2xl max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
          Welcome to <span className="text-accent">AuthHub 🔐</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-700">
          A secure and modern authentication system with email verification, JWT
          support, and a seamless UX.
        </p>

        {user ? (
          <>
            <div className="text-green-600 text-lg font-semibold">
              You're logged in ✅
            </div>
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 px-6 py-2 text-base font-medium rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors duration-300 shadow-md"
            >
              <User size={18} />
              View Profile
            </Link>
          </>
        ) : (
          <div className="flex justify-center gap-4 pt-2 flex-wrap">
            <Link
              to="/login"
              className="btn btn-primary gap-2 px-6 py-2 text-base rounded-full shadow-md"
            >
              <LogIn size={18} />
              Login
            </Link>
            <Link
              to="/registration"
              className="btn btn-outline btn-secondary gap-2 px-6 py-2 text-base rounded-full shadow-md"
            >
              <UserPlus size={18} />
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
