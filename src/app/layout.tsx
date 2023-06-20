import Nav from "./components/Nav";
import "./globals.css";
import Panel from "./components/Panel";
import { ContentsContainer } from "./styles/Contents";
import PlayBar from "./components/PlayBar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import NextUiProvider from "@/providers/NextUiProvider";

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
    <html lang="en">
      <body className="antialiased">
        <NextUiProvider>
          <SupabaseProvider>
            <main>
              <Nav />
              <ContentsContainer>
                <div className="w-full h-full box-border m-6 ">{children}</div>
                <PlayBar />
              </ContentsContainer>
              <Panel />
            </main>
          </SupabaseProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
