import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  IconBell,
  IconMail,
  IconPhone,
  IconSettings,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconInfoCircle,
  IconCircleCheck,
  IconClock,
} from "@tabler/icons-react";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    sessionAlerts: true,
    systemUpdates: true,
    emergencyAlerts: true,
    weeklyReports: false,
    maintenanceAlerts: true,
  });

  const [notifications] = useState([
    {
      id: "1",
      type: "success",
      title: "Session Completed",
      message:
        "Phototherapy session for Ali Ahmad has been completed successfully.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Temperature Alert",
      message:
        "High temperature detected in session room. Please check the cooling system.",
      time: "15 minutes ago",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "System Update",
      message:
        "A new software update is available. Update recommended for improved performance.",
      time: "1 hour ago",
      read: true,
    },
    {
      id: "4",
      type: "error",
      title: "Device Connection Lost",
      message:
        "Arduino device connection lost. Please check the connection and restart if necessary.",
      time: "2 hours ago",
      read: true,
    },
    {
      id: "5",
      type: "info",
      title: "Weekly Report",
      message: "Your weekly phototherapy report is ready for review.",
      time: "1 day ago",
      read: true,
    },
  ]);

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success("Notification settings updated");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <IconCircleCheck className="h-5 w-5 text-green-500" />;
      case "warning":
        return <IconAlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <IconX className="h-5 w-5 text-red-500" />;
      case "info":
      default:
        return <IconInfoCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge className="bg-green-500">Success</Badge>;
      case "warning":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-600"
          >
            Warning
          </Badge>
        );
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "info":
      default:
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            Info
          </Badge>
        );
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <IconBell className="h-6 w-6" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </h1>
        <p className="text-muted-foreground">
          Manage your notification preferences and view recent alerts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconSettings className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Choose how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Communication Channels */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Communication Channels</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconMail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email">Email Notifications</Label>
                </div>
                <Switch
                  id="email"
                  checked={settings.emailNotifications}
                  onCheckedChange={() =>
                    handleSettingChange("emailNotifications")
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="push">Push Notifications</Label>
                </div>
                <Switch
                  id="push"
                  checked={settings.pushNotifications}
                  onCheckedChange={() =>
                    handleSettingChange("pushNotifications")
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconPhone className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="sms">SMS Notifications</Label>
                </div>
                <Switch
                  id="sms"
                  checked={settings.smsNotifications}
                  onCheckedChange={() =>
                    handleSettingChange("smsNotifications")
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Notification Types */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notification Types</h3>

              <div className="flex items-center justify-between">
                <Label htmlFor="sessions">Session Alerts</Label>
                <Switch
                  id="sessions"
                  checked={settings.sessionAlerts}
                  onCheckedChange={() => handleSettingChange("sessionAlerts")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="emergency">Emergency Alerts</Label>
                <Switch
                  id="emergency"
                  checked={settings.emergencyAlerts}
                  onCheckedChange={() => handleSettingChange("emergencyAlerts")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="system">System Updates</Label>
                <Switch
                  id="system"
                  checked={settings.systemUpdates}
                  onCheckedChange={() => handleSettingChange("systemUpdates")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance">Maintenance Alerts</Label>
                <Switch
                  id="maintenance"
                  checked={settings.maintenanceAlerts}
                  onCheckedChange={() =>
                    handleSettingChange("maintenanceAlerts")
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reports">Weekly Reports</Label>
                <Switch
                  id="reports"
                  checked={settings.weeklyReports}
                  onCheckedChange={() => handleSettingChange("weeklyReports")}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Test Notifications
              </Button>
              <p className="text-xs text-muted-foreground">
                Send a test notification to verify your settings
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>
                    Your latest system alerts and updates
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <IconCheck className="mr-2 h-4 w-4" />
                    Mark All Read
                  </Button>
                  <Button variant="outline" size="sm">
                    Clear All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      !notification.read
                        ? "bg-blue-50 border-blue-200"
                        : "bg-background"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            {getNotificationBadge(notification.type)}
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconClock className="h-3 w-3" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="text-center py-8">
                  <IconBell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! No new notifications to show.
                  </p>
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button variant="outline">Load More Notifications</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common notification-related actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <IconBell className="h-6 w-6" />
              <span className="text-sm">Enable All</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <IconX className="h-6 w-6" />
              <span className="text-sm">Disable All</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <IconSettings className="h-6 w-6" />
              <span className="text-sm">Reset Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <IconMail className="h-6 w-6" />
              <span className="text-sm">Email Digest</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
