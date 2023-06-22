"use client";

import { NextUIProvider as OriginalNextUIProvider } from "@nextui-org/system";

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OriginalNextUIProvider>{children}</OriginalNextUIProvider>;
}
