"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      }
    } catch (e) {
      console.warn("Failed to read theme from localStorage", e);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light-theme", theme === "light");
    root.classList.toggle("dark-theme", theme === "dark");
    root.setAttribute("data-theme-applied", "true");
  }, [theme]);

  return <>{children}</>;
}