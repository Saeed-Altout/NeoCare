declare type AuthResponse<T> = {
  data: T;
  message: string;
  status: string;
};

declare type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  token?: string;
  created_at: string;
  updated_at: string;
};

declare type SignInResponse = AuthResponse<User>;

declare type SignUpResponse = AuthResponse<User>;

declare type SignOutResponse = AuthResponse<null>;

declare type GetUserResponse = AuthResponse<User>;

declare type SignInRequest = {
  name: string;
  password: string;
};

declare type SignUpRequest = {
  email: string;
  password: string;
  name: string;
};

declare type UploadProfilePictureRequest = {
  file: File;
};

declare type UploadProfilePictureResponse = AuthResponse<{
  url: string;
  path: string;
  filename: string;
}>;
