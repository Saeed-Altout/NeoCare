import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { signIn, signUp, signOut, getUser } from "@/apis/auth";
import { useAuthStore } from "@/stores/auth-store";

export const useSignInMutation = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: (request: SignInRequest) => signIn(request),
    onSuccess: (data) => {
      toast.success(data.message || "Sign in successful");

      // Set user and token in store
      setUser(data.data);
      if (data.data.token) {
        setToken(data.data.token);
      }

      // Navigate to dashboard if user is admin, otherwise to home
      if (data.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Sign in failed");
      }
    },
  });
};

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: (request: SignUpRequest) => signUp(request),
    onSuccess: (data) => {
      toast.success(data.message || "Sign up successful");
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Sign up failed");
      }
    },
  });
};

export const useSignOutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { signOut: signOutStore } = useAuthStore();

  return useMutation({
    mutationKey: ["sign-out"],
    mutationFn: signOut,
    onSuccess: (data) => {
      toast.success(data.message || "Sign out successful");
      queryClient.clear();
      signOutStore();
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Sign out failed");
      }
    },
  });
};

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
