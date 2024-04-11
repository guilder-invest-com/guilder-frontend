import axios from "axios";

const BACKEND_API_URL = "http://dev.guilder-invest.com:3500";

type UserData = {
  email: string;
  username: string;
  display_name: string;
  password: string;
};

export async function registerUser(userData: UserData) {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/auth/signup`, {
      email: userData.email,
      username: userData.username,
      display_name: userData.display_name,
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
}

export async function isEmailAvailable(email: string) {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/user/exists/email/${email}`);
    return response.data;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}

export async function isUsernameAvailable(username: string) {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/user/exists/username/${username}`);
    return response.data;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}

