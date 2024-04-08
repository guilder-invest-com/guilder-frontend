import { FormEvent, useState } from "react";
import RoleForm from "../../Components/AccountCreationForms/RoleForm/RoleForm";
import useMultistepForm from "../../useMultistepForm";
import AccountForm from "../../Components/AccountCreationForms/AccountForm/AccountForm";
import { registerUser } from "../../Api/api";
import "./SignupPage.css";

export type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const INITIAL_DATA: FormData = {
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

export default function SignupPage() {
  const [data, setData] = useState(INITIAL_DATA);

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <RoleForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLastStep && currentStepIndex === 0 && !data.role) {
      alert("Please select a role to continue.");
      return;
    }
    if (!isLastStep) return next();

    if (isLastStep) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (data.password !== data.confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      const userData = {
        email: data.email,
        password: data.password,
      };

      try {
        const response = await registerUser(userData);
        console.log("Registration successful", response);
        alert("Successful Account Creation");
      } catch (error: any) {
        console.log("Registration failed: ", error);
      }

      console.log(data);
    }
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="main-content">
        <form onSubmit={onSubmit}>
          <div
            style={{
              textAlign: "right",
              position: "absolute",
              top: ".5rem",
              right: ".5rem",
            }}
          ></div>
          {step}
          <div className="form-buttons">
            {!isFirstStep && (
              <button id="back-button" type="button" onClick={back}>
                Back
              </button>
            )}
            <button
              id="continue-finish-button"
              type="submit"
              onClick={onSubmit}
            >
              {isLastStep ? "Submit" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
