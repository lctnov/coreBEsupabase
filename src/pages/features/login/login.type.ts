export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
  expiresAt?: string;
}