import { FormEvent, useState } from "react";
import LoginForm from "../../Components/AccountCreationForms/LoginForm/LoginForm";
import { isValidEmail } from "../../utils/validations";
import { hashPassword } from "../../utils/hashPassword";

type FormData = {
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [data, setData] = useState<FormData>(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
    console.log(fields);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isValidEmail(data.email)) {
      alert("Enter a valid email");
      return;
    }
    const hashedPassword = hashPassword(data.password);

    const UserLoginData = {
      email: data.email,
      password: hashedPassword,
    };

    console.log("submit pressed");
  }

  return (
    <div className="main-content">
      <form onSubmit={onSubmit}>
        <LoginForm {...data} updateFields={updateFields} />
        <div className="form-buttons">
          <button id="continue-finish-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
