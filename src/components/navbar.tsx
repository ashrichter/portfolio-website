'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from '@/styles/navbar.module.css';
import Logo from "@/components/logo";
import ThemeToggle from "@/components/themetoggle";

export default function Navbar(props: {
  to_path: string,
  name: string
}) {
  const pathname = usePathname();

  const handleLogoClick = () => {
    // If already on homepage, force-reset the homepage section
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("go-home-section"));
      window.history.replaceState(null, "", "/#home");
    }
  };

  return (
    <div className={styles.navbar}>
      <Link href="/#home" className={styles.logo} onClick={handleLogoClick}>
        <Logo />
      </Link>

      <div className={styles.navright}>
        <ThemeToggle />

        <Link className={styles.routeb} href={props.to_path}>
          {props.name}
        </Link>
      </div>
    </div>
  );
}