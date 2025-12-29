import { trpc } from "@/services/trpc";

export const registerService = {
  register: () => trpc.auth.registerUser.useMutation(),
};
