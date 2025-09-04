import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IconLoader2 } from "@tabler/icons-react";

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isLoading, checkAuth, checkAdmin } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 1000); // Give time for store to hydrate

    return () => clearTimeout(timer);
  }, []);

  // Show loading state while checking auth
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <IconLoader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <CardTitle className="text-center">
              Checking Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we check your authentication status...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is authenticated
  const isAuthenticated = checkAuth();

  if (isAuthenticated) {
    // User is authenticated, determine where to redirect
    const isAdmin = checkAdmin();
    const redirectTo = isAdmin ? "/dashboard" : "/";

    return <Navigate to={redirectTo} replace />;
  }

  // User is not authenticated, allow access to auth pages
  return <>{children}</>;
}
