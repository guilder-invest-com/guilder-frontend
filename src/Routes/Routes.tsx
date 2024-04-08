import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignupPage from "../Pages/SignupPage/SignupPage";
import HomePage from "../Pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
]);
