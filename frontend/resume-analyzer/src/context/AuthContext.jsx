import { useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context-value";
import { clearAuthToken, setAuthToken } from "@/services/api";
import { getCurrentUser } from "@/services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      clearAuthToken();
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setAuthToken(token);
      const response = await getCurrentUser();
      setUser(response.data);
    } catch (err) {
      console.error(err);
      clearAuthToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchUser();
  }, []);

  function login(token) {
    setAuthToken(token);
    return fetchUser();
  }

  function logout() {
    clearAuthToken();
    setUser(null);
    window.location.assign("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        login,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
