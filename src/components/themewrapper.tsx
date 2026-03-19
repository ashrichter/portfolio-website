"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false); // only render children after theme is applied
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // On mount, read theme from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch (e) {
      console.warn("Failed to read theme from localStorage", e);
    } finally {
      setMounted(true); // ready to render children
    }
  }, []);

  // Apply theme class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light-theme", theme === "light");
    root.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  if (!mounted) return null; // don't render until theme applied

  return <>{children}</>;
}