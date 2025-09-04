import { axios } from "@/lib/axios";

// Patient Management API
export const createPatient = async (
  request: CreatePatientRequest
): Promise<ApiResponse<Patient>> => {
  const response = await axios.post("/patients", request);
  return response.data;
};

export const getPatients = async (): Promise<ApiResponse<Patient[]>> => {
  const response = await axios.get("/patients");
  return response.data;
};

export const getPatient = async (id: string): Promise<ApiResponse<Patient>> => {
  const response = await axios.get(`/patients/${id}`);
  return response.data;
};

export const updatePatient = async (
  id: string,
  request: UpdatePatientRequest
): Promise<ApiResponse<Patient>> => {
  const response = await axios.patch(`/patients/${id}`, request);
  return response.data;
};

export const deletePatient = async (id: string): Promise<void> => {
  await axios.delete(`/patients/${id}`);
};
