import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center text-center px-6">
      <div className="animate-bounce mb-4 text-error">
        <Ghost size={64} />
      </div>
      <h1 className="text-6xl font-bold text-error">404</h1>
      <p className="text-xl text-base-content mt-4">
        Whoops! The page you're looking for doesn’t exist.
      </p>
      <p className="text-sm text-gray-500 mt-1">
        It might have been removed or renamed.
      </p>
      <Link
        to="/"
        className="mt-6 btn btn-primary px-8 py-2 rounded-full shadow-md transition duration-200 hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
