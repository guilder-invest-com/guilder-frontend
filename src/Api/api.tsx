import axios from "axios";

const BACKEND_API_URL = "http://dev.guilder-invest.com:3500";

type UserData = {
  email: string;
  password: string;
};

export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/auth/signup`, {
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  } catch (error: any) {
    console.log(
      "Registration error: ",
      error.response ? error.response.data : error
    );
    throw error;
  }
};
