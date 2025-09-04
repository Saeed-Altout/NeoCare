import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  IconArrowLeft,
  IconUser,
  IconClock,
  IconActivity,
  IconPlayerStop,
  IconThermometer,
  IconDroplet,
  IconCarFan,
  IconBolt,
  IconSun,
  IconChartLine,
} from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useSessionsStore } from "@/stores/sessions-store";
import { usePatientsStore } from "@/stores/patients-store";
import { useMeasurementsStore } from "@/stores/measurements-store";
import { useWebSocket } from "@/lib/websocket";
import { stopSession } from "@/apis/sessions";
import { getSessionMeasurements } from "@/apis/measurements";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function SessionDetailsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { sessions, updateSession } = useSessionsStore();
  const { patients } = usePatientsStore();
  const {
    getSessionMeasurements: getStoredMeasurements,
    setSessionMeasurements,
    getLatestMeasurement,
  } = useMeasurementsStore();
  const { joinSession, leaveSession } = useWebSocket();

  const [isLoading, setIsLoading] = useState(false);
  const [, forceUpdate] = useState(0);

  const session = sessions.find((s) => s.id === sessionId);
  const patient = patients.find((p) => p.id === session?.patientId);
  let sessionMeasurements = sessionId ? getStoredMeasurements(sessionId) : [];

  // Generate sample data if no measurements are available (for testing)
  if (sessionMeasurements.length === 0 && session) {
    const sampleMeasurements: Measurement[] = [];
    const now = new Date();

    for (let i = 0; i < 10; i++) {
      const time = new Date(now.getTime() - (10 - i) * 60000); // Every minute for last 10 minutes
      sampleMeasurements.push({
        id: `sample-${i}`,
        sessionId: session.id,
        mode: session.mode,
        temperature: 36 + Math.random() * 2, // 36-38°C
        humidity: 40 + Math.random() * 20, // 40-60%
        fan: Math.random() > 0.5,
        timestamp: time.toISOString(),
      });
    }
    sessionMeasurements = sampleMeasurements;
  }

  // Load session measurements
  const loadMeasurements = useCallback(async () => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      const response = await getSessionMeasurements(sessionId);

      // Handle different response formats
      if (response.status === "success" && response.data) {
        setSessionMeasurements(sessionId, response.data);
      } else if (Array.isArray(response)) {
        // Direct array response
        setSessionMeasurements(sessionId, response);
      } else if (response && Array.isArray(response.data)) {
        // Response with data property
        setSessionMeasurements(sessionId, response.data);
      } else {
        console.log("Measurements response:", response);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to load measurements";
        toast.error(errorMessage);
        console.error("Measurements error:", error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, setSessionMeasurements]);

  // Load data on component mount
  useEffect(() => {
    loadMeasurements();
  }, [loadMeasurements]);

  // Real-time updates
  useEffect(() => {
    if (sessionId) {
      joinSession(sessionId);

      const interval = setInterval(() => {
        forceUpdate((prev) => prev + 1);
        // Refresh measurements every 10 seconds
        if (Date.now() % 10000 < 1000) {
          loadMeasurements();
        }
      }, 1000);

      return () => {
        leaveSession(sessionId);
        clearInterval(interval);
      };
    }
  }, [sessionId, joinSession, leaveSession, loadMeasurements]);

  if (!session) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-semibold mb-2">Session Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The session you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/dashboard/sessions">
                <IconArrowLeft className="mr-2 h-4 w-4" />
                Back to Sessions
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateProgress = () => {
    if (session.status !== "running") return 100;

    const startTime = new Date(session.createdAt).getTime();
    const currentTime = Date.now();
    const durationMs = session.duration * 60 * 1000;
    const elapsed = currentTime - startTime;

    return Math.min((elapsed / durationMs) * 100, 100);
  };

  const calculateRemainingTime = () => {
    if (session.status !== "running") return 0;

    const startTime = new Date(session.createdAt).getTime();
    const currentTime = Date.now();
    const durationMs = session.duration * 60 * 1000;
    const elapsed = currentTime - startTime;
    const remaining = Math.max(durationMs - elapsed, 0);

    return Math.ceil(remaining / 1000 / 60); // Convert to minutes
  };

  const formatRemainingTime = (minutes: number) => {
    if (minutes <= 0) return "0m";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusBadge = (status: string) => {
    const normalizedStatus = status?.toLowerCase();

    switch (normalizedStatus) {
      case "running":
      case "active":
      case "in_progress":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Running</Badge>
        );
      case "completed":
      case "finished":
      case "done":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            Completed
          </Badge>
        );
      case "stopped":
      case "cancelled":
      case "terminated":
        return (
          <Badge
            variant="outline"
            className="border-orange-500 text-orange-600"
          >
            Stopped
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status || "Unknown"}</Badge>;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "low":
        return <IconBolt className="h-4 w-4 text-yellow-500" />;
      case "high":
        return <IconBolt className="h-4 w-4 text-orange-500" />;
      case "both":
        return <IconBolt className="h-4 w-4 text-red-500" />;
      default:
        return <IconBolt className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleStopSession = async () => {
    if (!session) return;

    try {
      setIsLoading(true);
      const response = await stopSession(session.id);
      updateSession(session.id, response.session);
      leaveSession(session.id);
      toast.success("Session stopped successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to stop session";
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare chart data
  const chartData = sessionMeasurements
    .map((measurement, index) => ({
      time: new Date(measurement.timestamp).toLocaleTimeString(),
      timestamp: new Date(measurement.timestamp).getTime(),
      temperature: measurement.temperature,
      humidity: measurement.humidity,
      index: index + 1,
    }))
    .slice(-20); // Show last 20 measurements

  const progress = calculateProgress();
  const remainingTime = calculateRemainingTime();
  const latestMeasurement =
    sessionMeasurements[sessionMeasurements.length - 1] ||
    (sessionId ? getLatestMeasurement(sessionId) : null);

  // Chart configurations
  const temperatureChartConfig = {
    temperature: {
      label: "Temperature",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const humidityChartConfig = {
    humidity: {
      label: "Humidity",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const combinedChartConfig = {
    temperature: {
      label: "Temperature",
      color: "hsl(var(--chart-1))",
    },
    humidity: {
      label: "Humidity",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Link to="/dashboard/sessions">
              <IconArrowLeft className="h-4 w-4 mr-2" />
              Back to Sessions
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Session Details</h1>
            <p className="text-muted-foreground">
              Monitor and control phototherapy session
            </p>
          </div>
        </div>

        {session.status === "running" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isLoading}>
                <IconPlayerStop className="mr-2 h-4 w-4" />
                Stop Session
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Stop Session</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to stop this session? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleStopSession}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Stop Session
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Patient Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconUser className="h-5 w-5" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {patient ? (
                <>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold">{patient.fullName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Patient ID
                      </p>
                      <p className="font-mono font-semibold text-primary">
                        {patient.patientId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Age
                      </p>
                      <p>{patient.age}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Gender
                      </p>
                      <p className="capitalize">{patient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Blood Type
                      </p>
                      <p>{patient.bloodType}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Mother's Name
                    </p>
                    <p>{patient.motherName}</p>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">
                  Patient information not found
                </p>
              )}
            </CardContent>
          </Card>

          {/* Session Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconActivity className="h-5 w-5" />
                Session Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                {getStatusBadge(session.status)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mode</span>
                <div className="flex items-center gap-2">
                  {getModeIcon(session.mode)}
                  <span className="capitalize">{session.mode}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">TSB Level</span>
                <span>{session.tsb} mg/dL</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Duration</span>
                <span>{formatDuration(session.duration)}</span>
              </div>

              {session.status === "running" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />

                    <div className="flex items-center gap-1 text-sm">
                      <IconClock
                        className={`h-3 w-3 ${
                          remainingTime <= 0 ? "text-red-500" : ""
                        }`}
                      />
                      <span
                        className={
                          remainingTime <= 0 ? "text-red-500 font-semibold" : ""
                        }
                      >
                        {remainingTime <= 0
                          ? "Time up!"
                          : `${formatRemainingTime(remainingTime)} left`}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Started</span>
                  <span>{formatDate(session.createdAt)}</span>
                </div>
                {session.endedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ended</span>
                    <span>{formatDate(session.endedAt)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Current Readings */}
          {latestMeasurement && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconSun className="h-5 w-5" />
                  Current Readings
                </CardTitle>
                <CardDescription>Latest sensor measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                    <IconThermometer className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Temperature
                      </p>
                      <p className="font-semibold">
                        {latestMeasurement.temperature}°C
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <IconDroplet className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Humidity</p>
                      <p className="font-semibold">
                        {latestMeasurement.humidity}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <IconCarFan
                      className={`h-4 w-4 ${
                        latestMeasurement.fan
                          ? "text-green-500 animate-spin"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">Fan</p>
                      <p className="font-semibold">
                        {latestMeasurement.fan ? "ON" : "OFF"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                    <IconSun
                      className={`h-4 w-4 ${
                        latestMeasurement.mode !== "off"
                          ? "text-yellow-500 animate-pulse"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">LED Mode</p>
                      <p className="font-semibold capitalize">
                        {latestMeasurement.mode}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  Last updated: {formatDate(latestMeasurement.timestamp)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Temperature Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconChartLine className="h-5 w-5" />
                Temperature Monitoring
              </CardTitle>
              <CardDescription>
                Real-time temperature readings over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ChartContainer
                  config={temperatureChartConfig}
                  className="min-h-[300px]"
                >
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      domain={["dataMin - 1", "dataMax + 1"]}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => `Time: ${value}`}
                          formatter={(value) => [
                            `${Number(value).toFixed(1)}°C`,
                            "Temperature",
                          ]}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="temperature"
                      stroke="var(--color-temperature)"
                      fill="var(--color-temperature)"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No temperature data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Humidity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconChartLine className="h-5 w-5" />
                Humidity Monitoring
              </CardTitle>
              <CardDescription>
                Real-time humidity readings over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ChartContainer
                  config={humidityChartConfig}
                  className="min-h-[300px]"
                >
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => `Time: ${value}`}
                          formatter={(value) => [
                            `${Number(value).toFixed(1)}%`,
                            "Humidity",
                          ]}
                        />
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="humidity"
                      stroke="var(--color-humidity)"
                      fill="var(--color-humidity)"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No humidity data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Combined Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconChartLine className="h-5 w-5" />
                Combined Monitoring
              </CardTitle>
              <CardDescription>
                Temperature and humidity trends comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ChartContainer
                  config={combinedChartConfig}
                  className="min-h-[350px]"
                >
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      yAxisId="temp"
                      tick={{ fontSize: 12 }}
                      orientation="left"
                      domain={["dataMin - 1", "dataMax + 1"]}
                    />
                    <YAxis
                      yAxisId="humidity"
                      tick={{ fontSize: 12 }}
                      orientation="right"
                      domain={[0, 100]}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => `Time: ${value}`}
                          formatter={(value, name) => [
                            name === "temperature"
                              ? `${Number(value).toFixed(1)}°C`
                              : `${Number(value).toFixed(1)}%`,
                            name === "temperature" ? "Temperature" : "Humidity",
                          ]}
                        />
                      }
                    />
                    <Line
                      yAxisId="temp"
                      type="monotone"
                      dataKey="temperature"
                      stroke="var(--color-temperature)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="temperature"
                    />
                    <Line
                      yAxisId="humidity"
                      type="monotone"
                      dataKey="humidity"
                      stroke="var(--color-humidity)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="humidity"
                    />
                  </LineChart>
                </ChartContainer>
              ) : (
                <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                  No measurement data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
