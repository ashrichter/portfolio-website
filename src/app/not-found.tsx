import Link from "next/link";
import styles from "@/styles/notfound.module.css";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Page Not Found</h1>
            <h3 className={styles.subtitle}>
                Go back to <Link href="/" className={styles.link}>Home</Link>
            </h3>
        </div>
    );
}