import { axios } from "@/lib/axios";

// Patient Management API
export const createPatient = async (
  request: CreatePatientRequest
): Promise<ApiResponse<Patient>> => {
  const response = await axios.post("/patients", request);
  // Check if response.data has the expected structure
  if (
    response.data &&
    typeof response.data === "object" &&
    "id" in response.data
  ) {
    // API returns patient directly, wrap it in our expected format
    return {
      data: response.data,
      status: "success",
      message: "Patient created successfully",
    };
  }
  return response.data;
};

export const getPatients = async (): Promise<ApiResponse<Patient[]>> => {
  const response = await axios.get("/patients");
  // Check if response.data is an array (patients list)
  if (Array.isArray(response.data)) {
    return {
      data: response.data,
      status: "success",
      message: "Patients retrieved successfully",
    };
  }
  return response.data;
};

export const getPatient = async (id: string): Promise<ApiResponse<Patient>> => {
  const response = await axios.get(`/patients/${id}`);
  // Check if response.data has patient structure
  if (
    response.data &&
    typeof response.data === "object" &&
    "id" in response.data
  ) {
    return {
      data: response.data,
      status: "success",
      message: "Patient retrieved successfully",
    };
  }
  return response.data;
};

export const updatePatient = async (
  id: string,
  request: UpdatePatientRequest
): Promise<ApiResponse<Patient>> => {
  const response = await axios.patch(`/patients/${id}`, request);
  // Check if response.data has patient structure
  if (
    response.data &&
    typeof response.data === "object" &&
    "id" in response.data
  ) {
    return {
      data: response.data,
      status: "success",
      message: "Patient updated successfully",
    };
  }
  return response.data;
};

export const deletePatient = async (id: string): Promise<void> => {
  await axios.delete(`/patients/${id}`);
};
