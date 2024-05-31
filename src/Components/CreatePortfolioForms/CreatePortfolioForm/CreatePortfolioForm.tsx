import FormWrapper from "../../AccountCreationForms/FormWrapper/FormWrapper";
import ReactSlider from "react-slider";
import "./CreatePortfolioForm.css";

type CreatePortfolioFormData = {
  ticker: string;
  name: string;
  description: string;
  managementFee: number;
};

type CreatePortfolioProps = CreatePortfolioFormData & {
  updateFields: (fields: Partial<CreatePortfolioFormData>) => void;
};

export default function CreatePortfolioForm({
  ticker,
  name,
  description,
  managementFee,
  updateFields,
}: CreatePortfolioProps) {
  return (
    <FormWrapper>
      <div className="create-portfolio-main-content">
        {/* <h4 className="create-portfolio-form-header">Create Portfolio</h4> */}
        <div className="create-portfolio-form-items">
          <hr />
          <input
            required
            placeholder="Ticker"
            type="text"
            id="portfolioName"
            value={ticker}
            onChange={(e) => updateFields({ ticker: e.currentTarget.value })}
          />
          <input
            required
            placeholder="Name"
            type="text"
            id="portfolioDescription"
            value={name}
            onChange={(e) => updateFields({ name: e.currentTarget.value })}
          />
          <textarea
            required
            placeholder="Description"
            id="portfolioDescription"
            rows={4}
            cols={15}
            value={description}
            onChange={(e) =>
              updateFields({ description: e.currentTarget.value })
            }
          />
          <div className="create-portfolio-slider">
            <p>Management fee</p>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              min={0.6}
              max={1.2}
              step={0.01}
              value={managementFee}
              onChange={(value) => updateFields({managementFee: value})}
            />
            <span className="slider-value">{managementFee}%</span>
          </div>
          {/* <button
            className="create-portfolio-form-continue-button"
            type="submit"
          >
            Continue
          </button> */}
        </div>
      </div>
    </FormWrapper>
  );
}
