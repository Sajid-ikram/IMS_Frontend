import { useState, useCallback, ReactNode, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (e) {
        console.log("Invalid user data in local storage", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(
        "https://ism-server.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${message}`);
      }
      const data = await response.json();

      if (data?.user) {
        const userData: User = {
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  }, []);

  const register = useCallback(
    async (_id: string, name: string, email: string) => {
      setUser({
        _id,
        name,
        email,
        role: "employee", //default value for registration
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ _id, name, email, role: "employee" })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user"); //Remove user data from localStorage.
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
