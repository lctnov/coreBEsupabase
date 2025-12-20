"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "./login.service";
import type { LoginInput, LoginResponse } from "./login.type";

export function useLoginVM() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginMutation = authService.login();

  const submit = async (input: LoginInput) => {
    setError("");
    setLoading(true);

    try {
      const data = (await loginMutation.mutateAsync(input)) as LoginResponse;
      console.log('Login response data:', data);

      if (data.token) {
        document.cookie = `sessionToken=${data.token}; path=/; max-age=${60 * 60 * 24 * 30}`;

        if (data.expiresAt) {
          localStorage.setItem(
            "sessionExpiresAt",
            new Date(data.expiresAt).toISOString()
          );
        }

        // Redirect to dashboard after successful login
        //Xem lại ko trỏ về dashboard và trỏ về trang chính home
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
  
}
