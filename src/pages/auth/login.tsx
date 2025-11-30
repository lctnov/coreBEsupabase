"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Button, Input, Alert, Checkbox, Space } from "antd";
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.token) {
        document.cookie = `sessionToken=${data.token}; path=/; max-age=${60 * 60 * 24 * 30}`;
        if (data.expiresAt) {
          localStorage.setItem("sessionExpiresAt", new Date(data.expiresAt).toISOString());
        }
        router.push("/dashboard");
      }
    },
    onError: (err) => setError(err.message || "Đăng nhập thất bại"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginMutation.mutateAsync({ email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left / Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 lg:px-20 lg:py-12">
        <div className="w-full max-w-md">

          {/* Form Container */}
          <div className="bg-white dark:bg-gray-850 rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700">
            
            {/* Header */}
            <div className="flex flex-col items-center -mt-12 mb-8">
              {/* Logo with gradient shadow / pulse */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-70 group-hover:opacity-90 transition duration-500"></div>
                <div className="relative bg-white dark:bg-gray-900 p-6 rounded-full ring-8 ring-white/20 shadow-2xl">
                  <img 
                    src="/images/cast.png" 
                    alt="CAST-V Logo" 
                    className="w-32 h-32 object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-0 -left-4 w-24 h-24 bg-blue-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 -right-4 w-32 h-32 bg-purple-400 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
              </div>

              {/* Title */}
              <div className="mt-8 text-center">
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CAST-V
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 tracking-wider">
                  Professional Broadcasting System
                </p>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert message={error} type="error" showIcon className="mb-6" />
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  size="large"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <Input.Password
                  size="large"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="!rounded-none"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Checkbox className="text-gray-700 dark:text-gray-300">
                  Keep me logged in
                </Checkbox>
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password
                </Link>
              </div>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
              >
                Log in now
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-850 text-gray-500">
                    Or sign in with
                  </span>
                </div>
              </div>

              <Space className="w-full justify-center mt-6" size="large">
                <Button icon={<GoogleOutlined />} size="large" shape="circle" />
                <Button icon={<FacebookOutlined />} size="large" shape="circle" />
                <Button icon={<TwitterOutlined />} size="large" shape="circle" />
              </Space>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center">
              {/* Mobile / Tablet */}
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:hidden">
                Not a member yet?{" "}
                <Link
                  href="/auth/register"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                >
                  Register now
                </Link>
              </p>

              {/* Desktop */}
              <p className="hidden lg:block text-gray-700 dark:text-gray-300 text-sm mt-6">
                New to CAST-V?{" "}
                <Link
                  href="/auth/register"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                >
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
