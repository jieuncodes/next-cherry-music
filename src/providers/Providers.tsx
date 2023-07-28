import { ReactNode } from "react";
import RecoilProvider from "./RecoilProvider";
import NextUIProvider from "./NextUIProvider";
import SupabaseProvider from "./SupabaseProvider";
import ModalProvider from "./ModalProvider";
import PlayerProvider from "./PlayerProvider";

function Providers({ children }: { children: ReactNode }) {
  return (
    <RecoilProvider>
      <NextUIProvider>
        <SupabaseProvider>
          <ModalProvider />
          <PlayerProvider>{children}</PlayerProvider>
        </SupabaseProvider>
      </NextUIProvider>
    </RecoilProvider>
  );
}

export default Providers;
