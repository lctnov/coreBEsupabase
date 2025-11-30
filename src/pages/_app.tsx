import type { AppType } from "next/app";
import "@/styles/globals.css";
import { trpcNext } from "../utils/trpc";
import ThemeProvider from "@/components/ThemeProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default trpcNext.withTRPC(MyApp);
