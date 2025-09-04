import { axios } from "@/lib/axios";

// Measurements API
export const getMeasurements = async (): Promise<
  ApiResponse<Measurement[]>
> => {
  const response = await axios.get("/measurements");
  return response.data;
};

export const getSessionMeasurements = async (
  sessionId: string
): Promise<ApiResponse<Measurement[]>> => {
  const response = await axios.get(`/measurements/session/${sessionId}`);
  return response.data;
};

export const getLatestMeasurement = async (
  sessionId: string
): Promise<ApiResponse<Measurement>> => {
  const response = await axios.get(`/measurements/session/${sessionId}/latest`);
  return response.data;
};
