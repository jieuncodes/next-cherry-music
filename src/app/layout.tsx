import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import NextUIProvider from "@/providers/NextUIProvider";
import RecoilProvider from "@/providers/RecoilProvider";
import Nav from "@/components/Nav";
import PlayBar from "@/components/PlayBar";
import { Contents, ContentsContainer } from "@/styles/Contents";
import ModalProvider from "@/providers/ModalProvider";
import Panel from "@/components/Panel/Panel";

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
              <main>
                <Nav />
                <ContentsContainer>
                  <Contents>{children}</Contents>
                  <PlayBar />
                </ContentsContainer>

                <Panel />
              </main>
            </SupabaseProvider>
          </NextUIProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
