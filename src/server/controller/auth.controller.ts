import { authService } from "../services/auth.service";

export class AuthController {

  async register(input: any) {
    console.log("Register input:", input);
	  return await authService.register(input);
  }

  async login(input: any) {
	  return await authService.login(input);
  }

  async logout(ctx: any, input: any) {
	  return await authService.logout(ctx, input);
  }

  async getUser(ctx: any) {
	  return await authService.inforUser(ctx);
  }

  async checkSession(ctx: any) {
	  return await authService.checkSession(ctx);
  }
}

export const authController = new AuthController();