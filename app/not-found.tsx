import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found global page</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="home-button">
        Go back to Home
      </Link>
    </div>
  );
}
