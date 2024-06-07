import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./DiscoverPage.css";
import { getAllPortfolios } from "../../Api/api";
import { capitalizeFirstLetter } from "../ProfilePage/ProfilePage";

type Portfolio = {
  id: number;
  ticker: string;
  name: string;
  manager: string;
  risk_profile: string;
  sevenDayReturn: string;
  inception: string;
  investors: number;
  management_fee: string;
  aum: string;
  createdAt: string;
  display_name: string;
  user: PortfolioUser
};

type PortfolioUser = {
  display_name: string;
};


export default function DiscoverPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const fetchedPortfolios = await getAllPortfolios();
        const portfolios: Portfolio[] = fetchedPortfolios;
        setPortfolios(portfolios);
      } catch (error: any) {
        console.error("Could not fetch KYC questions: ", error);
      }
    };
    fetchPortfolios();
  }, []);

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month}. ${year}`;
}

  return (
    <div>
      <Navbar />
      <div className="discover-main-content">
        <div className="discover-container">
          <div className="discover-header-row">
            <input type="search" placeholder="Search..." />
            <div className="discover-filters">
              <p>Risk</p>
              <p>7d%</p>
            </div>
          </div>
          <div className="discover-table-container">
            <table className="discover-table">
              <thead>
                <tr>
                  <th className="ticker">Ticker</th>
                  <th className="name">Name</th>
                  <th className="manager">Manager</th>
                  <th className="small">Risk</th>
                  <th className="small">7d%</th>
                  <th className="small">Inception</th>
                  <th className="investors"># Investors</th>
                  <th className="small">Fee</th>
                  <th className="small">AUM</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((portfolio, index) => (
                  <tr
                    key={portfolio.id}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td className="ticker">{portfolio.ticker.toUpperCase()}</td>
                    <td className="name">{capitalizeFirstLetter(portfolio.name)}</td>
                    <td className="manager">{capitalizeFirstLetter(portfolio.user.display_name)}</td>
                    <td className="small">{capitalizeFirstLetter(portfolio.risk_profile)}</td>
                    <td className="small seven-day-return">+4.69%</td>
                    <td className="small">{formatDate(portfolio.createdAt)}</td>
                    <td className="investors">35</td>
                    <td className="small">{portfolio.management_fee}%</td>
                    <td className="small">$240 k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
