import Nav from "./components/Nav";
import ProvidersWrapper from "./ProvidersWrapper";
import "./globals.css";
import Panel from "./components/Panel";

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
            <div className="bg-zinc-100 w-full h-full rounded-l-[15px] p-[30px]">
              {children}
            </div>
            <Panel />
          </main>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
