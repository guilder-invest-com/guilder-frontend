import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./PortfolioDetailsPage.css";
import { capitalizeFirstLetter } from "../ProfilePage/ProfilePage";

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function capitalizeFirstLetterOfEachWord(name: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
export default function PortfolioDetailsPage() {
  const location = useLocation();
  const { portfolio } = location.state;

  return (
    <div>
      <Navbar />
      <div className="portfoliosDetailsPage-main-content">
        <div className="portfoliosDetailsPage-container">
          <div className="portfoliosDetailsPage-header-row">
            <h4>About</h4>
            <div className="portfoliosDetailsPage-header-buttons">
              <button type="button" className="btn-blue">
                Edit
              </button>
              <button type="button" className="btn-yellow">
                Share
              </button>
            </div>
          </div>
          <div className="portfoliosDetailsPage-portfolio-container">
            <div className="portfoliosDetailsPage-portfolio-deatils">
              <hr />
              <label>Ticker</label>
              <p>{portfolio.ticker.toUpperCase()}</p>
              <hr />
              <label>Manager</label>
              <p>{capitalizeFirstLetterOfEachWord(portfolio.user.display_name)}</p>
              <hr />
              <label>Total Assets Under Management</label>
              <p>$456,287.22</p>
              <hr />
              <label>Date of Inception</label>
              <p>{formatDate(portfolio.createdAt)}</p>
            </div>
            <div className="portfoliosDetailsPage-portfolio-deatils">
              <hr />
              <label>Name</label>
              <p>{capitalizeFirstLetter(portfolio.name)}</p>
              <hr />
              <label>Risk Profile</label>
              <p>Aggressive</p>
              <hr />
              <label>Number of Investors</label>
              <p>19</p>
              <hr />
              <label>Management Fee</label>
              <p>{portfolio.management_fee}%</p>
            </div>
          </div>
        </div>
        <div className="portfoliosDetailsPage-container">
          <div className="portfoliosDetailsPage-header-row">
            <h4>Holdings</h4>
          </div>
          <table className="portfoliosDetailsPage-table">
            <thead>
              <tr>
                <th className="ticker">Ticker</th>
                <th className="name">Name</th>
                <th className="price">Price</th>
                <th className="weight">Weight</th>
              </tr>
            </thead>
            <tbody className="portfoliosDetailsPage-table-body">
              {portfolio.portfolio_holdings.map((holding: any) => (
                <tr key={holding.id}>
                  <td className="ticker">{holding.ticker}</td>
                  <td className="name">{holding.name}</td>
                  <td className="price">${holding.price.toFixed(2)}</td>
                  <td className="weight">{holding.weight}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
