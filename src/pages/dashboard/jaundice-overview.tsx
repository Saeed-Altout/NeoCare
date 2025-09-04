import { useEffect } from "react";
import {
  IconActivity,
  IconUser,
  IconClock,
  IconBolt,
  IconThermometer,
  IconDroplet,
  IconCarFan,
} from "@tabler/icons-react";

import { useSessionsStore } from "@/stores/sessions-store";
import { usePatientsStore } from "@/stores/patients-store";
import { useMeasurementsStore } from "@/stores/measurements-store";
import { useArduinoStore } from "@/stores/arduino-store";
import { useWebSocket } from "@/lib/websocket";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArduinoControlPanel } from "@/components/arduino-control-panel";

export function JaundiceOverviewPage() {
  const { sessions, activeSessions, getActiveSessionsCount } =
    useSessionsStore();
  const { patients } = usePatientsStore();
  const { measurements, getLatestMeasurement } = useMeasurementsStore();
  const { status: arduinoStatus, currentMode, fanStatus } = useArduinoStore();
  const { connect } = useWebSocket();

  useEffect(() => {
    // Connect to WebSocket for real-time updates
    connect();
  }, []);

  // Calculate statistics
  const totalSessions = sessions.length;
  const activeSessionsCount = getActiveSessionsCount();
  const completedSessions = sessions.filter(
    (s) => s.status === "completed"
  ).length;
  const totalPatients = patients.length;

  // Get recent measurements from active sessions
  const recentMeasurements = activeSessions
    .map((session) => {
      const measurement = getLatestMeasurement(session.id);
      const patient = patients.find((p) => p.id === session.patientId);
      return { session, measurement, patient };
    })
    .filter((item) => item.measurement);

  const avgTemperature =
    recentMeasurements.length > 0
      ? recentMeasurements.reduce(
          (sum, item) => sum + item.measurement!.temperature,
          0
        ) / recentMeasurements.length
      : 0;

  const avgHumidity =
    recentMeasurements.length > 0
      ? recentMeasurements.reduce(
          (sum, item) => sum + item.measurement!.humidity,
          0
        ) / recentMeasurements.length
      : 0;

  const fanOnCount = recentMeasurements.filter(
    (item) => item.measurement!.fan
  ).length;

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* Overview Cards */}
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Active Sessions</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {activeSessionsCount}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="bg-green-50 border-green-200">
                <IconActivity className="w-3 h-3" />
                Running
              </Badge>
            </CardAction>
          </CardHeader>
          <div className="px-6 pb-6 flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Real-time monitoring <IconActivity className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Phototherapy sessions in progress
            </div>
          </div>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Patients</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalPatients}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconUser className="w-3 h-3" />
                Registered
              </Badge>
            </CardAction>
          </CardHeader>
          <div className="px-6 pb-6 flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Patient database <IconUser className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Total patients in system
            </div>
          </div>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Completed Sessions</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {completedSessions}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconClock className="w-3 h-3" />
                Done
              </Badge>
            </CardAction>
          </CardHeader>
          <div className="px-6 pb-6 flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Treatment history <IconClock className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Successfully completed treatments
            </div>
          </div>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Arduino Status</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {arduinoStatus.isConnected ? "Online" : "Offline"}
            </CardTitle>
            <CardAction>
              <Badge
                variant={arduinoStatus.isConnected ? "default" : "secondary"}
              >
                <IconBolt className="w-3 h-3" />
                {currentMode.toUpperCase()}
              </Badge>
            </CardAction>
          </CardHeader>
          <div className="px-6 pb-6 flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Device connection <IconBolt className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Hardware communication status
            </div>
          </div>
        </Card>
      </div>

      {/* Real-time Monitoring */}
      {activeSessionsCount > 0 && (
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconActivity className="h-5 w-5 text-green-500" />
                Real-time Environmental Monitoring
              </CardTitle>
              <CardDescription>
                Current sensor readings from active sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <IconThermometer className="h-4 w-4 text-red-500" />
                    Average Temperature
                  </div>
                  <div className="text-2xl font-bold">
                    {avgTemperature.toFixed(1)}°C
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Optimal range: 36-38°C
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <IconDroplet className="h-4 w-4 text-blue-500" />
                    Average Humidity
                  </div>
                  <div className="text-2xl font-bold">
                    {avgHumidity.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Optimal range: 40-60%
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <IconCarFan
                      className={`h-4 w-4 ${
                        fanOnCount > 0
                          ? "text-blue-500 animate-spin"
                          : "text-gray-400"
                      }`}
                    />
                    Cooling Systems
                  </div>
                  <div className="text-2xl font-bold">
                    {fanOnCount}/{recentMeasurements.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active fans / Total sessions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Arduino Control Panel */}
      <div className="px-4 lg:px-6">
        <ArduinoControlPanel />
      </div>

      {/* Active Sessions Quick View */}
      {activeSessionsCount > 0 && (
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Sessions Overview</CardTitle>
              <CardDescription>
                Quick view of running phototherapy sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeasurements.map(({ session, measurement, patient }) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{patient?.fullName}</div>
                      <div className="text-sm text-muted-foreground">
                        {session.mode} mode • {session.duration} min session
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <IconThermometer className="h-3 w-3 text-red-500" />
                        {measurement!.temperature}°C
                      </div>
                      <div className="flex items-center gap-1">
                        <IconDroplet className="h-3 w-3 text-blue-500" />
                        {measurement!.humidity}%
                      </div>
                      <div className="flex items-center gap-1">
                        <IconCarFan
                          className={`h-3 w-3 ${
                            measurement!.fan
                              ? "text-blue-500 animate-spin"
                              : "text-gray-400"
                          }`}
                        />
                        {measurement!.fan ? "On" : "Off"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Active Sessions Message */}
      {activeSessionsCount === 0 && (
        <div className="px-4 lg:px-6">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <IconActivity className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Active Sessions</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Start a new phototherapy session from the Session Management
                page to begin monitoring patient treatment.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
