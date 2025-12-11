"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

export default function DashboardPage() {
  const router = useRouter();
  const [sessionTimeLeft, setSessionTimeLeft] = useState<string>("--:--");

  const checkSessionQuery = trpc.auth.checkSession.useQuery();
  const meMutation = trpc.auth.me.useQuery(undefined, {
    enabled: checkSessionQuery.data?.isAuthenticated,
  });
  // `meMutation.data` may be typed loosely by tRPC client; cast to any for safe access in UI
  const meData: any = meMutation.data;
  const logoutMutation = trpc.auth.logout.useMutation();

  // Theo dõi thời gian session còn lại
  useEffect(() => {
    const interval = setInterval(() => {
      // Trong một ứng dụng thực, bạn sẽ lấy expires_at từ server
      const expiresAt = localStorage.getItem("sessionExpiresAt");
      if (expiresAt) {
        const remaining = new Date(expiresAt).getTime() - Date.now();
        if (remaining <= 0) {
          router.push("/auth/login?expired=true");
        } else {
          const minutes = Math.floor(remaining / 60000);
          const seconds = Math.floor((remaining % 60000) / 1000);
          setSessionTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  // Redirect nếu chưa login
  useEffect(() => {
    if (checkSessionQuery.isSuccess && !checkSessionQuery.data?.isAuthenticated) {
      router.push("/auth/login");
    }
  }, [checkSessionQuery.isSuccess, checkSessionQuery.data?.isAuthenticated, router]);

  const handleLogout = async () => {
      try {
        await logoutMutation.mutateAsync();
        document.cookie = "sessionToken=; path=/; max-age=0";
        router.push("/auth/login?logged_out=true");
      } catch (err) {
        console.error("Logout failed:", err);
      }
  };

  if (checkSessionQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Session expires in: <span className="font-mono font-bold">{sessionTimeLeft}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome</h2>
          {meMutation.isSuccess && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg text-gray-900">{meData?.user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <p className="mt-1 text-lg text-gray-900 font-mono">{meData?.user?.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Joined</label>
                <p className="mt-1 text-lg text-gray-900">
                  {meData?.user?.createdAt ? new Date(meData.user.createdAt).toLocaleDateString("vi-VN") : ""}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Session Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Session Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Session timeout: 1 hour</li>
            <li>✓ Automatic logout when session expires</li>
            <li>✓ Real-time countdown timer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
