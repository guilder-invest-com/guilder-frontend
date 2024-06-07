import { Route, Routes } from "react-router";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import HomePage from "./Pages/HomePage/HomePage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import CreatePortfolioPage from "./Pages/CreatePortfolioPage/CreatePortfolioPage";
import DiscoverPage from "./Pages/DiscoverPage/DiscoverPage";
import MyPortfoliosPage from "./Pages/MyPortfoliosPage/MyPortfoliosPage";
import PortfolioDetailsPage from "./Pages/PortfolioDetailsPage/PortfolioDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreatePortfolioPage /></ProtectedRoute>} />
      <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
      <Route path="/user/portfolios" element={<ProtectedRoute><MyPortfoliosPage /></ProtectedRoute>} />
      <Route path="/portfolio/:id" element={<ProtectedRoute><PortfolioDetailsPage /></ProtectedRoute>} />
      // ... other routes
    </Routes>
  );
}
export default App;
