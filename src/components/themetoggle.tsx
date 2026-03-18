"use client";

import { useState, useRef, useEffect } from "react";
import styles from "@/styles/themetoggle.module.css";

export default function ThemeToggle() {
  const [animating, setAnimating] = useState(false);
  const [mode, setMode] = useState<"expand" | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const svgRef = useRef<SVGSVGElement>(null);
  const [circlePos, setCirclePos] = useState({ top: 0, left: 0 });
  const [circleScale, setCircleScale] = useState(0);

  // Sync <html> class with theme
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light-theme", theme === "light");
    root.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    if (!svgRef.current || animating) return;

    const rect = svgRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const radius = Math.max(
      Math.hypot(cx, cy),
      Math.hypot(vw - cx, cy),
      Math.hypot(cx, vh - cy),
      Math.hypot(vw - cx, vh - cy)
    );

    setCirclePos({ top: cy, left: cx });
    setCircleScale(radius);
    setAnimating(true);
    setMode("expand");

    setTimeout(() => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }, 600);

    setTimeout(() => {
      setMode(null);
      setAnimating(false);
    }, 800);
  };

  return (
    <div className={styles.navToggleWrapper}>
      {/* Ripple effect */}
      <div
        className={`${styles.blender} ${mode ? styles[mode] : ""}`}
        style={{
          top: circlePos.top,
          left: circlePos.left,
          width: `${circleScale * 2}px`,
          height: `${circleScale * 2}px`,
          transform: `translate(-50%, -50%) scale(${mode ? 1 : 0})`,
        }}
      />

      {/* Inline SVG toggle */}
      {theme === "light" ? (
        // Dark icon (new SVG with stroke)
        <svg
          ref={svgRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.themeToggle}
          onClick={toggleTheme}
          onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
        >
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      ) : (
        // Light icon (sun)
        <svg
          ref={svgRef}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.themeToggle}
          onClick={toggleTheme}
          onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
        >
          <path d="M11.289 23.287v-2.952a.713.713 0 1 1 1.426 0v2.952a.713.713 0 1 1-1.426 0zm8.19-2.804l-2.087-2.086a.713.713 0 1 1 1.008-1.008l2.085 2.089a.713.713 0 0 1-1.009 1.002l.001.001zm-15.962 0a.71.71 0 0 1 0-1.008l2.087-2.087a.713.713 0 1 1 1.008 1.008l-2.087 2.086a.71.71 0 0 1-1.008 0zm2.803-8.485a5.683 5.683 0 1 1 11.366 0a5.683 5.683 0 0 1-11.366 0zm1.425 0a4.26 4.26 0 1 0 8.518 0a4.26 4.26 0 0 0-8.518 0zm12.591.713a.713.713 0 1 1 0-1.426h2.952a.713.713 0 1 1 0 1.426zm-19.623 0a.713.713 0 1 1 0-1.426h2.953a.713.713 0 1 1 0 1.426zM17.39 6.608a.71.71 0 0 1 0-1.008l2.087-2.087a.713.713 0 1 1 1.008 1.008l-2.087 2.087a.71.71 0 0 1-1.008 0zm-11.788 0L3.517 4.523a.713.713 0 1 1 1.008-1.008l2.087 2.087A.713.713 0 1 1 5.604 6.61zm5.685-2.944V.713a.713.713 0 1 1 1.426 0v2.952a.713.713 0 1 1-1.426 0z"/>
        </svg>
      )}
    </div>
  );
}