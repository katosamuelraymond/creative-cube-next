import Link from "next/link";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { logout } from "@/app/actions/auth";

export default async function Navbar() {
  // Read session on the server
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  return (
    <header className="bg-surface-container-lowest sticky top-0 z-50 shadow-premium transition-all duration-300 border-b border-outline-variant/10">
      <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-desktop py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <span className="material-symbols-outlined">grid_view</span>
            </div>
            <span className="tracking-tight">Creative Cube</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Sofas", href: "/products?category=sofas" },
              { label: "Tables", href: "/products?category=tables" },
              { label: "Beds", href: "/products?category=beds" },
              { label: "Chairs", href: "/products?category=chairs" },
              { label: "Office", href: "/products?category=office" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-label-md text-label-md text-on-secondary-container hover:text-primary transition-colors nav-link-underline"
              >
                {link.label}
              </Link>
            ))}
            {session?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="font-label-md text-label-md text-primary font-bold hover:scale-105 transition-transform"
              >
                Admin ↗
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center bg-surface-container-low border border-outline-variant/30 rounded-full px-4 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <span className="material-symbols-outlined text-secondary mr-2">
                search
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 text-body-sm w-40 outline-none placeholder:text-outline"
                placeholder="Search..."
                type="text"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-surface-container-high/50 p-1.5 rounded-full border border-outline-variant/20">
              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md hover:scale-105 transition-transform"
                    title="Profile"
                  >
                    {String(session.userId ?? "?")
                      .slice(0, 1)
                      .toUpperCase()}
                  </Link>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="w-10 h-10 flex items-center justify-center hover:bg-error/10 hover:text-error rounded-full transition-all text-secondary"
                      title="Sign out"
                    >
                      <span className="material-symbols-outlined text-xl">logout</span>
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 hover:text-primary rounded-full transition-all text-secondary"
                  title="Sign in"
                >
                  <span className="material-symbols-outlined text-xl">person</span>
                </Link>
              )}

              <div className="w-px h-6 bg-outline-variant/30 mx-0.5"></div>

              <Link
                href="/cart"
                className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 hover:text-primary rounded-full transition-all text-secondary relative"
                title="Cart"
              >
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">0</span>
              </Link>

              <Link
                href="/orders"
                className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 hover:text-primary rounded-full transition-all text-secondary"
                title="Orders"
              >
                <span className="material-symbols-outlined text-xl">package_2</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
