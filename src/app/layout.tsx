import Nav from "./components/Nav";
import ProvidersWrapper from "./ProvidersWrapper";
import "./globals.css";
import Panel from "./components/Panel";
import { ContentsContainer } from "./styles/Contents";
import PlayBar from "./components/PlayBar";

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
        <ProvidersWrapper>
          <main>
            <Nav />
            <ContentsContainer>
              <div className="w-full h-full box-border m-6 ">{children}</div>
              <PlayBar />
            </ContentsContainer>
            <Panel />
          </main>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
