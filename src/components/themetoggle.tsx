"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import styles from "@/styles/themetoggle.module.css";

const BLENDER_MS = 540;

const THEME_BG = {
  light: "#ECEFF4",
  dark: "#2E3440",
} as const;

export default function ThemeToggle() {
  const [phase, setPhase] = useState<"idle" | "expand" | "collapse">("idle");
  const [animKey, setAnimKey] = useState(0);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  const [overlayTheme, setOverlayTheme] = useState<"light" | "dark">(theme);

  const svgRef = useRef<SVGSVGElement>(null);

  const [circlePos, setCirclePos] = useState({ top: 0, left: 0 });
  const [circleScale, setCircleScale] = useState(0);

  const timeoutRef = useRef<number | null>(null);
  const rafOneRef = useRef<number | null>(null);
  const rafTwoRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light-theme", theme === "light");
    root.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  useEffect(() => {
    return () => {
      cancelPendingAnimation();
    };
  }, []);

  const cancelPendingAnimation = () => {
    const root = document.documentElement;

    if (rafOneRef.current !== null) {
      cancelAnimationFrame(rafOneRef.current);
      rafOneRef.current = null;
    }

    if (rafTwoRef.current !== null) {
      cancelAnimationFrame(rafTwoRef.current);
      rafTwoRef.current = null;
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    root.classList.remove("theme-animating");
  };

  const applyTheme = (nextTheme: "light" | "dark") => {
    const root = document.documentElement;

    root.classList.toggle("light-theme", nextTheme === "light");
    root.classList.toggle("dark-theme", nextTheme === "dark");

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const toggleTheme = () => {
    if (!svgRef.current) return;

    cancelPendingAnimation();
    setAnimKey((k) => k + 1);

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

    const isLight = theme === "light";
    const nextTheme = isLight ? "dark" : "light";

    setCirclePos({ top: cy, left: cx });
    setCircleScale(radius);
    setOverlayTheme(nextTheme);

    const root = document.documentElement;

    // LIGHT → DARK
    if (isLight) {
      root.classList.add("theme-animating");
      setPhase("expand");

      rafOneRef.current = requestAnimationFrame(() => {
        applyTheme(nextTheme);

        rafTwoRef.current = requestAnimationFrame(() => {
          setPhase("collapse");

          timeoutRef.current = window.setTimeout(() => {
            setPhase("idle");
            root.classList.remove("theme-animating");
            timeoutRef.current = null;
          }, BLENDER_MS);
        });
      });

      return;
    }

    // DARK → LIGHT
    root.classList.add("theme-animating");
    setPhase("collapse");

    rafOneRef.current = requestAnimationFrame(() => {
      setPhase("expand");

      timeoutRef.current = window.setTimeout(() => {
        applyTheme(nextTheme);

        rafTwoRef.current = requestAnimationFrame(() => {
          setPhase("idle");
          root.classList.remove("theme-animating");
        });
      }, BLENDER_MS);
    });
  };

  return (
    <div className={styles.navToggleWrapper}>
      {phase !== "idle" && (
        <div
          key={animKey}
          className={styles.blender}
          style={{
            top: circlePos.top,
            left: circlePos.left,
            width: `${circleScale * 2}px`,
            height: `${circleScale * 2}px`,
            backgroundColor: THEME_BG[overlayTheme],
            transform: `translate(-50%, -50%) scale(${
              phase === "expand" ? 1 : 0
            })`,
          }}
        />
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 24 24"
        className={styles.themeToggle}
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M11.289 23.287v-2.952a.713.713 0 1 1 1.426 0v2.952a.713.713 0 1 1-1.426 0zm8.19-2.804l-2.087-2.086a.713.713 0 1 1 1.008-1.008l2.085 2.089a.713.713 0 0 1-1.009 1.002l.001.001zm-15.962 0a.71.71 0 0 1 0-1.008l2.087-2.087a.713.713 0 1 1 1.008 1.008l-2.087 2.086a.71.71 0 0 1-1.008 0zm2.803-8.485a5.683 5.683 0 1 1 11.366 0a5.683 5.683 0 0 1-11.366 0zm1.425 0a4.26 4.26 0 1 0 8.518 0a4.26 4.26 0 0 0-8.518 0zm12.591.713a.713.713 0 1 1 0-1.426h2.952a.713.713 0 1 1 0 1.426zm-19.623 0a.713.713 0 1 1 0-1.426h2.953a.713.713 0 1 1 0 1.426zM17.39 6.608a.71.71 0 0 1 0-1.008l2.087-2.087a.713.713 0 1 1 1.008 1.008l-2.087 2.087a.71.71 0 0 1-1.008 0zm-11.788 0L3.517 4.523a.713.713 0 1 1 1.008-1.008l2.087 2.087A.713.713 0 1 1 5.604 6.61zm5.685-2.944V.713a.713.713 0 1 1 1.426 0v2.952a.713.713 0 1 1-1.426 0z"
          />
        )}
      </svg>
    </div>
  );
}