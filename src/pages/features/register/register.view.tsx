"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Alert, Space } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useRegisterVM } from "./register.view-model";

export function RegisterView() {
  const { submit, loading, error } = useRegisterVM();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ email, password, confirmPassword });
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
            {error && <Alert message={error} type="error" showIcon className="mb-6" />}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  size="large"
                  type="email"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <Input.Password
                  size="large"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="!rounded-none"
                  required
                />
              </div>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
              >
                Create account
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
                    Or sign up with
                  </span>
                </div>
              </div>

              <Space className="w-full justify-center mt-6" size="large">
                <Button icon={<GoogleOutlined />} size="large" shape="circle" />
                <Button icon={<FacebookOutlined />} size="large" shape="circle" />
                <Button icon={<TwitterOutlined />} size="large" shape="circle" />
              </Space>
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              {/* Mobile / Tablet */}
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:hidden">
                Already have an account?{" "}
                <Link
                  href="/features/login"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                >
                  Log in
                </Link>
              </p>

              {/* Desktop */}
              <p className="hidden lg:block text-gray-700 dark:text-gray-300 text-sm mt-6">
                Already have an account?{" "}
                <Link
                  href="/features/login"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                >
                  Log in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
