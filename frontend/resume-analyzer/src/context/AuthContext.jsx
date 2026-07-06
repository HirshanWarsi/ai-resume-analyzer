import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("access_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function logout() {
    localStorage.removeItem("access_token");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
