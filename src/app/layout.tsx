import Nav from "@/components/Nav";
import Panel from "@/components/Panel/Panel";
import PlayBar from "@/components/PlayBar";
import Providers from "@/providers/Providers";
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
        <Providers>
          <main>
            <Nav />
            <ContentsContainer>
              <Contents>{children}</Contents>
            </ContentsContainer>
            <Panel />
            <PlayBar />
          </main>
        </Providers>
      </body>
    </html>
  );
}
