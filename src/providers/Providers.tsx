"use client";
import { ReactNode, useState } from "react";
import RecoilProvider from "./RecoilProvider";
import NextUIProvider from "./NextUIProvider";
import SupabaseProvider from "./SupabaseProvider";
import ModalProvider from "./ModalProvider";
import PlayerProvider from "./PlayerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <RecoilProvider>
          <NextUIProvider>
            <SupabaseProvider>
              <ModalProvider />
              <PlayerProvider>{children}</PlayerProvider>
            </SupabaseProvider>
          </NextUIProvider>
        </RecoilProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}

export default Providers;
