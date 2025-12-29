"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "./login.service";
import type { LoginInput, LoginResponse } from "./login.type";
import { useLayoutAuth } from "@/pages/layouts/layout.context";

const AUTH_USER_KEY = "auth_user";

export function useLoginVM() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useLayoutAuth();
  
  const loginMutation = authService.login();

  const submit = async (input: LoginInput) => {
    setError("");
    setLoading(true);

    try {
      const data = await loginMutation.mutateAsync(input);
      console.log('Login response data:', data);

      if (data.token && data.email) {
        document.cookie = `sessionToken=${data.token}; path=/; max-age=${60 * 60 * 24 * 30}`;

        if (data.expiresAt) {
          localStorage.setItem(
            "sessionExpiresAt",
            new Date(data.expiresAt).toISOString()
          );
        }
        
        const user = {
          email: data.email,
          avatar: `https://ui-avatars.com/api/?name=${data.email}`,
        };

        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        
        // ✅ Update context NGAY → không bị null khi redirect
        setUser(user);

        // Redirect to dashboard after successful login
        router.push("/features/home");
      }
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
  
}
