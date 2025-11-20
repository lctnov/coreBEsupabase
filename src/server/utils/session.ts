import crypto from "crypto";

const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 giờ tính bằng milliseconds

/**
 * Tạo JWT token đơn giản (không dùng jsonwebtoken để giảm dependencies)
 */
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Tính toán thời gian hết hạn session (1 giờ từ bây giờ)
 */
export function getSessionExpiry(): Date {
  return new Date(Date.now() + SESSION_TIMEOUT);
}

/**
 * Kiểm tra session đã hết hạn hay chưa
 */
export function isSessionExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Lấy thời gian còn lại của session (tính bằng milliseconds)
 */
export function getSessionTimeRemaining(expiresAt: Date): number {
  const remaining = expiresAt.getTime() - Date.now();
  return Math.max(0, remaining);
}
