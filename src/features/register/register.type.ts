export type UserRole = "ACTOR" | "RECRUITER";

export interface RegisterInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterResponse {
  success: boolean;
  user: object | null;
}
