import { useState, useRef, useEffect } from "react";
import FormWrapper from "../../AccountCreationForms/FormWrapper/FormWrapper";
import "./AddStockForm.css";

type Stock = {
  ticker: string;
  name: string;
  weight: number;
  price: number;
};

type AddStockFormProps = {
  stocks: Stock[];
  loading: boolean;
  selectedStocks: Stock[];
  addStock: (ticker: string, name: string) => void;
  removeStock: (ticker: string) => void;
  updateStockWeight: (ticker: string, weight: number) => void;
  resetStocks: () => void;
  setError: (error: string) => void;
};

export default function AddStockForm({
  stocks,
  loading,
  selectedStocks,
  addStock,
  removeStock,
  updateStockWeight,
  resetStocks,
  setError,
}: AddStockFormProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filteredStocks = stocks
    .filter(
      (stock) =>
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedStocks.some((s) => s.ticker === stock.ticker)
    )
    .slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
    setShowDropdown(true);
  };

  const handleWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ticker: string
  ) => {
    const newWeight = parseFloat(e.target.value);
    updateStockWeight(ticker, newWeight);
    setError("");
  };

  const handleWeightFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  const calculateTotalWeight = () => {
    return selectedStocks.reduce((total, stock) => total + stock.weight, 0);
  };

  return (
    <FormWrapper>
      <hr />
      <div className="search-container" ref={searchContainerRef}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="reset-button" type="button" onClick={resetStocks}>
            Reset
          </button>
          <button className="csv-button" type="button">
            CSV
          </button>
        </div>
        {showDropdown && searchTerm && (
          <ul className="stock-list">
            {loading ? (
              <li>Loading stocks...</li>
            ) : (
              filteredStocks.map((stock) => (
                <li key={stock.ticker} className="stock-item">
                  <span>
                    {stock.ticker} - {stock.name}
                  </span>
                  <button
                    onClick={() => {
                      addStock(stock.ticker, stock.name);
                      setShowDropdown(false);
                    }}
                  >
                    Add
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <div className="selected-stock-list">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Ticker</th>
              <th>Name</th>
              <th>Price</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {selectedStocks.map((stock) => (
              <tr key={stock.ticker}>
                <td className="remove-button">
                  <button onClick={() => removeStock(stock.ticker)}>
                    &#10006;
                  </button>
                </td>
                <td>{stock.ticker}</td>
                <td>{stock.name}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={stock.weight}
                    onChange={(e) => handleWeightChange(e, stock.ticker)}
                    onFocus={handleWeightFocus}
                    min="0"
                    max="100"
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}></td>
              <td className="total">{calculateTotalWeight()}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </FormWrapper>
  );
}
