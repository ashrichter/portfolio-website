"use client";

import { useState, useRef } from "react";
import styles from "@/styles/themetoggle.module.css";

export default function ThemeToggle() {
  const [animating, setAnimating] = useState(false);
  const [mode, setMode] = useState<"expand" | "collapse" | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [circlePos, setCirclePos] = useState({ top: 0, left: 0 });
  const [circleScale, setCircleScale] = useState(0);

  const toggleTheme = () => {
    if (!buttonRef.current || animating) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxX = Math.max(rect.left, vw - rect.left);
    const maxY = Math.max(rect.top, vh - rect.top);
    const radius = Math.sqrt(maxX * maxX + maxY * maxY);
 

    setCirclePos({
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    });

    setCircleScale(radius / 16);
    setAnimating(true);

    const root = document.documentElement;
    const isLight = root.classList.contains("light-theme");

    setMode("expand");

    setTimeout(() => {
      if (!isLight) {
        root.classList.add("light-theme");
        localStorage.setItem("theme", "light");
      } else {
        root.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
      }

      // setMode("collapse");
    }, 400);

    setTimeout(() => {
      setAnimating(false);
      setMode(null);
    }, 900);
  };

  return (
    <>
      <div
        className={`${styles.blender} ${mode ? styles[mode] : ""}`}
        style={{
          top: circlePos.top,
          left: circlePos.left,
          transform: `translate(-50%, -50%) scale(${mode ? circleScale : 0})`,
        }}
      />

      <button
        ref={buttonRef}
        className={styles.toggle}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      />
    </>
  );
}