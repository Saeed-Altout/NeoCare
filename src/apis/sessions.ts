import { axios } from "@/lib/axios";

// Session Management API
export const createSession = async (
  request: CreateSessionRequest
): Promise<ApiResponse<Session>> => {
  const response = await axios.post("/sessions", request);
  // Check if response.data has session structure
  if (
    response.data &&
    typeof response.data === "object" &&
    "id" in response.data
  ) {
    return {
      data: response.data,
      status: "success",
      message: "Session created successfully",
    };
  }
  return response.data;
};

export const getSessions = async (): Promise<ApiResponse<Session[]>> => {
  const response = await axios.get("/sessions");
  // Check if response.data is an array (sessions list)
  if (Array.isArray(response.data)) {
    return {
      data: response.data,
      status: "success",
      message: "Sessions retrieved successfully",
    };
  }
  return response.data;
};

export const getSession = async (id: string): Promise<ApiResponse<Session>> => {
  const response = await axios.get(`/sessions/${id}`);
  // Check if response.data has session structure
  if (
    response.data &&
    typeof response.data === "object" &&
    "id" in response.data
  ) {
    return {
      data: response.data,
      status: "success",
      message: "Session retrieved successfully",
    };
  }
  return response.data;
};

export const stopSession = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  session: Session;
}> => {
  const response = await axios.patch(`/sessions/${id}/stop`);
  // Check if response.data has the expected structure
  if (
    response.data &&
    typeof response.data === "object" &&
    "session" in response.data
  ) {
    return {
      success: true,
      message: "Session stopped successfully",
      session: response.data.session || response.data,
    };
  }
  return response.data;
};
