import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Import API functions
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "@/apis/patients";
import { getSessions, createSession, stopSession } from "@/apis/sessions";
import {
  getMeasurements,
  getSessionMeasurements,
  getLatestMeasurement,
} from "@/apis/measurements";
import {
  connectArduino,
  disconnectArduino,
  getArduinoStatus,
  getArduinoPorts,
  setArduinoMode,
  setArduinoFan,
  emergencyStopArduino,
} from "@/apis/arduino";

// Import stores
import { usePatientsStore } from "@/stores/patients-store";
import { useSessionsStore } from "@/stores/sessions-store";
import { useMeasurementsStore } from "@/stores/measurements-store";
import { useArduinoStore } from "@/stores/arduino-store";

// Patient hooks
export const usePatientsQuery = () => {
  const { setPatients, setLoading, setError } = usePatientsStore();

  return useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await getPatients();
      setPatients(response.data);
      return response.data;
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to load patients";
      setError(errorMessage);
      toast.error(errorMessage);
    },
    onLoading: () => setLoading(true),
    onSettled: () => setLoading(false),
  });
};

export const useCreatePatientMutation = () => {
  const { addPatient } = usePatientsStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    onSuccess: (data) => {
      addPatient(data.data);
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create patient";
      toast.error(errorMessage);
    },
  });
};

export const useUpdatePatientMutation = () => {
  const { updatePatient } = usePatientsStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePatientRequest }) =>
      updatePatient(id, data),
    onSuccess: (data, variables) => {
      updatePatient(variables.id, data.data);
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update patient";
      toast.error(errorMessage);
    },
  });
};

export const useDeletePatientMutation = () => {
  const { removePatient } = usePatientsStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePatient,
    onSuccess: (_, patientId) => {
      removePatient(patientId);
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete patient";
      toast.error(errorMessage);
    },
  });
};

// Session hooks
export const useSessionsQuery = () => {
  const { setSessions, setLoading, setError } = useSessionsStore();

  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const response = await getSessions();
      setSessions(response.data);
      return response.data;
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to load sessions";
      setError(errorMessage);
      toast.error(errorMessage);
    },
    refetchInterval: 5000, // Refresh every 5 seconds for active sessions
  });
};

export const useCreateSessionMutation = () => {
  const { addSession } = useSessionsStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      addSession(data.data);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Session started successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to start session";
      toast.error(errorMessage);
    },
  });
};

export const useStopSessionMutation = () => {
  const { updateSession } = useSessionsStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stopSession,
    onSuccess: (data) => {
      updateSession(data.session.id, data.session);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Session stopped successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to stop session";
      toast.error(errorMessage);
    },
  });
};

// Arduino hooks
export const useArduinoStatusQuery = () => {
  const { setStatus } = useArduinoStore();

  return useQuery({
    queryKey: ["arduino-status"],
    queryFn: async () => {
      const status = await getArduinoStatus();
      setStatus(status);
      return status;
    },
    refetchInterval: 5000, // Check status every 5 seconds
    retry: false, // Don't retry on failure
  });
};

export const useConnectArduinoMutation = () => {
  const { setStatus, setConnecting } = useArduinoStore();

  return useMutation({
    mutationFn: connectArduino,
    onMutate: () => setConnecting(true),
    onSuccess: (data) => {
      setStatus({
        isConnected: true,
        portInfo: data.portInfo,
      });
      toast.success("Arduino connected successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to connect Arduino";
      toast.error(errorMessage);
    },
    onSettled: () => setConnecting(false),
  });
};

export const useDisconnectArduinoMutation = () => {
  const { setStatus, setCurrentMode, setFanStatus } = useArduinoStore();

  return useMutation({
    mutationFn: disconnectArduino,
    onSuccess: () => {
      setStatus({ isConnected: false });
      setCurrentMode("off");
      setFanStatus(false);
      toast.success("Arduino disconnected successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to disconnect Arduino";
      toast.error(errorMessage);
    },
  });
};

export const useSetArduinoModeMutation = () => {
  const { setCurrentMode } = useArduinoStore();

  return useMutation({
    mutationFn: setArduinoMode,
    onSuccess: (_, mode) => {
      setCurrentMode(mode);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to set Arduino mode";
      toast.error(errorMessage);
    },
  });
};

export const useSetArduinoFanMutation = () => {
  const { setFanStatus } = useArduinoStore();

  return useMutation({
    mutationFn: setArduinoFan,
    onSuccess: (_, status) => {
      setFanStatus(status);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to control fan";
      toast.error(errorMessage);
    },
  });
};

export const useEmergencyStopMutation = () => {
  const { setCurrentMode, setFanStatus } = useArduinoStore();

  return useMutation({
    mutationFn: emergencyStopArduino,
    onSuccess: () => {
      setCurrentMode("off");
      setFanStatus(false);
      toast.success("Emergency stop activated");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to execute emergency stop";
      toast.error(errorMessage);
    },
  });
};
