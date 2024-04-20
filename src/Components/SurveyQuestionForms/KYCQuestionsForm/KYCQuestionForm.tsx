import FormWrapper from "../../AccountCreationForms/FormWrapper/FormWrapper";
import "./KYCQuestionForm.css";

type AnswerOption = {
  id: number;
  question: string;
  answer_type: "radio" | "checkbox" | "dropdown" | "select" | "tuple";
  answers: string[];
};

type KYCQuestionsFormProps = {
  questions: AnswerOption[];
  formData: { [key: string]: any };
  updateFields: (fields: Partial<{ [key: string]: any }>) => void;
};

export default function KYCQuestionsForm({
  questions,
  updateFields,
  formData,
}: KYCQuestionsFormProps) {
  const handleChange = (id: number, value: string) => {
    updateFields({ [id.toString()]: value });
  };
  return (
    <FormWrapper title="One more thing...">
      {questions.map((question) => (
        <div key={question.id} className="question-container">
          <p className="question-text">{question.question}</p>
          <div className="radio-group">
            {question.answers.map((answer, index) => (
              <label key={index} className="radio-label">
                <input
                  required
                  type="radio"
                  name={String(question.id)}
                  value={answer}
                  checked={formData[question.id] === answer}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                />
                {answer}
              </label>
            ))}
          </div>
        </div>
      ))}
    </FormWrapper>
  );
}
