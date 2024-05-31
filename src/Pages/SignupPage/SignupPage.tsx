import { FormEvent, useEffect, useRef, useState } from "react";
import RoleForm from "../../Components/AccountCreationForms/RoleForm/RoleForm";
import useMultistepForm from "../../useMultistepForm";
import AccountForm from "../../Components/AccountCreationForms/AccountForm/AccountForm";
import {
  getSurveyQuestions,
  isEmailAvailable,
  isUsernameAvailable,
  registerUser,
  submitSurveyQuestions,
  updateUserProfile,
} from "../../Api/api";
import "./SignupPage.css";
import { doPasswordsMatch, isValidEmail } from "../../utils/validations";
// import { hashPassword } from "../../utils/hashPassword";
import ResidenceForm from "../../Components/AccountCreationForms/ResidenceForm/ResidenceForm";
import UserPersonalInformationForm from "../../Components/AccountCreationForms/UserPersonalInformationForm/UserPersonalInformationForm";
import UserAddressForm from "../../Components/AccountCreationForms/UserAddressForm/UserAddressForm";
import PhoneNumberForm from "../../Components/AccountCreationForms/PhoneNumberForm/PhoneNumberForm";
import KYCQuestionsForm from "../../Components/SurveyQuestionForms/KYCQuestionsForm/KYCQuestionForm";
import SelectQuestionForm from "../../Components/SurveyQuestionForms/SelectQuestionForms/SelectQuestionForm";
import KycTupleQuestionForm from "../../Components/SurveyQuestionForms/KycTupleQuestionsForm/KycTupleQuestionForm";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";

type Question = {
  id: number;
  question: string;
  answer_type: "radio" | "checkbox" | "dropdown" | "select" | "tuple";
  answers: string[];
};

export type UpdateUserData = {
  id?: string;
  email?: string;
  username?: string;
  display_name?: string;
  password?: string;
  confirmPassword?: string;
  account_type?: string;
  country_of_tax_residence?: string;
  state_of_residence?: string;
  citizenship_status?: string;
  firstName?: string;
  lastName?: string;
  dob?: Date | null;
  address?: string;
  apt?: string;
  city?: string;
  state?: string;
  zip?: number;
  phone?: string;
  about?: string; 
  kycResponses?: { [questionId: string]: string };
};


type FormData = {
  id?: string; 
  // [key: string]: any;
  email: string;
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
  account_type: string;
  countryOfTaxResidence: string;
  stateOfResidence: string;
  citizenshipStatus: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  address: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  about: string;
  kycResponses: { [questionId: string]: string   };
};

const INITIAL_DATA: FormData = {
  email: "",
  username: "",
  displayName: "",
  password: "",
  confirmPassword: "",
  account_type: "",
  countryOfTaxResidence: "",
  stateOfResidence: "",
  citizenshipStatus: "",
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  address: "",
  address2: "",
  city: "",
  state: "",
  zipcode: "",
  phoneNumber: "",
  about: "",
  kycResponses: {},
};

