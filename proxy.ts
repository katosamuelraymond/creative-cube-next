import { NextResponse, type NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

// ─── Route configuration ──────────────────────────────────────────────────────

const protectedCustomerRoutes = ["/orders", "/checkout", "/cart"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals, static files, and public auth API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Decode session from cookie
  const sessionCookie = request.cookies.get("session")?.value;
  const session = await decrypt(sessionCookie);

  const isAuthenticated = !!session;
  const isAdmin = session?.role === "ADMIN";

  // ── Admin route guard ──────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ── Protected customer routes ──────────────────────────────────────────────
  const isProtected = protectedCustomerRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url)
    );
  }

  // ── Redirect logged-in users away from auth pages ─────────────────────────
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
