import { useEffect, useMemo, useState } from "react";
import { useLayoutService } from "./layout.service";
import { LayoutAuthContextType, LayoutUser } from "./layout.type";

const AUTH_USER_KEY = "auth_user";
const SESSION_EXPIRES_KEY = "sessionExpiresAt";

export function useLayoutAuthInternal(): LayoutAuthContextType {
  const { checkSessionQuery, logout, isLoggingOut } = useLayoutService();

  const [user, setUser] = useState<LayoutUser | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("Invalid auth_user in localStorage", e);
      return null;
    }
  });

  useEffect(() => {
    if (checkSessionQuery.data?.isAuthenticated === false) {
      localStorage.removeItem(AUTH_USER_KEY);
      setUser(null);
    }
  }, [checkSessionQuery.data?.isAuthenticated]);

  const logoutHandler = async () => {
    const res = await logout();
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(SESSION_EXPIRES_KEY);
    setUser(null);
    return res;
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: checkSessionQuery.isLoading,
    logout: logoutHandler,
    isLoggingOut,
    setUser,
  };
}

