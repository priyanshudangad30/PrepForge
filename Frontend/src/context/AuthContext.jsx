import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("prepforge_token");
    const savedUser = localStorage.getItem("prepforge_user");

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("prepforge_token");
        localStorage.removeItem("prepforge_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem("prepforge_token", token);
    localStorage.setItem("prepforge_user", JSON.stringify(userData));
    setUser(userData);
    return res.data;
  };

  const signup = async (name, email, password) => {
    const res = await API.post("/auth/signup", { name, email, password });
    const { token, ...userData } = res.data;
    localStorage.setItem("prepforge_token", token);
    localStorage.setItem("prepforge_user", JSON.stringify(userData));
    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("prepforge_token");
    localStorage.removeItem("prepforge_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
