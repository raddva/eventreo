import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "./providers";
import { Inter } from "next/font/google";
import { cn } from "@/utils/cn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>

      <QueryClientProvider client={queryClient}>
        < Providers >
          <main className={cn(
            inter.className,
            "flex min-h-screen min-w-full items-center justify-center gap-10 py-10 lg:py-0"
          )}>
            <Component {...pageProps} />
          </main>
        </ Providers>
      </QueryClientProvider>
    </SessionProvider>
  );
}
