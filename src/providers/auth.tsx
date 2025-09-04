import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && user.token) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return <>{children}</>;
}
