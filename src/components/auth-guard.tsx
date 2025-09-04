import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, token, setUser, setToken, signOut, setLoading } =
    useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      try {
        // Check for stored token
        const storedToken = localStorage.getItem("auth-token");
        const storedUser = localStorage.getItem("user-data");

        if (storedToken && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser) as User;

            // Validate token is not expired (if it has expiration)
            if (isTokenValid(storedToken)) {
              setToken(storedToken);
              setUser(parsedUser);
            } else {
              // Token expired, clear auth
              signOut();
              toast.error("Your session has expired. Please sign in again.");
            }
          } catch (error) {
            console.error("Error parsing stored user data:", error);
            signOut();
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        signOut();
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setUser, setToken, signOut, setLoading]);

  // Listen for auth changes and sync with localStorage
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user-data", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user-data");
    }
  }, [user, token]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth-token" || e.key === "user-data") {
        if (!e.newValue) {
          // Auth was cleared in another tab
          signOut();
          toast.info("You have been signed out from another tab.");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [signOut]);

  // Don't render children until auth is initialized
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}

// Helper function to validate token (basic implementation)
function isTokenValid(token: string): boolean {
  try {
    // For JWT tokens, you could decode and check expiration
    // For now, just check if token exists and is not empty
    return token.length > 0;

    // Example JWT validation (uncomment if using JWT):
    // const payload = JSON.parse(atob(token.split('.')[1]));
    // const now = Date.now() / 1000;
    // return payload.exp > now;
  } catch {
    return false;
  }
}
