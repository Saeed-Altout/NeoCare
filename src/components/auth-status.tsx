import { useAuthStore } from "@/stores/auth-store";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconShield, IconUser, IconCrown } from "@tabler/icons-react";

export function AuthStatus() {
  const { user, checkAuth, checkAdmin } = useAuthStore();

  if (!checkAuth()) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <IconUser className="h-4 w-4" />
            Authentication Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="destructive">Not Authenticated</Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <IconShield className="h-4 w-4" />
          Authentication Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant="default">Authenticated</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Role:</span>
          <Badge
            variant={checkAdmin() ? "default" : "secondary"}
            className={checkAdmin() ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {checkAdmin() && <IconCrown className="mr-1 h-3 w-3" />}
            {user?.role || "Unknown"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">User:</span>
          <span className="text-sm font-medium truncate max-w-32">
            {user?.name || "Unknown"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Email:</span>
          <span className="text-sm text-muted-foreground truncate max-w-32">
            {user?.email || "Unknown"}
          </span>
        </div>

        {checkAdmin() && (
          <div className="pt-2 border-t">
            <Badge
              variant="outline"
              className="w-full justify-center border-purple-200 text-purple-700"
            >
              <IconCrown className="mr-1 h-3 w-3" />
              Dashboard Access Granted
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
