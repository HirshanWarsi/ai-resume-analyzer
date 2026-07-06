import { useContext } from "react";
import { AuthContext } from "@/context/auth-context-value";

export function useAuth() {
  return useContext(AuthContext);
}
