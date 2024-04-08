import { Link } from "react-router-dom";
import "./HomePage.css";
type Props = {};

export default function HomePage({}: Props) {
  return (
    <div>
      <Link to="/">HomePage</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
