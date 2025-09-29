import type React from "react";

import { useEffect, useState } from "react";
import { ThemeProviderContext, type Theme } from "@/lib/theme_context";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export default function AppThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  // Lazy initializer reads localStorage only on the client
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored =
        typeof window !== "undefined"
          ? (localStorage.getItem(storageKey) as Theme | null)
          : null;
      return stored ?? defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  // Apply theme to <html> class and persist to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.add(resolved);

    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // ignore write errors
    }
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (t: Theme) => setThemeState(t),
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
