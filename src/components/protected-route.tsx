import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  IconLock,
  IconShield,
  IconLoader2,
  IconAlertTriangle,
} from "@tabler/icons-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, isLoading, checkAuth, checkAdmin, signOut } = useAuthStore();
  const location = useLocation();
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
            <CardTitle className="text-center">Verifying Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we verify your authentication...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is authenticated
  const isUserAuthenticated = checkAuth();

  if (!isUserAuthenticated) {
    return (
      <Navigate
        to="/auth/sign-in"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Check admin requirement
  if (requireAdmin && !checkAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <IconShield className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-center text-red-600">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                You don't have permission to access this area.
              </p>
              <p className="text-sm text-muted-foreground">
                Administrator privileges are required.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <IconAlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">
                    Current Access Level
                  </p>
                  <p className="text-yellow-700">
                    Role:{" "}
                    <span className="font-medium capitalize">
                      {user?.role || "Unknown"}
                    </span>
                  </p>
                  <p className="text-yellow-700">
                    Email:{" "}
                    <span className="font-medium">
                      {user?.email || "Unknown"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full"
              >
                Go Back
              </Button>
              <Button
                onClick={signOut}
                variant="destructive"
                className="w-full"
              >
                <IconLock className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
}

// Higher-order component for admin-only routes
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requireAdmin={true}>{children}</ProtectedRoute>;
}

// Higher-order component for authenticated routes
export function AuthRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requireAdmin={false}>{children}</ProtectedRoute>;
}