export default function SignupPage() {
  const { signIn } = useAuth();
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [kycQuestions, setKycQuestions] = useState<Question[]>([]);
  const [selectQuestions, setSelectQuestions] = useState<Question[]>([]);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [kycRadioQuestions, setKycRadioQuestions] = useState<Question[]>([]);
  // const [kycTupleQuestions, setKyctupleQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchKycQuestions = async () => {
      try {
        const fetchedQuestions = await getSurveyQuestions();
        const questions: Question[] = fetchedQuestions;
        setKycQuestions(questions);
        console.log(kycQuestions);
        setKycRadioQuestions(
          questions.filter((q) => q.answer_type === "radio")
        );
        // questions.filter((q, index) => q.answer_type === "radio" && index < 6)
        // );
        setSelectQuestions(questions.filter((q) => q.answer_type === "select"));
        // setKyctupleQuestions(
        //   questions.filter((q) => q.answer_type === "tuple")
        // );
      } catch (error: any) {
        console.error("Could not fetch KYC questions: ", error);
      }
    };
    fetchKycQuestions();
  }, []);

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <RoleForm {...data} updateFields={updateFields} next={() => next()} />,
      <AccountForm
        {...data}
        updateFields={updateFields}
        checkEmailAvailability={checkEmailAvailability}
        checkUsernameAvailability={checkUsernameAvailability}
        emailAvailable={emailAvailable}
        usernameAvailable={usernameAvailable}
      />,
      <ResidenceForm {...data} updateFields={updateFields} />,
      <UserPersonalInformationForm {...data} updateFields={updateFields} />,
      <UserAddressForm {...data} updateFields={updateFields} />,
      <PhoneNumberForm {...data} updateFields={updateFields} />,
      <KYCQuestionsForm
        questions={kycRadioQuestions}
        formData={data.kycResponses}
        updateFields={handleKycResponseChange}
      />,
      ...selectQuestions.map((question, index) => (
        <SelectQuestionForm
          key={index}
          question={question.question}
          options={question.answers}
          questionId={question.id.toString()}
          selectedOption={data.kycResponses[question.id.toString()] || ""}
          updateFields={handleKycResponseChange}
          next={() => next()}
        />
      )),
      <KycTupleQuestionForm
        selectedOption={data.kycResponses["13"] || ""}
        updateFields={handleKycResponseChange}
      />,
    ]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function handleKycResponseChange(changes: { [key: string]: any }) {
    setData((prev) => {
      console.log("Incoming changes in SignupPage:", changes);
      const updatedKycResponses = {
        ...prev.kycResponses,
        ...changes,
      };
      console.log(updatedKycResponses);
      return {
        ...prev,
        kycResponses: updatedKycResponses,
      };
    });
  }

  const lastCheckedEmailRef = useRef("");

  async function checkEmailAvailability(email: string) {
    console.log("inside checkemail");
    const trimmedEmail = email.trim();
    if (!trimmedEmail || trimmedEmail === lastCheckedEmailRef.current) {
      return;
    }
    try {
      const response = await isEmailAvailable(email.trim());
      console.log("api called");
      setEmailAvailable(response.available);
      console.log("email available: ", response.available);
      lastCheckedEmailRef.current = trimmedEmail;
    } catch (error: any) {
      console.log("email avail check failed: ", error);
    }
  }

  const lastCheckedUsernameRef = useRef("");

  async function checkUsernameAvailability(username: string) {
    const trimmedUsername = username.trim();
    if (
      !trimmedUsername ||
      trimmedUsername === lastCheckedUsernameRef.current
    ) {
      return;
    }
    try {
      const response = await isUsernameAvailable(username);
      setUsernameAvailable(response.available);
      lastCheckedUsernameRef.current = trimmedUsername;
    } catch (error: any) {
      console.log("username avail check failed: ", error);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (currentStepIndex === 1) {
      if (!isValidEmail(data.email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!doPasswordsMatch(data.password, data.confirmPassword)) {
        alert("Passwords do not match. Please try again.");
        return;
      }
    }

    switch (currentStepIndex) {
      case 0:
        break;
      case 1:
        await handleAccountCreation();
        await updateUserInfo();
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        await updateUserInfo();
        break;
      case 6:
        await handleKycSubmission();
        break;
      case 7:
        await handleKycSubmission();
        break;
      case 8:
        await handleKycSubmission();
        break;
      case 9:
        await handleKycSubmission();
        break;
      case 10:
        await handleKycSubmission();
        break;
      case 11:
        await handleKycSubmission();
        break;
      case 12:
        await handleKycSubmission();
        break;
      default:
        break;
    }

    if (!isLastStep) next();
  }

  async function handleAccountCreation() {
    const userData = {
      email: data.email,
      username: data.username,
      display_name: data.displayName,
      password: data.password, 
    };
    try {
      const response = await registerUser(userData);
      console.log("Registration successful", response);
      alert("Successful Account Creation");
      try {
        await signIn(userData.email, userData.password, false);
        console.log("User signed in");
      } catch (error: any) {
        console.log(`could not ${data.email} sign user in`);
      }
      // next();
    } catch (error: any) {
      console.error("Registration failed: ", error);
    }
  }

  async function updateUserInfo() {
    const userData: UpdateUserData = {
      id: data.id, 
      email: data.email,
      username: data.username,
      country_of_tax_residence: data.countryOfTaxResidence,
      state_of_residence: data.stateOfResidence,
      citizenship_status: data.citizenshipStatus,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dateOfBirth,
      address: data.address,
      apt: data.address2,
      city: data.city,
      state: data.state,
      zip: Number(data.zipcode.replace(/,/g,"")),
      phone: data.phoneNumber,
      about: data.about,
      account_type: data.account_type,
    };
    try {
      const response = await updateUserProfile(userData);
      console.log("Update successful", response);
    } catch (error: any) {
      console.error("Update failed: ", error);
    }
  }

  async function handleKycSubmission() {
    const surveyResponses = Object.entries(data.kycResponses).map(([questionId, answer]) => ({
      questionId: Number(questionId),
      answer: answer,
    }));
  
    try {
      const response = await submitSurveyQuestions(surveyResponses);
      console.log("Survey submission successful", response);
      alert("Survey submitted successfully!");
      // next(); 
    } catch (error: any) {
      console.error("Survey submission failed: ", error);
      alert("Failed to submit survey.");
    }
  }
  

  return (
    <>
      <Navbar />
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
          {!isFirstStep && (
            <div className="form-buttons">
              {currentStepIndex !== 0 && currentStepIndex !== 2 && (
                <button className="back-button" type="button" onClick={back}>
                  Back
                </button>
              )}
              {!isFirstStep && (
                <button className="continue-finish-button" type="submit">
                  {isLastStep ? "Submit" : "Continue"}
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
