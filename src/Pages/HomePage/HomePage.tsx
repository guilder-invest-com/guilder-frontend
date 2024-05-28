import { Link } from "react-router-dom";
import "./HomePage.css";
import { Nav } from "react-bootstrap";
import Navbar from "../../Components/Navbar/Navbar";
type Props = {};

export default function HomePage({}: Props) {
  return (
    <div>
      <Navbar />
      <div className="main-content"></div>
    </div>
  );
}
