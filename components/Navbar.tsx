import Link from "next/link";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { logout } from "@/app/actions/auth";

export default async function Navbar() {
  // Read session on the server — this is a Server Component
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-icon">◆</span>
          <span>Creative Cube</span>
        </Link>

        {/* Primary nav */}
        <nav aria-label="Main navigation">
          <ul className="navbar-nav">
            <li>
              <Link href="/products" className="navbar-link">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/products?category=chairs" className="navbar-link">
                Chairs
              </Link>
            </li>
            <li>
              <Link href="/products?category=sofas" className="navbar-link">
                Sofas
              </Link>
            </li>
            <li>
              <Link href="/products?category=tables" className="navbar-link">
                Tables
              </Link>
            </li>
            {session?.role === "ADMIN" && (
              <li>
                <Link href="/admin" className="navbar-link">
                  Admin ↗
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Cart */}
          <Link
            href="/cart"
            className="navbar-icon-btn"
            aria-label="Shopping cart"
          >
            🛒
          </Link>

          {/* Auth state */}
          {session ? (
            <div className="navbar-user">
              <div className="navbar-avatar" aria-label="User avatar">
                {String(session.userId ?? "?").slice(0, 1).toUpperCase()}
              </div>
              <form action={logout}>
                <button
                  type="submit"
                  className="navbar-link"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link href="/login" className="navbar-link">
                Sign in
              </Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: "0.4rem 0.875rem", fontSize: "0.875rem" }}>
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
