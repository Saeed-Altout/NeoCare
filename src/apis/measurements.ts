import { axios } from "@/lib/axios";

// Measurements API
export const getMeasurements = async (): Promise<
  ApiResponse<Measurement[]>
> => {
  const response = await axios.get("/measurements");
  // Check if response.data is an array (measurements list)
  if (Array.isArray(response.data)) {
    return {
      data: response.data,
      status: "success",
      message: "Measurements retrieved successfully",
    };
  }
  return response.data;
};

export const getSessionMeasurements = async (
  sessionId: string
): Promise<ApiResponse<Measurement[]>> => {
  const response = await axios.get(`/measurements/session/${sessionId}`);
  // Check if response.data is an array (measurements list)
  if (Array.isArray(response.data)) {
    return {
      data: response.data,
      status: "success",
      message: "Measurements retrieved successfully",
    };
  }
  return response.data;
};

export const getLatestMeasurement = async (
  sessionId: string
): Promise<ApiResponse<Measurement>> => {
  const response = await axios.get(`/measurements/session/${sessionId}/latest`);
  // Check if response.data has measurement structure
  if (
    response.data &&
    typeof response.data === "object" &&
    "id" in response.data
  ) {
    return {
      data: response.data,
      status: "success",
      message: "Latest measurement retrieved successfully",
    };
  }
  return response.data;
};
