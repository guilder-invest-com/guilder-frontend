import { createContext, useState, ReactNode, FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfileData, handleLogin } from "../Api/api";
import axiosInstance from "../Api/axiosInstance";
import Cookies from 'js-cookie';

type UserType = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  country_of_tax_residence: string | null;
  state_of_residence: string | null;
  citizenship_status: string | null;
  firstName: string | null;
  lastName: string | null;
  dob: string | null; 
  address: string | null;
  apt: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  account_type: string | null;
  phone: string | null;
  about: string | null;
};

type AuthContextType = {
  user: UserType | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  signIn: async () => {},
  signOut: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  // const signIn = async (email: string, password: string) => {
  //   try {
  //     const loginResponse = await handleLogin(email, password);
  //     if (loginResponse.data.message === "Login successful") {
  //       const setCookieHeader = loginResponse.headers['set-cookie'];
  //       console.log(loginResponse.headers['set-cookie']);
  //       if (setCookieHeader && setCookieHeader.length > 0) {
  //         console.log("Cookies are present in the response headers");
  //         // Manually set the cookie using js-cookie
  //         Cookies.set('connect.sid', setCookieHeader[0], { path: '/' });
  //       }

  //       const profileData = await getUserProfileData(); 
  //       if (profileData) {
  //         localStorage.setItem("user", JSON.stringify(profileData)); 
  //         setUser(profileData);  
  //         navigate("/");  
  //       }
  //     } else {
  //       console.error("Login failed or no user data received");
  //     }
  //   } catch (error) {
  //     console.error("Login process failed:", error);
  //   }
  // };

  const signIn = async (email: string, password: string) => {
    try {
      const loginResponse = await handleLogin(email, password);
      if (loginResponse.data.message === "Login successful") {
        const profileData = await getUserProfileData(); 
        if (profileData) {
          localStorage.setItem("user", JSON.stringify(profileData)); 
          setUser(profileData);  
          navigate("/");  
        }
      } else {
        console.error("Login failed or no user data received");
      }
    } catch (error) {
      console.error("Login process failed:", error);
    }
  };



  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};