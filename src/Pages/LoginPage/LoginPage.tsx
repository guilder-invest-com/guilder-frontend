import { FormEvent, useEffect, useState } from "react";
import LoginForm from "../../Components/AccountCreationForms/LoginForm/LoginForm";
import { isValidEmail } from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";

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
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("User is logged in, navigating to home");
      navigate("/");
    }
  }, [user, navigate]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
    console.log(fields);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isValidEmail(data.email)) {
      alert("Enter a valid email");
      return;
    }

    try {
      await signIn(data.email, data.password, true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <form className="login-form" onSubmit={onSubmit}>
          <LoginForm {...data} updateFields={updateFields} />
          <div className="form-buttons">
            <button id="continue-finish-button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}