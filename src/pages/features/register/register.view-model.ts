"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerService } from "./register.service";
import type { RegisterInput } from "./register.type";

export function useRegisterVM() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registerMutation = registerService.register();

  const submit = async (
    input: RegisterInput & { confirmPassword: string }
  ) => {
    const { email, password, confirmPassword } = input;

    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    try {
      await registerMutation.mutateAsync({ email, password });
      router.push("/features/login?registered=true");
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error,
  };
}
