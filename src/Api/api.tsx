// src/Api/api.js
import axiosInstance from "./axiosInstance";
import { UpdateUserData } from "../Pages/SignupPage/SignupPage";
import Cookies from "js-cookie";
import { Stock } from "../Pages/CreatePortfolioPage/CreatePortfolioPage";

type UserData = {
  email: string;
  username: string;
  display_name: string;
  password: string;
};

export type CreatePortfolioFormData = {
  ticker: string;
  name: string;
  description: string;
  management_fee: number;
  risk_profile: string;
  portfolio_holdings: Stock[];
};

export async function registerUser(userData: UserData) {
  try {
    const response = await axiosInstance.post("/auth/signup", {
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

export async function getSurveyQuestions() {
  try {
    const response = await axiosInstance.get("/survey/questions");
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch survey questions: ",
      error.response || error.message
    );
    throw error;
  }
}

export async function handleLogin(email: string, password: string) {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    console.log("axios post response:", response);
    console.log(Cookies.get("connect.sid"));
    console.log(Cookies.get("sid"));
    return response; // Return the full response to access headers
  } catch (error: any) {
    console.error("Login failed:", error.response || error.message);
    throw error;
  }
}
// export async function handleLogin(email: string, password: string) {
//   try {
//     console.log("before axios post call");
//     const response = await axiosInstance.post('/auth/login', { email, password });
//     console.log("axios post response: ", response);
//     return response.data;
//   } catch (error: any) {
//     console.error("Login failed: ", error.response || error.message);
//     throw error;
//   }
// }

export async function isEmailAvailable(email: string) {
  try {
    const response = await axiosInstance.get(`/user/exists/email/${email}`);
    return response.data;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}

export async function getUserProfileData() {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
}

export async function updateUserProfile(userData: UpdateUserData) {
  try {
    const response = await axiosInstance.post("/user/profile", userData);
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to update user profile:",
      error.response || error.message
    );
    throw error;
  }
}

export async function submitSurveyQuestions(
  surveyResponses: Array<{ questionId: number; answer: string }>
) {
  try {
    const response = await axiosInstance.post(
      "/survey/submit",
      surveyResponses
    ); // Adjusted here
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to submit survey questions:",
      error.response || error.message
    );
    throw error;
  }
}

export async function isUsernameAvailable(username: string) {
  try {
    const response = await axiosInstance.get(
      `/user/exists/username/${username}`
    );
    return response.data;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}

export async function fetchAllStocks() {
  try {
    const response = await axiosInstance.get(`/tickers`);
    return response.data;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}
export async function fetchStockPrice(ticker: string) {
  try {
    const response = await axiosInstance.get(`/ticker/${ticker}`);
    return response.data.c;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}
// api.js or api.ts

export async function createPortfolio(portfolioData: CreatePortfolioFormData) {
  try {
    const response = await axiosInstance.post(`/portfolio/create`, portfolioData);
    if (response.status !== 200) {
      throw new Error("Failed to create portfolio");
    }
    return response.data;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}

