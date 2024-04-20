import axios from "axios";
import { UpdateUserData } from "../Pages/SignupPage/SignupPage";

const BACKEND_API_URL = "http://dev.guilder-invest.com:3500";
const BACKEND_LOCAL_URL = "http://localhost:8080";

type UserData = {
  email: string;
  username: string;
  display_name: string;
  password: string;
};

type LoginData = {
  email: string;
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

export async function getSurveyQuestions() {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/survey/questions`);
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
    console.log("before axios post call");
    const response = await axios.post(
      `${BACKEND_API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    console.log("axios post response: ", response);   
    // if (response.data && response.data.email) {
    return response.data;
    // }
  } catch (error: any) {
    console.error("Login failed: ", error.response || error.message);
    throw error;
  }
}

// export async function handleLogin(email: string, password: string) {
//   const requestOptions: RequestInit = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include', // 'include' to send cookies with cross-origin requests
//     body: JSON.stringify({ email, password })
//   };

//   try {
//     const response = await fetch(`${BACKEND_API_URL}/auth/login`, requestOptions);

//     if (!response.ok) {
//       // You could also parse the response to get more detailed error messages
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Login failed:", error);
//     throw error;
//   }
// }

export async function isEmailAvailable(email: string) {
  try {
    const response = await axios.get(
      `${BACKEND_API_URL}/user/exists/email/${email}`
    );
    return response.data;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}

export async function getUserProfileData() {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/user/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
}

export async function updateUserProfile(userData: UpdateUserData) {
  try {
    const response = await axios.post(
      `${BACKEND_API_URL}/user/profile`,
      userData,
      {
        withCredentials: true,
      }
    );
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
  userId: string,
  surveyResponses: Array<{ questionId: number; answer: string }>
) {
  try {
    const response = await axios.post(
      `${BACKEND_API_URL}/survey/submit`,
      {
        userId,
        responses: surveyResponses,
      },
      {
        withCredentials: true,
      }
    );
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
    const response = await axios.get(
      `${BACKEND_API_URL}/user/exists/username/${username}`
    );
    return response.data;
  } catch (error: any) {
    console.log("Request failed", error.response ? error.response.data : error);
    throw error;
  }
}
