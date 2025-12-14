import { trpc } from "@/services/trpc";

export const registerService = {
  register: () => trpc.auth.register.useMutation(),
};
