"use client";

import { useEffect, useState } from "react";
import Menu from "@/components/_homepage/options";
import styles from "@/styles/homepage.module.css";

export default function HomePage(props: {
  sections: { [key: string]: JSX.Element };
}) {
  const [bodyJSX, setBodyJSX] = useState<string>("home");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const isKeyExist = (keyStr: string) => {
    return Object.prototype.hasOwnProperty.call(props.sections, keyStr);
  };

  const capitalizedKeys = Object.keys(props.sections).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1)
  );

  const isProjectsSection = bodyJSX.toLowerCase() === "projects";

  useEffect(() => {
    const handleHomeLogoRefresh = () => {
      setBodyJSX("home");
      setRefreshKey((prev) => prev + 1);
    };

    window.addEventListener("home-logo-refresh", handleHomeLogoRefresh);

    return () => {
      window.removeEventListener("home-logo-refresh", handleHomeLogoRefresh);
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.homedivmain} ${
          isProjectsSection ? styles.scrollPage : styles.lockedPage
        }`}
        key={`${bodyJSX}-${refreshKey}`}
      >
        {props.sections[bodyJSX] ?? props.sections["home"]}
      </div>

      <Menu
        bodyJSX={bodyJSX}
        setBodyJSX={setBodyJSX}
        keys={capitalizedKeys}
        isKeyExist={isKeyExist}
      />
    </>
  );
}