import { FormEvent, useEffect, useState } from "react";
import LoginForm from "../../Components/AccountCreationForms/LoginForm/LoginForm";
import { isValidEmail } from "../../utils/validations";
// import { hashPassword } from "../../utils/hashPassword";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

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

    signIn(data.email, data.password);
    // const hashedPassword = hashPassword(data.password);


    // handleLogin(data.email, data.password).then(() => {
    //   console.log('login successful, navigating to home')
    //   navigate('/');
    // }).catch(error => {
    //   console.error('login failed: ', error);
    // });
  }

  return (
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
  );
}
