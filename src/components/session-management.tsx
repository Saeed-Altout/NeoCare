import { useState, useEffect } from "react";
import {
  IconPlayerPlay,
  IconPlayerStop,
  IconClock,
  IconActivity,
  IconThermometer,
  IconDroplet,
  IconCarFan,
  IconBolt,
  IconUser,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { useSessionsStore } from "@/stores/sessions-store";
import { usePatientsStore } from "@/stores/patients-store";
import { useMeasurementsStore } from "@/stores/measurements-store";
import { useWebSocket } from "@/lib/websocket";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { getSessions, createSession, stopSession } from "@/apis/sessions";
import { getPatients } from "@/apis/patients";

interface SessionFormData {
  patientId: string;
  tsb: number;
  duration: number;
  mode: "low" | "high" | "both" | "off";
}

const initialFormData: SessionFormData = {
  patientId: "",
  tsb: 0,
  duration: 60,
  mode: "low",
};

export function SessionManagement() {
  const {
    sessions,
    activeSessions,
    isLoading,
    error,
    setSessions,
    addSession,
    updateSession,
    selectSession,
    setLoading,
    setError,
    clearError,
    getActiveSessionsCount,
  } = useSessionsStore();

  const { patients, setPatients } = usePatientsStore();
  const { getLatestMeasurement } = useMeasurementsStore();
  const {
    connect,
    joinSession,
    leaveSession,
    stopSession: stopSessionWS,
  } = useWebSocket();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<SessionFormData>(initialFormData);
  const [searchTerm, setSearchTerm] = useState("");
  const [, forceUpdate] = useState(0);

  // Load data on component mount
  useEffect(() => {
    loadSessions();
    loadPatients();
    connect(); // Connect to WebSocket for real-time updates
  }, []);

  // Real-time progress tracking and session refresh
  useEffect(() => {
    const progressInterval = setInterval(() => {
      // Force re-render for progress bars of running sessions
      if (activeSessions.length > 0) {
        forceUpdate((prev) => prev + 1);
      }
    }, 1000); // Update every second

    const refreshInterval = setInterval(() => {
      // Refresh sessions every 30 seconds to pick up status changes
      loadSessions();
    }, 30000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(refreshInterval);
    };
  }, [activeSessions]);

  // Join active sessions for real-time updates
  useEffect(() => {
    activeSessions.forEach((session) => {
      joinSession(session.id);
    });

    return () => {
      activeSessions.forEach((session) => {
        leaveSession(session.id);
      });
    };
  }, [activeSessions]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      clearError();
      const response = await getSessions();
      setSessions(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to load sessions";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Failed to load patients:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      clearError();

      const response = await createSession(formData);
      addSession(response.data);
      joinSession(response.data.id); // Join the new session room
      toast.success("Session started successfully");

      // Refresh sessions list to ensure UI is up to date
      await loadSessions();

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to create session";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStopSession = async (session: Session) => {
    try {
      setLoading(true);
      clearError();

      const response = await stopSession(session.id);
      updateSession(session.id, response.session);
      leaveSession(session.id); // Leave the session room
      toast.success("Session stopped successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to stop session";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStopSessionWS = (session: Session) => {
    stopSessionWS(session.id);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    selectSession(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const filteredSessions = (sessions || []).filter((session) => {
    const patient = (patients || []).find((p) => p.id === session.patientId);
    const patientName = patient?.fullName || "";
    return (
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusBadge = (status: string) => {
    // Handle different possible status values
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateProgress = (session: Session) => {
    if (session.status !== "running") return 100;

    const startTime = new Date(session.createdAt).getTime();
    const currentTime = Date.now();
    const durationMs = session.duration * 60 * 1000;
    const elapsed = currentTime - startTime;

    return Math.min((elapsed / durationMs) * 100, 100);
  };

  const calculateRemainingTime = (session: Session) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <IconActivity className="h-5 w-5" />
                Session Management
              </CardTitle>
              <CardDescription>
                Monitor and control phototherapy sessions
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <IconPlayerPlay className="mr-2 h-4 w-4" />
                  Start Session
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Start New Session</DialogTitle>
                  <DialogDescription>
                    Configure and start a phototherapy session
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient *</Label>
                    <Select
                      value={formData.patientId}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, patientId: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.fullName} ({patient.age})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tsb">TSB Level (mg/dL) *</Label>
                    <Input
                      id="tsb"
                      type="number"
                      min="0"
                      max="50"
                      step="0.1"
                      value={formData.tsb}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tsb: parseFloat(e.target.value) || 0,
                        }))
                      }
                      placeholder="Enter TSB level"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      max="480"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          duration: parseInt(e.target.value) || 60,
                        }))
                      }
                      placeholder="Enter duration"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mode">Phototherapy Mode *</Label>
                    <Select
                      value={formData.mode}
                      onValueChange={(value: "low" | "high" | "both" | "off") =>
                        setFormData((prev) => ({ ...prev, mode: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Intensity</SelectItem>
                        <SelectItem value="high">High Intensity</SelectItem>
                        <SelectItem value="both">Both Intensities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDialogClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || !formData.patientId}
                    >
                      {isLoading ? "Starting..." : "Start Session"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search sessions by patient name or session ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50 border-green-200">
                {getActiveSessionsCount()} active
              </Badge>
              <Badge variant="outline">{filteredSessions.length} total</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <IconActivity className="h-5 w-5" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeSessions.map((session) => {
                const patient = patients.find(
                  (p) => p.id === session.patientId
                );
                const latestMeasurement = getLatestMeasurement(session.id);
                const progress = calculateProgress(session);
                const remainingTime = calculateRemainingTime(session);

                return (
                  <Card
                    key={session.id}
                    className="border-green-200 bg-green-50"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconUser className="h-4 w-4" />
                          <span className="font-medium">
                            {patient?.fullName}
                          </span>
                        </div>
                        {getStatusBadge(session.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Started: {formatDate(session.createdAt)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <IconClock
                            className={`h-3 w-3 ${
                              remainingTime <= 0 ? "text-red-500" : ""
                            }`}
                          />
                          <span
                            className={
                              remainingTime <= 0
                                ? "text-red-500 font-semibold"
                                : ""
                            }
                          >
                            {remainingTime <= 0
                              ? "Time up!"
                              : `${formatRemainingTime(remainingTime)} left`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getModeIcon(session.mode)}
                          <span className="capitalize">{session.mode}</span>
                        </div>
                      </div>

                      {latestMeasurement && (
                        <div className="grid grid-cols-3 gap-2 text-xs bg-white p-2 rounded border">
                          <div className="flex items-center gap-1">
                            <IconThermometer className="h-3 w-3 text-red-500" />
                            <span>{latestMeasurement.temperature}°C</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IconDroplet className="h-3 w-3 text-blue-500" />
                            <span>{latestMeasurement.humidity}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IconCarFan
                              className={`h-3 w-3 ${
                                latestMeasurement.fan
                                  ? "text-blue-500 animate-spin"
                                  : "text-gray-400"
                              }`}
                            />
                            <span>{latestMeasurement.fan ? "On" : "Off"}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-1">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <IconPlayerStop className="mr-1 h-3 w-3" />
                              Stop
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Stop Session</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to stop this session for{" "}
                                {patient?.fullName}?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleStopSession(session)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Stop Session
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStopSessionWS(session)}
                        >
                          <IconPlayerStop className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Sessions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Session Info</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Ended</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading sessions...
                  </TableCell>
                </TableRow>
              ) : filteredSessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    {searchTerm
                      ? "No sessions found matching your search"
                      : "No sessions created yet"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSessions.map((session) => {
                  const patient = patients.find(
                    (p) => p.id === session.patientId
                  );
                  const latestMeasurement = getLatestMeasurement(session.id);

                  return (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <IconUser className="h-4 w-4" />
                            <span className="font-medium">
                              {patient?.fullName || "Unknown"}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {patient?.age} • {patient?.gender}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getModeIcon(session.mode)}
                            <span className="capitalize">
                              {session.mode} mode
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            TSB: {session.tsb} mg/dL
                          </div>
                          {latestMeasurement && (
                            <div className="flex items-center gap-2 text-xs">
                              <IconThermometer className="h-3 w-3" />
                              {latestMeasurement.temperature}°C
                              <IconDroplet className="h-3 w-3" />
                              {latestMeasurement.humidity}%
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {session.status ? (
                          getStatusBadge(session.status)
                        ) : (
                          <Badge variant="secondary">Unknown</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {formatDuration(session.duration)}
                          </div>
                          {session.status === "running" && (
                            <Progress
                              value={calculateProgress(session)}
                              className="h-1 w-16"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(session.createdAt)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {session.endedAt ? formatDate(session.endedAt) : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {session.status === "running" ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="Stop Session"
                                >
                                  <IconPlayerStop className="h-4 w-4 text-red-500" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Stop Session
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to stop this session?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleStopSession(session)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Stop Session
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled
                              title="Session Completed"
                            >
                              <IconActivity className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <IconAlertTriangle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
