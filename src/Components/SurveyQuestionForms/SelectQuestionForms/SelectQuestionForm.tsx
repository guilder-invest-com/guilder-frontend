import React from "react";
import FormWrapper from "../../AccountCreationForms/FormWrapper/FormWrapper";
import "./SelectQuestionForm.css";

type SelectQuestionFormProps = {
  question: string;
  questionId: string;
  options: string[];
  selectedOption: string;
  updateFields: (changes: { [key: string]: any }) => void;
  next: () => void;
};

export default function SelectQuestionForm({
  question,
  questionId,
  options,
  selectedOption,
  updateFields,
  next,
}: SelectQuestionFormProps) {
  const handleOptionSelect = (option: string) => {
    const updateObject = { [questionId]: option };
    console.log("Updating with object:", updateObject);
    updateFields({ [questionId]: option });
    next();
  };

  return (
    <FormWrapper title="">
      <div className="select-question-container">
        <p className="select-question-text">{question}</p>
        <hr />
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <div
              className={`option ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
            {index < options.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </FormWrapper>
  );
}
