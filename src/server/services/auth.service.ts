import { authRepository } from "../repositories/auth.repository";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

class AuthService {
  
  async register(input: { email: string; password: string }) {
    const existingUser = await authRepository.findUserByEmail(input.email);

    if (existingUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already exists",
      });
    }

    const hashed = await bcrypt.hash(input.password, 10);
    const user = await authRepository.createUser(input.email, hashed);

    return { success: true, user };
  }

  async login(input: { email: string; password: string }) {
    const user = await authRepository.findUserByEmail(input.email);

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    // Xóa session cũ
    await authRepository.deleteSessionsByUserId(user.id);

    const session = await authRepository.createSession(user.id);

    return {
      success: true,
      user,
      token: session.token,
      expiresAt: session.expiresAt,
    };
  }

  async logout(ctx: any, input?: { token?: string }) {
    if (input?.token) {
      await authRepository.deleteSessionByToken(input.token);
    }
    return { success: true, message: "Logged out successfully" };
  }

  me(ctx: any) {
    return { user: ctx.user };
  }

  checkSession(ctx: any) {
    return {
      isAuthenticated: !!ctx.user && !ctx.sessionExpired,
      user: ctx.user || null,
      sessionExpired: ctx.sessionExpired,
    };
  }
}

export const authService = new AuthService();
