import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";

interface ArduinoStore {
  status: ArduinoStatus;
  availablePorts: ArduinoPort[];
  currentMode: "low" | "high" | "both" | "off";
  fanStatus: boolean;
  isConnecting: boolean;
  isLoading: boolean;
  error: string | null;
  lastCommand: ArduinoCommand | null;

  // Actions
  setStatus: (status: ArduinoStatus) => void;
  setAvailablePorts: (ports: ArduinoPort[]) => void;
  setCurrentMode: (mode: "low" | "high" | "both" | "off") => void;
  setFanStatus: (status: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setLastCommand: (command: ArduinoCommand | null) => void;

  // Connection actions
  connect: (port: string, baudRate?: number) => void;
  disconnect: () => void;

  // Computed getters
  isConnected: () => boolean;
  getConnectionInfo: () => string;
}

export const useArduinoStore = create<ArduinoStore>()(
  persist(
    (set, get) => ({
      status: {
        isConnected: false,
      },
      availablePorts: [],
      currentMode: "off",
      fanStatus: false,
      isConnecting: false,
      isLoading: false,
      error: null,
      lastCommand: null,

      setStatus: (status) =>
        set({
          status,
          error: null,
          currentMode: status.isConnected ? get().currentMode : "off",
        }),

      setAvailablePorts: (availablePorts) =>
        set({ availablePorts, error: null }),

      setCurrentMode: (currentMode) => {
        set({ currentMode, error: null });
        if (currentMode === "off") {
          toast.info("Phototherapy turned off");
        } else {
          toast.success(`Phototherapy mode set to ${currentMode}`);
        }
      },

      setFanStatus: (fanStatus) => {
        set({ fanStatus, error: null });
        toast.success(`Fan ${fanStatus ? "turned on" : "turned off"}`);
      },

      setConnecting: (isConnecting) => set({ isConnecting }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      setLastCommand: (lastCommand) => set({ lastCommand }),

      connect: (port, baudRate = 9600) => {
        set({
          isConnecting: true,
          error: null,
          status: { isConnected: false },
        });
      },

      disconnect: () => {
        set({
          status: { isConnected: false },
          currentMode: "off",
          fanStatus: false,
          error: null,
        });
        toast.info("Arduino disconnected");
      },

      isConnected: () => get().status.isConnected,

      getConnectionInfo: () => {
        const { status } = get();
        if (!status.isConnected || !status.portInfo) {
          return "Not connected";
        }
        return `${status.portInfo.port} (${status.portInfo.baudRate} baud)`;
      },
    }),
    {
      name: "arduino-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentMode: state.currentMode,
        fanStatus: state.fanStatus,
      }),
    }
  )
);
