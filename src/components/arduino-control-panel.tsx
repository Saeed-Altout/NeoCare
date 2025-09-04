import { useState, useEffect } from "react";
import {
  IconBolt,
  IconBoltOff,
  IconPlug,
  IconPlugOff,
  IconAlertTriangle,
  IconRefresh,
  IconActivity,
  IconWifi,
  IconWifiOff,
  IconCarFan,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { useArduinoStore } from "@/stores/arduino-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  connectArduino,
  disconnectArduino,
  getArduinoStatus,
  getArduinoPorts,
  setArduinoMode,
  setArduinoFan,
  emergencyStopArduino,
} from "@/apis/arduino";

export function ArduinoControlPanel() {
  const {
    status,
    availablePorts,
    currentMode,
    fanStatus,
    isConnecting,
    isLoading,
    error,
    setStatus,
    setAvailablePorts,
    setCurrentMode,
    setFanStatus,
    setConnecting,
    setLoading,
    setError,
    clearError,
    isConnected,
    getConnectionInfo,
  } = useArduinoStore();

  const [selectedPort, setSelectedPort] = useState<string>("");
  const [selectedBaudRate, setSelectedBaudRate] = useState<number>(9600);

  // Load available ports on component mount
  useEffect(() => {
    loadAvailablePorts();
    loadArduinoStatus();

    // Set up periodic status checking
    const interval = setInterval(loadArduinoStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadAvailablePorts = async () => {
    try {
      setLoading(true);
      const response = await getArduinoPorts();
      setAvailablePorts(response.ports);
    } catch (error) {
      console.error("Failed to load Arduino ports:", error);
      toast.error("Failed to load available ports");
    } finally {
      setLoading(false);
    }
  };

  const loadArduinoStatus = async () => {
    try {
      const statusData = await getArduinoStatus();
      setStatus(statusData);
    } catch (error) {
      console.error("Failed to load Arduino status:", error);
    }
  };

  const handleConnect = async () => {
    if (!selectedPort) {
      toast.error("Please select a port");
      return;
    }

    try {
      setConnecting(true);
      clearError();

      const response = await connectArduino({
        port: selectedPort,
        baudRate: selectedBaudRate,
      });

      if (response.success) {
        setStatus({
          isConnected: true,
          portInfo: response.portInfo,
        });
        toast.success("Arduino connected successfully");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to connect to Arduino";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      clearError();

      const response = await disconnectArduino();
      if (response.success) {
        setStatus({ isConnected: false });
        setCurrentMode("off");
        setFanStatus(false);
        toast.success("Arduino disconnected successfully");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to disconnect Arduino";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = async (mode: "low" | "high" | "both" | "off") => {
    if (!isConnected()) {
      toast.error("Arduino not connected");
      return;
    }

    try {
      setLoading(true);
      clearError();

      const response = await setArduinoMode(mode);
      if (response.success) {
        setCurrentMode(mode);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to set mode";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFanToggle = async () => {
    if (!isConnected()) {
      toast.error("Arduino not connected");
      return;
    }

    try {
      setLoading(true);
      clearError();

      const newStatus = !fanStatus;
      const response = await setArduinoFan(newStatus);
      if (response.success) {
        setFanStatus(newStatus);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to control fan";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyStop = async () => {
    try {
      setLoading(true);
      clearError();

      const response = await emergencyStopArduino();
      if (response.success) {
        setCurrentMode("off");
        setFanStatus(false);
        toast.success("Emergency stop activated");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to execute emergency stop";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "low":
        return <IconBolt className="h-4 w-4 text-yellow-500 animate-pulse" />;
      case "high":
        return <IconBolt className="h-4 w-4 text-orange-500 animate-pulse" />;
      case "both":
        return <IconBolt className="h-4 w-4 text-red-500 animate-bounce" />;
      default:
        return <IconBoltOff className="h-4 w-4 text-gray-400" />;
    }
  };

  const getFanIcon = () => {
    return fanStatus ? (
      <IconCarFan className="h-4 w-4 text-blue-500 animate-spin" />
    ) : (
      <IconCarFan className="h-4 w-4 text-gray-400" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Connection Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isConnected() ? (
                <IconWifi className="h-5 w-5 text-green-500" />
              ) : (
                <IconWifiOff className="h-5 w-5 text-red-500" />
              )}
              <CardTitle>Arduino Connection</CardTitle>
            </div>
            <Badge variant={isConnected() ? "default" : "secondary"}>
              {isConnected() ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <CardDescription>
            {isConnected() ? getConnectionInfo() : "Connect to Arduino device"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected() && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Serial Port</label>
                <Select value={selectedPort} onValueChange={setSelectedPort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select port" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePorts.map((port) => (
                      <SelectItem key={port.path} value={port.path}>
                        {port.path}{" "}
                        {port.manufacturer && `(${port.manufacturer})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Baud Rate</label>
                <Select
                  value={selectedBaudRate.toString()}
                  onValueChange={(value) =>
                    setSelectedBaudRate(parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9600">9600</SelectItem>
                    <SelectItem value="19200">19200</SelectItem>
                    <SelectItem value="38400">38400</SelectItem>
                    <SelectItem value="57600">57600</SelectItem>
                    <SelectItem value="115200">115200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {!isConnected() ? (
              <>
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting || !selectedPort}
                  className="flex-1"
                >
                  <IconPlug className="mr-2 h-4 w-4" />
                  {isConnecting ? "Connecting..." : "Connect"}
                </Button>
                <Button
                  variant="outline"
                  onClick={loadAvailablePorts}
                  disabled={isLoading}
                >
                  <IconRefresh className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={handleDisconnect}
                disabled={isLoading}
                className="flex-1"
              >
                <IconPlugOff className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              <IconAlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Control Panel */}
      {isConnected() && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phototherapy Control */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                {getModeIcon(currentMode)}
                <CardTitle>Phototherapy Control</CardTitle>
              </div>
              <CardDescription>Control LED intensity modes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={currentMode === "low" ? "default" : "outline"}
                  onClick={() => handleModeChange("low")}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <IconBolt className="h-4 w-4" />
                  Low
                </Button>
                <Button
                  variant={currentMode === "high" ? "default" : "outline"}
                  onClick={() => handleModeChange("high")}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <IconBolt className="h-4 w-4" />
                  High
                </Button>
                <Button
                  variant={currentMode === "both" ? "default" : "outline"}
                  onClick={() => handleModeChange("both")}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <IconBolt className="h-4 w-4" />
                  Both
                </Button>
                <Button
                  variant={currentMode === "off" ? "default" : "outline"}
                  onClick={() => handleModeChange("off")}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <IconBoltOff className="h-4 w-4" />
                  Off
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Current Mode:</span>
                <div className="flex items-center gap-2">
                  {getModeIcon(currentMode)}
                  <span className="text-sm capitalize">{currentMode}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fan Control */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                {getFanIcon()}
                <CardTitle>Fan Control</CardTitle>
              </div>
              <CardDescription>Temperature regulation system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleFanToggle}
                disabled={isLoading}
                variant={fanStatus ? "default" : "outline"}
                className="w-full flex items-center gap-2"
              >
                {getFanIcon()}
                {fanStatus ? "Turn Off Fan" : "Turn On Fan"}
              </Button>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Fan Status:</span>
                <div className="flex items-center gap-2">
                  {getFanIcon()}
                  <span className="text-sm">
                    {fanStatus ? "Running" : "Stopped"}
                  </span>
                </div>
              </div>

              <Separator />

              <Button
                variant="destructive"
                onClick={handleEmergencyStop}
                disabled={isLoading}
                className="w-full flex items-center gap-2"
              >
                <IconAlertTriangle className="h-4 w-4" />
                Emergency Stop
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Status Information */}
      {isConnected() && status.stats && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconActivity className="h-5 w-5 text-green-500" />
              <CardTitle>Connection Statistics</CardTitle>
            </div>
            <CardDescription>Real-time communication metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Total Lines</p>
                <p className="font-semibold">
                  {status.stats.totalLinesReceived}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Parsed</p>
                <p className="font-semibold">{status.stats.jsonLinesParsed}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Invalid</p>
                <p className="font-semibold">
                  {status.stats.invalidLinesIgnored}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Errors</p>
                <p className="font-semibold">{status.stats.parseErrors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
