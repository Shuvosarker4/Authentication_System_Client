import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center space-y-6 p-10">
        <h1 className="text-5xl font-bold text-primary">
          Welcome to AuthHub 🔐
        </h1>
        <p className="text-lg text-base-content">
          Secure authentication system with email activation and JWT support.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/registration" className="btn btn-outline btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
