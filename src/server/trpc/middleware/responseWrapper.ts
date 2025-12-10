import { publicProcedure } from "../router";

export const withResponse = publicProcedure.use(async ({ next }) => {
  const result = await next();

  // Nếu là kết quả OK
  if (result.ok) {
    return {
      ...result,
      data: {
        iStatus: "success",
        iMessage: "Thành công",
        iPayload: result.data,
      },
    };
  }

  // Nếu là error — không bao giờ rơi vào đây (trpc tự throw)
  return result;
});
