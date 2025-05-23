import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();

  const navLinks = (
    <>
      <li>
        <Link to="/secret">Secret Code</Link>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
    </>
  );

  const mobileUserLinks = (
    <>
      {user ? (
        <>
          <li>
            <Link to="/profile">Profile Settings</Link>
          </li>
          <li>
            <Link onClick={logoutUser}>Logout</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">
              <LogIn className="inline-block w-4 h-4 mr-1" />
              Login
            </Link>
          </li>
          <li>
            <Link to="/registration">
              <UserPlus className="inline-block w-4 h-4 mr-1" />
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );

  const desktopAuthControls = user ? (
    <div className="dropdown dropdown-end hidden lg:block">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link to="/profile">Profile Settings</Link>
        </li>
        <li>
          <Link onClick={logoutUser}>Logout</Link>
        </li>
      </ul>
    </div>
  ) : (
    <div className="hidden lg:flex gap-4">
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
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
            <div className="mt-2 border-t pt-2">{mobileUserLinks}</div>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          AuthHub
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* End */}
      <div className="navbar-end">{desktopAuthControls}</div>
    </div>
  );
};

export default Navbar;
