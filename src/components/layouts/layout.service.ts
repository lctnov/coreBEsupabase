import { trpc } from "@/services/trpc";

export function useLayoutService() {
  const utils = trpc.useUtils();

  const checkSessionQuery = trpc.auth.checkSession.useQuery();

  const logoutMutation = trpc.auth.logoutUser.useMutation({
    onSuccess: () => {
      utils.auth.checkSession.invalidate();
    },
  });

  return {
    checkSessionQuery,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
