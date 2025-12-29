import type { AppType } from "next/app";
import { useEffect } from "react";
import "@/styles/globals.css";
import { trpcNext } from "../services/trpc";
import ThemeProvider from "@/pages/features/home/components/ThemeProvider";
import { enableSmoothScroll } from "@/utils/scrollOptimization";
import { LayoutAuthProvider } from "@/pages/layouts/layout.context";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    // Enable smooth scroll optimization on mount
    enableSmoothScroll();
  }, []);

  return (
    <ThemeProvider>
      <LayoutAuthProvider>
        <Component {...pageProps} />
      </LayoutAuthProvider>
    </ThemeProvider>
  );
};

export default trpcNext.withTRPC(MyApp);
