import { useTheme } from "next-themes";
import { Icons } from "../app/Icons";
import { useState } from "react";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      {isDark ? (
        <button
          onClick={() => {
            setTheme("light");
            setIsDark(false);
          }}
        >
          <Icons.sun />
        </button>
      ) : (
        <button
          onClick={() => {
            setTheme("dark");
            setIsDark(true);
          }}
        >
          <Icons.moon />
        </button>
      )}
    </>
  );
}

export default ThemeSwitcher;
