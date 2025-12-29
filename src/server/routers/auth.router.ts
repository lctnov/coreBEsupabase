import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc/router";
import { authController } from "../controller/auth.controller";

export const authRouter = router({
  /**
   * Đăng ký tài khoản mới
   */
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(({ input }) => authController.register(input)),

  /**
   * Đăng nhập
   * Trả về session token + expires time
   */
   loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => authController.login(input)),

  /**
   * Đăng xuất
   * Xóa session khỏi database
   */
  logoutUser: protectedProcedure
    .input(z.object({ token: z.string() }).optional())
    .mutation(({ ctx, input }) => authController.logout(ctx, input)),

  getUser: protectedProcedure.query(({ ctx }) => authController.getUser(ctx)),

  checkSession: publicProcedure.query(({ ctx }) => authController.checkSession(ctx)),
});
