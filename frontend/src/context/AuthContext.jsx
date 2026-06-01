import { createContext, useContext, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/auth.service.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("sharecloud_token");
    if (!token || token === "undefined" || token === "null") {
      localStorage.removeItem("sharecloud_token");
      localStorage.removeItem("sharecloud_user");
      return null;
    }

    const saved = localStorage.getItem("sharecloud_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  async function login(values) {
    setLoading(true);
    try {
      const response = await loginUser(values);
      const token = response.token || response.data?.token;
      if (!token) {
        throw new Error("Login succeeded but token was not returned by backend");
      }
      const nextUser = response.data?.user || { email: values.email, username: values.email.split("@")[0] };
      localStorage.setItem("sharecloud_token", token);
      localStorage.setItem("sharecloud_user", JSON.stringify(nextUser));
      setUser(nextUser);
      return response;
    } finally {
      setLoading(false);
    }
  }

  async function register(values) {
    setLoading(true);
    try {
      const response = await registerUser(values);
      return response;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("sharecloud_token");
    localStorage.removeItem("sharecloud_user");
    setUser(null);
  }

  const value = useMemo(() => {
    const token = localStorage.getItem("sharecloud_token");
    const hasToken = Boolean(token && token !== "undefined" && token !== "null");
    return { user, loading, login, register, logout, isAuthenticated: Boolean(user && hasToken) };
  }, [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
