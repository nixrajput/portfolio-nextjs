import { ThemeProviderContext } from "@/store/theme";
import { useContext, useEffect, useState } from "react";

export type EffectiveTheme = "dark" | "light";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>("dark");

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  useEffect(() => {
    // If theme is explicitly set to dark or light, use that
    if (context.theme === "dark" || context.theme === "light") {
      setEffectiveTheme(context.theme);
      return;
    }

    // If theme is system, detect the system preference
    if (context.theme === "system") {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setEffectiveTheme(isDarkMode ? "dark" : "light");

      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setEffectiveTheme(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [context.theme]);

  return {
    ...context,
    effectiveTheme,
  };
};
