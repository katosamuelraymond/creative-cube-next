import Link from "next/link";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get("session")?.value);

  if (session?.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar — fixed, scrolls independently */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 md:ml-[272px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 px-6 md:px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-all text-secondary">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div className="hidden md:flex items-center bg-surface-container border border-outline-variant/20 rounded-2xl px-4 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all w-80">
                <span className="material-symbols-outlined text-secondary/40 mr-3">search</span>
                <input
                  className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none placeholder:text-secondary/40"
                  placeholder="Search orders, products, customers..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-all text-secondary">
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-container-lowest" />
              </button>

              <ThemeToggle />

              <div className="w-px h-8 bg-outline-variant/20 mx-1" />

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                  A
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-bold text-on-surface leading-tight">Admin</span>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60">Super Admin</span>
                </div>
              </div>

              {/* Logout */}
              <form action={logout}>
                <button
                  type="submit"
                  className="w-10 h-10 flex items-center justify-center hover:bg-error/10 hover:text-error rounded-xl transition-all text-secondary"
                  title="Sign out"
                >
                  <span className="material-symbols-outlined text-xl">logout</span>
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Page content — scrolls */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 md:pb-10">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant/20 flex justify-around py-3 z-50 shadow-2xl">
        {[
          { label: "Dashboard", icon: "dashboard", href: "/admin" },
          { label: "Orders", icon: "shopping_bag", href: "/admin/orders" },
          { label: "Products", icon: "inventory_2", href: "/admin/products" },
          { label: "Users", icon: "group", href: "/admin/customers" },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
