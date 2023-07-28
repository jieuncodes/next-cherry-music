"use client";

import { NextUIProvider as OriginalNextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OriginalNextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </OriginalNextUIProvider>
  );
}
