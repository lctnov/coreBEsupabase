import { authRepository } from "../repositories/auth.repository";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import type { RegisterResponse, UserRole } from "@/pages/features/register/register.type";
import type { LogoutResponse } from "@/pages/layouts/layout.type";
import type { LoginResponse } from "@/pages/features/login/login.type";
import type { Context } from "../trpc/context";

class AuthService {
  
  async register(input: { email: string; password: string, role: UserRole }): Promise<RegisterResponse & { user?: object }> {
    console.log("Register input:", input);
    const existingUser = await authRepository.findUserByEmail(input.email).catch(err => console.log(err)) || null;

    if (existingUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already exists",
      });
    }

    const hashed = await bcrypt.hash(input.password, 10);
    const user = await authRepository.createUser(input.email, hashed, input.role);

    return { success: true, user };
  }

  async login(input: { email: string; password: string }): Promise<LoginResponse> {
    console.log("Login input:", input); 
    const user = await authRepository.findUser(input.email);

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
      id: user.id,
      email: user.email,
      token: session.token,
      expiresAt: session.expiresAt,
    };
  }

  async logout(ctx: Context): Promise<LogoutResponse> {
    const token = ctx.session?.token;

    if (token) {
      await authRepository.deleteSessionByToken(token);
    }

    return {
      success: true,
      message: "Logged out successfully",
    };
  }

  inforUser(ctx: any) {
    const user = ctx.user;
    return { 
      id: user.id,
      email: user.email,
      role: user.role,
     };
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
