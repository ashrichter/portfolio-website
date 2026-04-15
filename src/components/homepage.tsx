'use client';

import { useState } from "react";
import Menu from "@/components/_homepage/options";
import styles from "@/styles/homepage.module.css";

export default function HomePage(props:{
  sections: { [key: string]: JSX.Element }
}) {
  const [bodyJSX, setBodyJSX] = useState<string>("home");

  const isKeyExist = (keyStr: string) => {
    return Object.prototype.hasOwnProperty.call(props.sections, keyStr);
  };

  const capitalizedKeys = Object.keys(props.sections).map(key =>
    key.charAt(0).toUpperCase() + key.slice(1)
  );

  return (
    <>
      <div className={styles.homedivmain}>
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