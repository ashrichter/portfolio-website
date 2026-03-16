"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/_loading";

/**
 * DelayedSuspense
 * Shows a loading component for a specified delay,
 * then renders the children content.
 * This does NOT use React Suspense — it simply delays
 * rendering using a timer.
 */
export const DelayedSuspense = ({
  children,
  delay = 700, // default delay is 700ms
}: {
  children: React.ReactNode;
  delay?: number;
}) => {

  // Controls whether the loading screen is shown
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Start a timer when component mounts
    const timeout = setTimeout(() => {
      setShowLoader(false); // Hide loader after delay
    }, delay);

    // Cleanup function runs if component unmounts
    // Prevents memory leaks
    return () => clearTimeout(timeout);

  }, [delay]); // Re-run if delay value changes

  return (
    <>
      {
        // If still within delay period, show loader
        showLoader
          ? <Loading />
          : children // Otherwise render actual content
      }
    </>
  );
};