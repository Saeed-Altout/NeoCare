import { axios } from "@/lib/axios";

// Session Management API
export const createSession = async (
  request: CreateSessionRequest
): Promise<ApiResponse<Session>> => {
  const response = await axios.post("/sessions", request);
  return response.data;
};

export const getSessions = async (): Promise<ApiResponse<Session[]>> => {
  const response = await axios.get("/sessions");
  return response.data;
};

export const getSession = async (id: string): Promise<ApiResponse<Session>> => {
  const response = await axios.get(`/sessions/${id}`);
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
  return response.data;
};
