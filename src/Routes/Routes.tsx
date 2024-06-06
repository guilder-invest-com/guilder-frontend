import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignupPage from "../Pages/SignupPage/SignupPage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ProtectedRoute from "../Components/ProtectedRoute";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import CreatePortfolioPage from "../Pages/CreatePortfolioPage/CreatePortfolioPage";
import DiscoverPage from "../Pages/DiscoverPage/DiscoverPage";
import MyPortfoliosPage from "../Pages/MyPortfoliosPage/MyPortfoliosPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "createPortfolio",
        element: (
          <ProtectedRoute>
            <CreatePortfolioPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "myPortfolios",
        element: (
          <ProtectedRoute>
            <MyPortfoliosPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "discover",
        element: (
          <ProtectedRoute>
            <DiscoverPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
