export type LayoutUser = {
  email: string;
  avatar?: string;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};

export type LayoutAuthContextType = {
  user: LayoutUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<LogoutResponse>;
  isLoggingOut: boolean;
  setUser: (user: LayoutUser | null) => void;
};
