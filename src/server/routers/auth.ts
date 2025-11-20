import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc/router";
import { db } from "../db";
import { users, sessions } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateToken, getSessionExpiry, isSessionExpired } from "../utils/session";
// @ts-ignore
import bcrypt from "bcryptjs";

export const authRouter = router({
  /**
   * Đăng ký tài khoản mới
   */
  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input }) => {
      // Kiểm tra email đã tồn tại
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (existingUser) {
        throw new Error("Email already exists");
      }

      // Hash password
      const hashed = await bcrypt.hash(input.password, 10);

      // Tạo user mới
      const newUser = await db
        .insert(users)
        .values({
          email: input.email,
          password: hashed,
        })
        .returning();

      return { success: true, user: newUser[0] };
    }),

  /**
   * Đăng nhập
   * Trả về session token + expires time
   */
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      // Tìm user
      const user = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Kiểm tra password
      const isValid = await bcrypt.compare(input.password, user.password);
      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      // Xóa session cũ (nếu có)
      await db.delete(sessions).where(eq(sessions.userId, user.id));

      // Tạo session mới
      const token = generateToken();
      const expiresAt = getSessionExpiry();

      const session = await db
        .insert(sessions)
        .values({
          userId: user.id,
          token,
          expiresAt,
        })
        .returning();

      return {
        success: true,
        user,
        token: session[0].token,
        expiresAt: session[0].expiresAt,
      };
    }),

  /**
   * Đăng xuất
   * Xóa session khỏi database
   */
  logout: protectedProcedure
    .input(z.object({ token: z.string() }).optional())
    .mutation(async ({ input, ctx }) => {
      // Nếu client gửi token, xóa nó
      if (input?.token) {
        await db.delete(sessions).where(eq(sessions.token, input.token));
      }

      return { success: true, message: "Logged out successfully" };
    }),

  /**
   * Lấy thông tin user hiện tại
   */
  me: protectedProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.user,
    };
  }),

  /**
   * Kiểm tra session còn hạn không
   */
  checkSession: publicProcedure.query(async ({ ctx }) => {
    return {
      isAuthenticated: !!ctx.user && !ctx.sessionExpired,
      user: ctx.user || null,
      sessionExpired: ctx.sessionExpired,
    };
  }),
});
