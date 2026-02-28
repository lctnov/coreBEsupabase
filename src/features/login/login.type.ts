export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  id: string;
  email: string;
  token: string;
  expiresAt?: Date;
}