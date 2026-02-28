import { trpc } from "@/services/trpc";

export const authService = {
  login: () => trpc.auth.loginUser.useMutation(),
};
