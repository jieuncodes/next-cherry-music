import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import NextUIProvider from "@/providers/NextUIProvider";
import RecoilProvider from "@/providers/RecoilProvider";
import Nav from "@/components/Nav";
import { Contents, ContentsContainer } from "@/styles/Contents";
import ModalProvider from "@/providers/ModalProvider";
import Panel from "@/components/Panel/Panel";
import PlayBar from "@/components/PlayBar";
import PlayerProvider from "@/providers/PlayerProvider";

export const metadata = {
  title: "Cherry Music",
  description: "A Music Player built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <RecoilProvider>
          <NextUIProvider>
            <SupabaseProvider>
              <ModalProvider />
              <PlayerProvider>
                <main>
                  <Nav />
                  <ContentsContainer>
                    <Contents>{children}</Contents>
                  </ContentsContainer>
                  <Panel />
                  <PlayBar />
                </main>
              </PlayerProvider>
            </SupabaseProvider>
          </NextUIProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
