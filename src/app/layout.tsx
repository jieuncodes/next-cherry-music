import "./globals.css";
import SupabaseProvider from "@/providers/SupabaseProvider";
import NextUIProvider from "@/providers/NextUIProvider";
import RecoilProvider from "@/providers/RecoilProvider";
import Nav from "@/components/Nav";
import PlayBar from "@/components/PlayBar";
import Panel from "@/components/Panel";
import { ContentsContainer } from "@/styles/Contents";
import ModalProvider from "@/providers/ModalProvider";

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
                  <div className="w-full h-full box-border m-6 ">
                    {children}
                  </div>
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
