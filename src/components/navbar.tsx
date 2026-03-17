import Link from "next/link";
import styles from '@/styles/navbar.module.css';
import Logo from "@/components/logo";
import ThemeToggle from "@/components/themetoggle";

/* =========================================
   Navbar Component
   Displays the logo, navigation link,
   and theme toggle button.
========================================= */

export default function Navbar(props: {
    to_path: string,
    name: string
}){
    return <div className={styles.navbar}>

        <Link href="/" className={styles.logo}>
            <Logo />
        </Link>

        {/* Right side navigation area */}
        <div className={styles.navright}>

            {/* Theme toggle button */}
            <ThemeToggle />

            {/* Main navigation link */}
            <Link
              className={styles.routeb}
              href={props.to_path}
            >
              {props.name}
            </Link>

        </div>

    </div>
}