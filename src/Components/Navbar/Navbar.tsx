import { Link } from "react-router-dom";
import guilderLogo from "../../assets/guilderLogo.png";
import "./Navbar.css";
import { useAuth } from "../../Context/AuthContext";

type Props = {};

function Navbar({}: Props) {
  const { user, signOut } = useAuth();
  return (
    <div className="navbar">
      <div>
        <img src={guilderLogo} />
        <ul className="navbar-items">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/discover">Discover</Link>
          </li>
          <li>
            <Link to="/user/portfolios">My Portfolios</Link>
          </li>
          <li>Help</li>
        </ul>
      </div>
      <div>
        <input type="text" placeholder="Search..." />
        <ul className="navbar-items">
          {user ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button className="signout-button" onClick={signOut}>
                  <p>Sign Out</p>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
