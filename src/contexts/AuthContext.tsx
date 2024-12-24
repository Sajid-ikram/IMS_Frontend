import { createContext } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    id: string,
    name: string,
    email: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
}

export const defaultUser: User = {
  _id: "",
  name: "Test User",
  email: "test@example.com",
  role: "eomployee",
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});
