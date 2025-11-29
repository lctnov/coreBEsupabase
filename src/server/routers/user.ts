import { router, publicProcedure } from "../trpc/router";
import { db } from "../db";
import { users } from "../db/schema";
import { zod } from "zod";
import { asc, count } from "drizzle-orm";

export const userRouter = router({
  list: publicProcedure
    .input(
      zod.object({
        page: zod.number().min(1),
        limit: zod.number().min(1).max(100),
      })
    )
    .query(async ({ input }) => {
      const offset = (input.page - 1) * input.limit;

      const data = await db
        .select()
        .from(users)
        .orderBy(asc(users.createdAt))
        .limit(input.limit)
        .offset(offset);

      const countResult = await db.select({ count: count() }).from(users);
      const total = countResult[0]?.count || 0;

      return {
        data,
        total,
        page: input.page,
        totalPages: Math.ceil(total / input.limit),
      };
    }),
});
