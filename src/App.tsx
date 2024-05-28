import { Route, Routes } from "react-router";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import HomePage from "./Pages/HomePage/HomePage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import CreatePortfolioPage from "./Pages/CreatePortfolioPage/CreatePortfolioPage";
// import { Navbar } from "react-bootstrap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreatePortfolioPage /></ProtectedRoute>} />
      // ... other routes
    </Routes>
  );
}
export default App;
