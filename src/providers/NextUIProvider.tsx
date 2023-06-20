"use client";

import { NextUIProvider, createTheme } from "@nextui-org/react";

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

export default function NextUiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider theme={lightTheme}>{children}</NextUIProvider>;
}
