export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  expiresAt?: string;
};
