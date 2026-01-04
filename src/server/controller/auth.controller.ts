import type { LoginInput } from "@/pages/features/login/login.type";
import { authService } from "../services/auth.service";
import type { RegisterInput } from "@/pages/features/register/register.type";
import type { Context } from "../trpc/context";
export class AuthController {
  async register(input: RegisterInput) {
    return await authService.register(input);
  }

  async login(input: LoginInput) {
    return await authService.login(input);
  }

  async logout(ctx: Context) {
    return await authService.logout(ctx);
  }

  async getUser(ctx: any) {
    return await authService.inforUser(ctx);
  }

  async checkSession(ctx: any) {
    return await authService.checkSession(ctx);
  }
}

export const authController = new AuthController();
