import Nav from "@/components/Nav";
import Panel from "@/components/Panel/Panel";
import PlayBar from "@/components/PlayBar";
import Providers from "@/providers/Providers";
import { Contents, ContentsContainer } from "@/styles/Contents";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Cherry Music",
  description: "A Music Player built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <Providers>
          <main>
            {modal}
            <Nav />
            <ContentsContainer>
              <Contents>
                {children}
                <div className="w-full h-10 bottom-0"></div>
                <Analytics />
              </Contents>
            </ContentsContainer>
            <Panel />
            <PlayBar />
          </main>
        </Providers>
      </body>
    </html>
  );
}
