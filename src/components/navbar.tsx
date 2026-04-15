'use client';

import Link from "next/link";
import styles from '@/styles/navbar.module.css';
import Logo from "@/components/logo";
import ThemeToggle from "@/components/themetoggle";

export default function Navbar(props: {
  to_path: string,
  name: string
}) {
  return (
    <div className={styles.navbar}>
      <a href="/#home" className={styles.logo}>
        <Logo />
      </a>

      <div className={styles.navright}>
        <ThemeToggle />

        <Link className={styles.routeb} href={props.to_path}>
          {props.name}
        </Link>
      </div>
    </div>
  );
}