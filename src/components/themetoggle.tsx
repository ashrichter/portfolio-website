"use client";

import { useState, useRef, useLayoutEffect } from "react";
import styles from "@/styles/themetoggle.module.css";

const FORCE_SIMPLE_THEME_FALLBACK = false;

type Theme = "light" | "dark";

type StartViewTransitionFn = (
  options:
    | (() => void | Promise<void>)
    | {
        update: () => void | Promise<void>;
        types?: string[];
      }
) => {
  finished: Promise<void>;
};

const getThemeColors = (theme: Theme) => {
  return theme === "light"
    ? {
        bg: "#ECEFF4",
        fg: "#2E3440",
        colorScheme: "light",
      }
    : {
        bg: "#2E3440",
        fg: "#ECEFF4",
        colorScheme: "dark",
      };
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  const svgRef = useRef<SVGSVGElement>(null);

  const syncBrowserChrome = (nextTheme: Theme) => {
    const root = document.documentElement;
    const { bg, fg, colorScheme } = getThemeColors(nextTheme);

    root.style.backgroundColor = bg;
    root.style.colorScheme = colorScheme;

    if (document.body) {
      document.body.style.backgroundColor = bg;
      document.body.style.color = fg;
    }

    let metaTheme = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );

    if (!metaTheme) {
      metaTheme = document.createElement("meta");
      metaTheme.name = "theme-color";
      document.head.appendChild(metaTheme);
    }

    metaTheme.setAttribute("content", bg);
  };

  const applyTheme = (
    nextTheme: Theme,
    options: { updateBrowserChrome?: boolean } = {}
  ) => {
    const root = document.documentElement;

    root.classList.toggle("light-theme", nextTheme === "light");
    root.classList.toggle("dark-theme", nextTheme === "dark");
    root.setAttribute("data-theme-applied", "true");

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (options.updateBrowserChrome !== false) {
      syncBrowserChrome(nextTheme);
    }
  };

  useLayoutEffect(() => {
    applyTheme(theme, { updateBrowserChrome: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNativeViewTransition = (
    nextTheme: Theme,
    cx: number,
    cy: number,
    radius: number
  ) => {
    const root = document.documentElement;
    const startViewTransition = (
      document as Document & {
        startViewTransition?: StartViewTransitionFn;
      }
    ).startViewTransition;

    if (!startViewTransition) return false;

    try {
      root.style.setProperty("--theme-vt-x", `${cx}px`);
      root.style.setProperty("--theme-vt-y", `${cy}px`);
      root.style.setProperty("--theme-vt-r", `${radius}px`);

      const type =
        nextTheme === "light" ? "theme-to-light" : "theme-to-dark";

      /*
        Mobile browser top/bottom chrome is outside the View Transition.
        This native radial transition is now only used on non-mobile screens.
      */
      const transition = startViewTransition.call(document, {
        update: () => {
          applyTheme(nextTheme, { updateBrowserChrome: false });
        },
        types: [type],
      });

      /*
        Keep the delayed browser-chrome sync here for desktop/tablet browsers
        that expose theme-color areas during the transition.
      */
      window.setTimeout(() => {
        syncBrowserChrome(nextTheme);
      }, nextTheme === "dark" ? 120 : 420);

      transition.finished.finally(() => {
        root.style.removeProperty("--theme-vt-x");
        root.style.removeProperty("--theme-vt-y");
        root.style.removeProperty("--theme-vt-r");

        syncBrowserChrome(nextTheme);
      });

      return true;
    } catch {
      root.style.removeProperty("--theme-vt-x");
      root.style.removeProperty("--theme-vt-y");
      root.style.removeProperty("--theme-vt-r");
      return false;
    }
  };

  const toggleTheme = () => {
    if (!svgRef.current) return;

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

    const nextTheme: Theme = theme === "light" ? "dark" : "light";

    /*
      Mobile fallback:
      The browser top/bottom chrome is outside the View Transition,
      so the radial animation can look broken on mobile.
      Mobile now skips the native View Transition and uses the simple switch.
    */
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (
      !isMobile &&
      !FORCE_SIMPLE_THEME_FALLBACK &&
      startNativeViewTransition(nextTheme, cx, cy, radius)
    ) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("theme-switching");

    applyTheme(nextTheme, { updateBrowserChrome: true });

    requestAnimationFrame(() => {
      root.classList.remove("theme-switching");
    });
  };

  return (
    <div className={styles.navToggleWrapper}>
      <svg
        ref={svgRef}
        viewBox="0 0 24 24"
        className={styles.themeToggle}
        onClick={toggleTheme}
        onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
        tabIndex={0}
        role="button"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
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