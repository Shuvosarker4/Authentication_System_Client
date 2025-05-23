import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import AuthLayout from "../Layout/AuthLayout";
import Registration from "../Components/Registration/Registration";
import ResetPass from "../Components/Reset_Password/ResetPass";
import About from "../Components/About/About";
import Secret from "../Components/Secret/Secret";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import ActivateAccount from "../Components/ActivateAccount/ActivateAccount";
import Profile from "../Components/Profile/Profile";
import NotFound from "../Components/NotFound/NotFound";
import PassResetConfirm from "../Components/PassResetConfirm/PassResetConfirm";

const isLoggedIn = true;
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        element: <PrivateRoute isLoggedIn={isLoggedIn} />,
        children: [{ path: "/secret", Component: Secret }],
      },
      { path: "/about", Component: About },
      { path: "activate/:uid/:token", Component: ActivateAccount },
      { path: "profile", Component: Profile },
      {
        path: "password/reset/confirm/:uid/:token",
        Component: PassResetConfirm,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "/login", Component: Login },
      { path: "/registration", Component: Registration },
      { path: "/forgot-password", Component: ResetPass },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
