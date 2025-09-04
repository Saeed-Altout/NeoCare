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

// Jaundice System Types
declare type ApiResponse<T> = {
  data: T;
  status: "success" | "error";
  message: string;
};

declare type Patient = {
  id: string;
  fullName: string;
  gender: "male" | "female";
  age: string;
  bloodType: string;
  motherName: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

declare type CreatePatientRequest = Omit<
  Patient,
  "id" | "createdAt" | "updatedAt"
>;
declare type UpdatePatientRequest = Partial<CreatePatientRequest>;

declare type Session = {
  id: string;
  patientId: string;
  tsb: number;
  duration: number;
  mode: "low" | "high" | "both" | "off";
  status: "running" | "completed" | "stopped";
  createdAt: string;
  endedAt: string | null;
  patient?: {
    id: string;
    fullName: string;
  };
};

declare type CreateSessionRequest = {
  patientId: string;
  tsb: number;
  duration: number;
  mode: "low" | "high" | "both" | "off";
};

declare type Measurement = {
  id: string;
  sessionId: string;
  mode: "low" | "high" | "both" | "off";
  temperature: number;
  humidity: number;
  fan: boolean;
  timestamp: string;
};

declare type ArduinoStatus = {
  isConnected: boolean;
  portInfo?: {
    port: string;
    baudRate: number;
    isOpen: boolean;
  };
  stats?: {
    totalLinesReceived: number;
    jsonLinesParsed: number;
    invalidLinesIgnored: number;
    parseErrors: number;
    lastDataReceived: string;
  };
};

declare type ArduinoPort = {
  path: string;
  manufacturer?: string;
  serialNumber?: string;
  pnpId?: string;
  locationId?: string;
  productId?: string;
  vendorId?: string;
};

declare type ArduinoConnectRequest = {
  port: string;
  baudRate: number;
  dataBits?: number;
  stopBits?: number;
  parity?: string;
};

declare type ArduinoCommand = {
  command: string;
  mode?: "low" | "high" | "both" | "off";
  status?: boolean;
  timestamp?: number;
};

// WebSocket Events
declare type SessionDataUpdate = {
  sessionId: string;
  mode: "low" | "high" | "both" | "off";
  temperature: number;
  humidity: number;
  fan: boolean;
  timestamp: string;
};

declare type SessionStatusUpdate = {
  sessionId: string;
  status: "running" | "completed" | "stopped";
  endedAt?: string;
  reason?: string;
  stoppedBy?: string;
};
