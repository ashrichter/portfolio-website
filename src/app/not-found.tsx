import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">Page Not Found</h1>
      <h3 className="notfound-subtitle">
        Go back to{" "}
        <Link href="/#home" className="notfound-link">
          Home
        </Link>
      </h3>
    </div>
  );
}