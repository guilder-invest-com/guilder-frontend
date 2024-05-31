import FormWrapper from "../../AccountCreationForms/FormWrapper/FormWrapper";
import "./CreatePortfolioReviewForm.css";

type Stock = {
  ticker: string;
  name: string;
  weight: number;
  price: number;
};

type PortfolioData = {
  ticker: string;
  name: string;
  description: string;
  risk_profile: string;
  managementFee: number;
  portfolio_holdings: Stock[];
};

type CreatePortfolioReviewFormProps = PortfolioData;

export default function CreatePortfolioReviewForm({
  ticker,
  name,
  description,
  managementFee,
  portfolio_holdings,
}: CreatePortfolioReviewFormProps) {
    
    function capitalizeFirstLetter(name: string): string {
        const words = name.split(" ");
        const capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(" ");
    }
  return (
    <FormWrapper>
      <div className="portfolio-summary">
        <div className="portfolio-field">
          <label>Ticker</label>
          <p>{ticker.toUpperCase()}</p>
          <hr />
        </div>
        <div className="portfolio-field">
          <label>Name</label>
          <p>{capitalizeFirstLetter(name)}</p>
          <hr />
        </div>
        <div className="portfolio-field">
          <label>Description</label>
          <p>{description}</p>
          <hr />
        </div>
        <div className="portfolio-field">
          <label>Management Fee</label>
          <p>{managementFee}%</p>
          <hr />
        </div>
        <div className="portfolio-holdings">
          <h5>Holdings</h5>
          {portfolio_holdings.map((stock, index) => (
            <div key={index} className="holding-item">
              <span className="holding-ticker">{stock.ticker}</span>
              <span className="holding-weight">{stock.weight.toFixed(2)}%</span>
            </div>
          ))}
          <hr/>
        </div>
      </div>
    </FormWrapper>
  );
}
