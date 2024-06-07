import { useEffect, useState } from "react";
import { getUserPortfolios } from "../../Api/api";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../Context/AuthContext";
import "./MyPortfoliosPage.css";
import { capitalizeFirstLetter } from "../ProfilePage/ProfilePage";
import { useNavigate } from "react-router-dom";

type UserPortfolio = {
  id: string;
  ticker: string;
  name: string;
  risk_profile: string;
  aum: string;
  sevenDayReturn: string;
  lastRebalance: string;
  createdAt: string;
  investors: number;
  management_fee: string;
  holdings: PortfolioHolding[];
  user: PortfolioUser;
};

type PortfolioHolding = {
  id: string;
  portfolioId: string;
  ticker: string;
  name: string;
  price: number;
  weight: number;
};

type PortfolioUser = {
  display_name: string;
};

export default function MyPortfoliosPage() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<UserPortfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        if (user) {
          const fetchedPortfolios = await getUserPortfolios(user.id);
          const userPortfolios: UserPortfolio[] = fetchedPortfolios;
          setPortfolios(userPortfolios);
        }
      } catch (error: any) {
        console.error("Could not fetch user portfolios: ", error);
      }
    };
    fetchPortfolios();
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month}. ${year}`;
  };

  const navigate = useNavigate();

  const handleCreatePortfolio = () => {
    navigate("/create");
  };

  const handleRowClick = (portfolio: UserPortfolio) => {
    navigate(`/portfolio/${portfolio.id}`, { state: { portfolio } });
  };

  return (
    <div>
      <Navbar />
      <div className="myPortfolios-main-content">
        <div className="myPortfolios-container">
          <div className="myPortfolios-header-row">
            <h4>My Model Portfolios</h4>
            <div>
              <p>7d%</p>
            </div>
          </div>
          <table className="myPortfolios-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Name</th>
                <th>Risk</th>
                <th>AUM</th>
                <th>7d%</th>
                <th>Last Rebalance</th>
                <th>Inception</th>
                <th># Investors</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((portfolio) => (
                <tr
                  key={portfolio.id}
                  onClick={() => handleRowClick(portfolio)}
                >
                  <td>{portfolio.ticker.toUpperCase()}</td>
                  <td>{capitalizeFirstLetter(portfolio.name)}</td>
                  <td>{capitalizeFirstLetter(portfolio.risk_profile)}</td>
                  <td>$240k</td>
                  <td className="small seven-day-return">+45%</td>
                  <td>14 days</td>
                  <td>{formatDate(portfolio.createdAt)}</td>
                  <td className="center">45</td>
                  <td>{portfolio.management_fee}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleCreatePortfolio}
            className="myPortfolios-add-portfolio-button"
          >
            Create new portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
