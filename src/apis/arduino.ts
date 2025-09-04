import { axios } from "@/lib/axios";

// Arduino Device API
export const connectArduino = async (
  request: ArduinoConnectRequest
): Promise<{
  success: boolean;
  message: string;
  portInfo: {
    port: string;
    baudRate: number;
    isOpen: boolean;
  };
}> => {
  const response = await axios.post("/arduino/connect", request);
  return response.data;
};

export const disconnectArduino = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await axios.post("/arduino/disconnect");
  return response.data;
};

export const getArduinoStatus = async (): Promise<ArduinoStatus> => {
  const response = await axios.get("/arduino/status");
  return response.data;
};

export const getArduinoStats = async (): Promise<{
  totalLinesReceived: number;
  jsonLinesParsed: number;
  invalidLinesIgnored: number;
  parseErrors: number;
  lastDataReceived: string;
  connectionUptime: number;
  averageDataRate: number;
}> => {
  const response = await axios.get("/arduino/stats");
  return response.data;
};

export const getArduinoPorts = async (): Promise<{
  success: boolean;
  ports: ArduinoPort[];
}> => {
  const response = await axios.get("/arduino/ports");
  return response.data;
};

export const sendArduinoCommand = async (
  command: ArduinoCommand
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await axios.post("/arduino/command", command);
  return response.data;
};

export const setArduinoMode = async (
  mode: "low" | "high" | "both" | "off"
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await axios.post("/arduino/setMode", { mode });
  return response.data;
};

export const setArduinoFan = async (
  status: boolean
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await axios.post("/arduino/setFan", { status });
  return response.data;
};

export const getArduinoDeviceStatus = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await axios.post("/arduino/getStatus");
  return response.data;
};

export const pingArduino = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await axios.post("/arduino/ping");
  return response.data;
};

export const emergencyStopArduino = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await axios.post("/arduino/emergencyStop");
  return response.data;
};
