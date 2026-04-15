'use client';

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Menu from "@/components/_homepage/options";
import styles from "@/styles/homepage.module.css";

export default function HomePage(props: {
  sections: { [key: string]: JSX.Element }
}) {
  const [bodyJSX, setBodyJSX] = useState<string>("home");

  const isKeyExist = (keyStr: string) => {
    return Object.prototype.hasOwnProperty.call(props.sections, keyStr);
  };

  const capitalizedKeys = Object.keys(props.sections).map(key => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  });

  useEffect(() => {
    const syncSectionFromHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();

      if (hash && isKeyExist(hash)) {
        setBodyJSX(hash);
      } else {
        setBodyJSX("home");
      }
    };

    const handleGoHomeSection = () => {
      setBodyJSX("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    syncSectionFromHash();

    window.addEventListener("hashchange", syncSectionFromHash);
    window.addEventListener("go-home-section", handleGoHomeSection as EventListener);

    return () => {
      window.removeEventListener("hashchange", syncSectionFromHash);
      window.removeEventListener("go-home-section", handleGoHomeSection as EventListener);
    };
  }, [props.sections]);

  const handleSetBodyJSX: Dispatch<SetStateAction<string>> = (value) => {
    setBodyJSX((prev) => {
      const nextValue = typeof value === "function" ? value(prev) : value;
      const normalized = nextValue.toLowerCase();

      window.history.replaceState(null, "", `/#${normalized}`);
      return normalized;
    });
  };

  return (
    <>
      <div className={styles.homedivmain}>
        {props.sections[bodyJSX] ?? props.sections["home"]}
      </div>

      <Menu
        bodyJSX={bodyJSX}
        setBodyJSX={handleSetBodyJSX}
        keys={capitalizedKeys}
        isKeyExist={isKeyExist}
      />
    </>
  );
}