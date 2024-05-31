import "./HomePage.css";
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
