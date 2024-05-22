import { Link } from "react-router-dom";
import "./HomePage.css";
import { Nav } from "react-bootstrap";
import Navbar from "../../Components/Navbar/Navbar";
type Props = {};

export default function HomePage({}: Props) {
  return (
    <div>
      <Navbar />
      <div>
        <Link to="/">HomePage</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
