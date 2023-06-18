import Nav from "./components/Nav";
import ProvidersWrapper from "./ProvidersWrapper";
import "./globals.css";
import Panel from "./components/Panel";
import { ContentsContainer } from "./styles/Contents";

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
            <ContentsContainer>{children}</ContentsContainer>
            <Panel />
          </main>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
