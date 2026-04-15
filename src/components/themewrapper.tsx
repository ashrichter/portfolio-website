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
    const bg = theme === "light" ? "#ECEFF4" : "#2E3440";
    const fg = theme === "light" ? "#2E3440" : "#ECEFF4";

    root.classList.toggle("light-theme", theme === "light");
    root.classList.toggle("dark-theme", theme === "dark");
    root.setAttribute("data-theme-applied", "true");
    root.style.backgroundColor = bg;
    root.style.colorScheme = theme;

    document.body.style.backgroundColor = bg;
    document.body.style.color = fg;

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", bg);
    }
  }, [theme]);

  return <>{children}</>;
}