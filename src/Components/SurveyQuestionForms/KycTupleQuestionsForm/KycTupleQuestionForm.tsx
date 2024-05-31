import FormWrapper from "../../AccountCreationForms/FormWrapper/FormWrapper";
import "./KycTupleQuestionForm.css";

type KycTupleQuestionFormProps = {
  selectedOption: string;
  updateFields: (changes: { [key: string]: any }) => void;
};

type Portfolio = {
  id: string;
  return: string;
  best: string;
  worst: string;
};

export default function KycTupleQuestionForm({
  selectedOption,
  updateFields,
}: KycTupleQuestionFormProps) {
  const portfolios = [
    { id: "A", return: "2.5%", best: "10.0%", worst: "-5.0%" },
    { id: "B", return: "4.0%", best: "19.0%", worst: "-11.0%" },
    { id: "C", return: "5.5%", best: "28.0%", worst: "-17.0%" },
    { id: "D", return: "6.0%", best: "36.0%", worst: "-22.0%" },
    { id: "E", return: "7.0%", best: "43.0%", worst: "-26.0%" },
  ];

  const onSelectPortfolio = (portfolio: Portfolio) => {
    const answer = `${portfolio.id}|${portfolio.return}|${portfolio.best}|${portfolio.worst}`;
    updateFields({ "13": answer });
  };

  return (
    <FormWrapper>
      <div className="tuple-form-question-container">
        <p className="tuple-form-question">
          Consider the hypothetical portfolios below. Which range of outcomes is
          most acceptable to you?
        </p>
        <table>
          <thead>
            <tr>
              <th>Portfolio</th>
              <th>Average Annual Return</th>
              <th>Best Case</th>
              <th>Worst Case</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio) => (
              <tr
                key={portfolio.id}
                className={selectedOption === portfolio.id ? "selected" : ""}
                onClick={() => onSelectPortfolio(portfolio)}
              >
                <td>{portfolio.id}</td>
                <td>{portfolio.return}</td>
                <td>{portfolio.best}</td>
                <td>{portfolio.worst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FormWrapper>
  );
}
