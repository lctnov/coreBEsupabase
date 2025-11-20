import { createTRPCReact } from "@trpc/react-query";
import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/routers";

export const trpc = createTRPCReact<AppRouter>();

function getBaseUrl() {
	if (typeof window !== "undefined") return "";
	return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
}

export const trpcNext = createTRPCNext<AppRouter>({
	config() {
		return {
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
					fetch: (input, init) => fetch(input as any, { ...init, credentials: "include" }),
				}),
			],
		};
	},
	ssr: false,
});

