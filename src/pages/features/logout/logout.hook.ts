import { useRouter } from "next/router";
import { clearAuth } from "./logout.service";
import { trpc } from "@/services/trpc";

export function useLogout() {
  const router = useRouter();
  const logoutMutation = trpc.auth.logoutUser.useMutation();
  
  const logout = async () => {
    try {
      // 🔥 GỌI logoutUser SERVER
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally { 
      //clear client auth data
      clearAuth();

      //redirect to login page
      router.push("/features/login");
    }
  };

  return { logout, isPending: logoutMutation.isPending, };
}
