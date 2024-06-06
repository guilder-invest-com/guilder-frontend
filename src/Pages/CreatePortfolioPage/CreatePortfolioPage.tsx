import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./CreatePortfolioPage.css";
import useMultistepForm from "../../useMultistepForm";
import CreatePortfolioForm from "../../Components/CreatePortfolioForms/CreatePortfolioForm/CreatePortfolioForm";
import AddStockForm from "../../Components/CreatePortfolioForms/AddStockForm/AddStockForm";
import {
  fetchAllStocks,
  fetchStockPrice,
  createPortfolio,
} from "../../Api/api";
import CreatePortfolioReviewForm from "../../Components/CreatePortfolioForms/PortfolioReviewForm/CreatePortfolioReviewForm";
import { useAuth } from "../../Context/AuthContext"; // Import useAuth

export type Stock = {
  ticker: string;
  name: string;
  weight: number;
  price: number;
};

type FormData = {
  ticker: string;
  name: string;
  description: string;
  managementFee: number;
  portfolio_holdings: Stock[];
};

const INITIAL_DATA: FormData = {
  ticker: "",
  name: "",
  description: "",
  managementFee: 0.6,
  portfolio_holdings: [],
};

export default function CreatePortfolioPage() {
  useAuth();
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stockData = await fetchAllStocks();
        const stockList: Stock[] = Object.entries(stockData).map(
          ([ticker, name]) => ({
            ticker: ticker,
            name: name as string,
            weight: 0,
            price: 0,
          })
        );
        setStocks(stockList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  async function addStock(ticker: string, name: string) {
    try {
      const price = await fetchStockPrice(ticker);
      setData((prev) => ({
        ...prev,
        portfolio_holdings: [
          ...prev.portfolio_holdings,
          { ticker: ticker, name: name, weight: 0, price },
        ],
      }));
    } catch (error) {
      console.error("Error fetching stock price:", error);
    }
  }

  function removeStock(ticker: string) {
    setData((prev) => ({
      ...prev,
      portfolio_holdings: prev.portfolio_holdings.filter(
        (stock) => stock.ticker !== ticker
      ),
    }));
  }

  function updateStockWeight(ticker: string, weight: number) {
    setData((prev) => ({
      ...prev,
      portfolio_holdings: prev.portfolio_holdings.map((stock) =>
        stock.ticker === ticker ? { ...stock, weight } : stock
      ),
    }));
    setError(""); // Clear error when weights are updated
  }

  function resetStocks() {
    setData((prev) => ({
      ...prev,
      portfolio_holdings: [],
    }));
  }

  const { step, isFirstStep, isLastStep, back, next, currentStepIndex } = useMultistepForm([
    <CreatePortfolioForm {...data} updateFields={updateFields} />,
    <AddStockForm
      stocks={stocks}
      loading={loading}
      selectedStocks={data.portfolio_holdings}
      addStock={addStock}
      removeStock={removeStock}
      updateStockWeight={updateStockWeight}
      resetStocks={resetStocks}
      setError={setError}
    />,
    <CreatePortfolioReviewForm risk_profile={"aggressive"} {...data} />,
  ]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLastStep) {
      try {
        await createPortfolio({
          ticker: data.ticker,
          name: data.name,
          description: data.description,
          risk_profile: "aggressive", // Fixed risk profile
          management_fee: data.managementFee, // Updated key to match backend
          portfolio_holdings: data.portfolio_holdings,
        });
        console.log("Portfolio created successfully");
        alert("Portfolio created successfully");
      } catch (error) {
        console.error("Error creating portfolio:", error);
        alert("Error creating portfolio. Please try again.");
      }
    } else {
      const totalWeight = data.portfolio_holdings.reduce(
        (total, stock) => total + stock.weight,
        0
      );
      if (currentStepIndex === 1 && totalWeight !== 100) {
        setError("Total weight must be exactly 100%");
      } else {
        next();
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <form className="create-portfolio-form" onSubmit={onSubmit}>
          <h4 className="create-portfolio-form-header">Create Portfolio</h4>
          <div className="create-portfolio-form-items">{step}</div>
          <div className="create-portfolio-form-buttons">
            {!isFirstStep && (
              <button className="back-button" type="button" onClick={back}>
                Back
              </button>
            )}
            <button className="continue-finish-button" type="submit">
              {isLastStep ? "Submit" : "Next"}
            </button>
          </div>
            {currentStepIndex === 1 && error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}
