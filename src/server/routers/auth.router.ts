import { zod } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc/router";
import { authController } from "../controller/auth.controller";

export const authRouter = router({
  /**
   * Đăng ký tài khoản mới
   */
  register: publicProcedure
    .input(
      zod.object({
        email: zod.string().email(),
        password: zod.string().min(6),
      })
    )
    .mutation(({ input }) => authController.register(input)),

  /**
   * Đăng nhập
   * Trả về session token + expires time
   */
   login: publicProcedure
    .input(
      zod.object({
        email: zod.string().email(),
        password: zod.string(),
      })
    )
    .mutation(({ input }) => authController.login(input)),

  /**
   * Đăng xuất
   * Xóa session khỏi database
   */
  logout: protectedProcedure
    .input(zod.object({ token: zod.string() }).optional())
    .mutation(({ ctx, input }) => authController.logout(ctx, input)),

  me: protectedProcedure.query(({ ctx }) => authController.me(ctx)),

  checkSession: publicProcedure.query(({ ctx }) => authController.checkSession(ctx)),
});
