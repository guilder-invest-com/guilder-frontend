import { Route, Routes } from "react-router";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import HomePage from "./Pages/HomePage/HomePage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
// import { Navbar } from "react-bootstrap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      // ... other routes
    </Routes>
  );
}
export default App;
