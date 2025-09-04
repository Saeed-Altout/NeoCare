import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useSessionsStore } from "@/stores/sessions-store";
import { useMeasurementsStore } from "@/stores/measurements-store";

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect() {
    if (this.socket?.connected) {
      return;
    }

    const wsUrl = import.meta.env.VITE_WS_URL || "http://localhost:3000";

    this.socket = io(wsUrl, {
      transports: ["websocket", "polling"],
      timeout: 5000,
      forceNew: true,
    });

    this.setupEventListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on("connect", () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
      toast.success("Connected to real-time updates");
    });

    this.socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
      toast.error("Lost connection to real-time updates");
      this.handleReconnect();
    });

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      this.handleReconnect();
    });

    // System events
    this.socket.on("connected", (data) => {
      console.log("System connected:", data);
    });

    // Session events
    this.socket.on("session_started", (data) => {
      console.log("Session started:", data);
      toast.success(`Session started for patient ${data.patientId}`);
    });

    this.socket.on("session_data_update", (data: SessionDataUpdate) => {
      // Update measurements store with real-time data
      const measurement: Measurement = {
        id: `${data.sessionId}-${Date.now()}`,
        sessionId: data.sessionId,
        mode: data.mode,
        temperature: data.temperature,
        humidity: data.humidity,
        fan: data.fan,
        timestamp: data.timestamp,
      };

      useMeasurementsStore.getState().addMeasurement(measurement);
    });

    this.socket.on("session_finished", (data: SessionStatusUpdate) => {
      console.log("Session finished:", data);
      useSessionsStore.getState().updateSession(data.sessionId, {
        status: data.status,
        endedAt: data.endedAt || new Date().toISOString(),
      });
      toast.success("Session completed successfully");
    });

    this.socket.on("session_stopped_manual", (data: SessionStatusUpdate) => {
      console.log("Session stopped manually:", data);
      useSessionsStore.getState().updateSession(data.sessionId, {
        status: data.status,
        endedAt: data.endedAt || new Date().toISOString(),
      });
      toast.info("Session stopped manually");
    });

    this.socket.on("session_stop_requested", (data) => {
      console.log("Session stop requested:", data);
      toast.info("Session stop requested");
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      setTimeout(() => {
        console.log(
          `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
        );
        this.connect();
      }, delay);
    } else {
      toast.error("Failed to reconnect to real-time updates");
    }
  }

  // Session room management
  joinSession(sessionId: string) {
    if (this.socket?.connected) {
      this.socket.emit("join_session", { sessionId });
      console.log(`Joined session room: ${sessionId}`);
    }
  }

  leaveSession(sessionId: string) {
    if (this.socket?.connected) {
      this.socket.emit("leave_session", { sessionId });
      console.log(`Left session room: ${sessionId}`);
    }
  }

  // Session control
  stopSession(sessionId: string) {
    if (this.socket?.connected) {
      this.socket.emit("stop_session", { sessionId });
      console.log(`Stop session requested: ${sessionId}`);
    }
  }

  // Connection status
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Get socket instance for advanced usage
  getSocket(): Socket | null {
    return this.socket;
  }
}

// Create singleton instance
export const websocketService = new WebSocketService();

// Hook for using WebSocket in components
export const useWebSocket = () => {
  return {
    connect: () => websocketService.connect(),
    disconnect: () => websocketService.disconnect(),
    joinSession: (sessionId: string) => websocketService.joinSession(sessionId),
    leaveSession: (sessionId: string) =>
      websocketService.leaveSession(sessionId),
    stopSession: (sessionId: string) => websocketService.stopSession(sessionId),
    isConnected: () => websocketService.isConnected(),
  };
};
