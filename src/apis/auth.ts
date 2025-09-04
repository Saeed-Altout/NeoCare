import { axios } from "@/lib/axios";

export const signIn = async (
  request: SignInRequest
): Promise<SignInResponse> => {
  const response = await axios.post(import.meta.env.VITE_SIGN_IN_URL, request);
  return response.data;
};

export const signUp = async (
  request: SignUpRequest
): Promise<SignUpResponse> => {
  const response = await axios.post(import.meta.env.VITE_SIGN_UP_URL, request);
  return response.data;
};

export const signOut = async (): Promise<SignOutResponse> => {
  const response = await axios.post(import.meta.env.VITE_SIGN_OUT_URL);
  return response.data;
};

export const getUser = async (): Promise<GetUserResponse> => {
  const response = await axios.get(import.meta.env.VITE_GET_USER_URL);
  return response.data;
};
