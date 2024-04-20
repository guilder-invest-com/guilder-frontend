import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignupPage from "../Pages/SignupPage/SignupPage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ProtectedRoute from "../Components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <ProtectedRoute><HomePage /></ProtectedRoute> },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);
