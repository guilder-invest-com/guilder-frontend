// AuthProvider.tsx
import { createContext, useState, ReactNode, FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfileData, handleLogin } from "../Api/api";

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
  user: { email: string } | null;
  signIn: (email: string, password: string) => void;
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

  const signIn = async (email: string, password: string) => {
    try {
      console.log("inside try")
      const loginResponse = await handleLogin(email, password);
      console.log("login response =", loginResponse);
      if (loginResponse.user) {
        console.log("inside loginResponse.user");
        const profileData = await getUserProfileData(); 
        console.log(profileData);
        if (profileData) {
          setUser(profileData);
          localStorage.setItem("user", JSON.stringify(profileData));
          navigate("/"); 
        }
      }
    } catch (error) {
      console.error("Login failed: ", error);
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
