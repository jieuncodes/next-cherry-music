import Nav from "@/components/Nav";
import Panel from "@/components/Panel/Panel";
import PlayBar from "@/components/PlayBar";
import ModalProvider from "@/providers/ModalProvider";
import NextUIProvider from "@/providers/NextUIProvider";
import PlayerProvider from "@/providers/PlayerProvider";
import RecoilProvider from "@/providers/RecoilProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { Contents, ContentsContainer } from "@/styles/Contents";
import "./globals.css";

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
