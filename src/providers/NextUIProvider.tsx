"use client";

import {
  NextUIProvider as OriginalNextUIProvider,
  createTheme,
} from "@nextui-org/react";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      gradient: "linear-gradient(315deg, #726cf8 0%, #e975a8 74%);)",
      primary: "rgba(230,79,164)", //cherry
    },
  },
});

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OriginalNextUIProvider theme={lightTheme}>
      {children}
    </OriginalNextUIProvider>
  );
}
