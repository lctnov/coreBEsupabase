import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected procedure - yêu cầu user đã login
 * Nếu session hết hạn, sẽ throw UNAUTHORIZED error
 */
export const protectedProcedure = publicProcedure.use(async (opts) => {
  // Kiểm tra session expired
  if (opts.ctx.sessionExpired) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Session expired. Please login again.",
    });
  }

  // Kiểm tra user có login hay không
  if (!opts.ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
      user: opts.ctx.user,
    },
  });
});
