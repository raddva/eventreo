import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import AppShell from "@/components/commons/AppShell";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";

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
        <HeroUIProvider>
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
          <ToastProvider
            placement="top-right"
            maxVisibleToasts={3}
          />
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}