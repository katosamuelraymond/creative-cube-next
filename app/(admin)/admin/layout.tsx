import Link from "next/link";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Security: Check if user is Admin
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get("session")?.value);

  if (session?.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* SideNavBar - Fixed for desktop */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 z-50">
        <div className="flex flex-col h-full p-4 gap-2">
          {/* Brand Anchor */}
          <div className="px-4 py-8 mb-4">
            <Link href="/" className="font-headline-md text-headline-md font-bold text-primary block">
              Creative Cube
            </Link>
            <p className="font-body-sm text-xs font-bold text-secondary uppercase tracking-widest mt-1 opacity-60">
              Management
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-4 py-3 bg-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all scale-[0.98]"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-md text-sm uppercase tracking-wider">Dashboard</span>
            </Link>
            
            {[
              { label: "Orders", icon: "shopping_bag", href: "/admin/orders" },
              { label: "Products", icon: "inventory_2", href: "/admin/products" },
              { label: "Categories", icon: "category", href: "/admin/categories" },
              { label: "Customers", icon: "group", href: "/admin/customers" },
              { label: "Analytics", icon: "monitoring", href: "/admin/analytics" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-highest hover:text-primary rounded-xl transition-all font-bold uppercase tracking-widest text-[10px]"
              >
                <span className="material-symbols-outlined text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer of Sidebar */}
          <div className="mt-auto pt-4 border-t border-outline-variant/10">
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-highest rounded-xl transition-all font-bold uppercase tracking-widest text-[10px]"
            >
              <span className="material-symbols-outlined text-xl">settings</span>
              <span>Settings</span>
            </Link>
            
            <div className="flex items-center gap-3 px-4 py-6 mt-2 bg-surface-container/50 rounded-2xl border border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs font-bold text-on-surface">Alex Rivera</span>
                <span className="text-[10px] text-secondary font-bold uppercase opacity-60 tracking-tighter">Super Admin</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {children}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant/20 flex justify-around py-4 z-50 shadow-2xl">
        <Link href="/admin" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold uppercase">Admin</span>
        </Link>
        <Link href="/admin/orders" className="flex flex-col items-center gap-1 text-secondary">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="text-[10px] font-bold uppercase">Orders</span>
        </Link>
        <Link href="/admin/products" className="flex flex-col items-center gap-1 text-secondary">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-bold uppercase">Stock</span>
        </Link>
        <Link href="/admin/customers" className="flex flex-col items-center gap-1 text-secondary">
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-bold uppercase">Users</span>
        </Link>
      </div>
    </div>
  );
}
