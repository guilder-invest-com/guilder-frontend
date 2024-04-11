import { FormEvent, useRef, useState } from "react";
import RoleForm from "../../Components/AccountCreationForms/RoleForm/RoleForm";
import useMultistepForm from "../../useMultistepForm";
import AccountForm from "../../Components/AccountCreationForms/AccountForm/AccountForm";
import {
  isEmailAvailable,
  isUsernameAvailable,
  registerUser,
} from "../../Api/api";
import "./SignupPage.css";
import { doPasswordsMatch, isValidEmail } from "../../utils/validations";
import { hashPassword } from "../../utils/hashPassword";

type FormData = {
  email: string;
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const INITIAL_DATA: FormData = {
  email: "",
  username: "",
  displayName: "",
  password: "",
  confirmPassword: "",
  role: "",
};

export default function SignupPage() {
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);


  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <RoleForm {...data} updateFields={updateFields} />,
      <AccountForm
        {...data}
        updateFields={updateFields}
        checkEmailAvailability={checkEmailAvailability}
        checkUsernameAvailability={checkUsernameAvailability}
        emailAvailable={emailAvailable}
        usernameAvailable={usernameAvailable}
      />,
    ]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const lastCheckedEmailRef = useRef("");

  async function checkEmailAvailability(email: string) {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || trimmedEmail === lastCheckedEmailRef.current) {
      return;
    }
    try {
      const response = await isEmailAvailable(email.trim());
      setEmailAvailable(response.available);
      lastCheckedEmailRef.current = trimmedEmail;
    } catch (error: any) {
      console.log("email avail check failed: ", error);
    }
  }

  const lastCheckedUsernameRef = useRef("");

  async function checkUsernameAvailability(username: string) {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || trimmedUsername === lastCheckedUsernameRef.current) {
      return;
    }
    try {
      const response = await isUsernameAvailable(username);
      setUsernameAvailable(response.available)
      lastCheckedUsernameRef.current = trimmedUsername;
    } catch (error: any) {
      console.log("username avail check failed: ", error);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLastStep && currentStepIndex === 0 && !data.role) {
      alert("Please select a role to continue.");
      return;
    }
    if (!isLastStep) return next();

    if (isLastStep) {
      if (!isValidEmail(data.email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!doPasswordsMatch(data.password, data.confirmPassword)) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      const hashedPassword = hashPassword(data.password);

      const userData = {
        email: data.email,
        username: data.username,
        display_name: data.displayName,
        password: hashedPassword,
      };

      // console.log(userData);

      try {
        const response = await registerUser(userData);
        console.log("Registration successful", response);
        alert("Successful Account Creation");
      } catch (error: any) {
        console.log("Registration failed: ", error);
      }

      console.log(userData);
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
            <button id="continue-finish-button" type="submit">
              {isLastStep ? "Submit" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
