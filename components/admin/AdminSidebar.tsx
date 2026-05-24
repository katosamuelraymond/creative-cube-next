"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/admin" },
  { label: "Orders", icon: "shopping_bag", href: "/admin/orders" },
  { label: "Products", icon: "inventory_2", href: "/admin/products" },
  { label: "Categories", icon: "category", href: "/admin/categories" },
  { label: "Customers", icon: "group", href: "/admin/customers" },
  { label: "Analytics", icon: "monitoring", href: "/admin/analytics" },
];

const bottomItems = [
  { label: "Settings", icon: "settings", href: "/admin/settings" },
  { label: "Back to Store", icon: "storefront", href: "/" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-[272px] bg-surface-container-lowest border-r border-outline-variant/10 z-50">
      {/* Brand — fixed top */}
      <div className="px-6 pt-8 pb-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <span className="material-symbols-outlined">grid_view</span>
          </div>
          <div>
            <span className="font-bold text-lg text-on-surface tracking-tight block leading-tight">Creative Cube</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] opacity-60">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Nav — scrolls independently */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
        <p className="px-4 pt-4 pb-2 text-[10px] font-bold text-secondary uppercase tracking-[0.2em] opacity-40">Main Menu</p>

        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-primary text-white font-bold shadow-lg shadow-primary/20"
                  : "text-secondary hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${active ? "" : "opacity-60"}`}>
                {item.icon}
              </span>
              <span className="font-bold text-[11px] uppercase tracking-[0.15em]">
                {item.label}
              </span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </Link>
          );
        })}

        <div className="my-4 mx-4 border-t border-outline-variant/10" />

        <p className="px-4 pb-2 text-[10px] font-bold text-secondary uppercase tracking-[0.2em] opacity-40">System</p>

        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-surface-container hover:text-on-surface transition-all duration-200"
          >
            <span className="material-symbols-outlined text-xl opacity-60">{item.icon}</span>
            <span className="font-bold text-[11px] uppercase tracking-[0.15em]">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User card — fixed bottom */}
      <div className="p-4 border-t border-outline-variant/10">
        <div className="flex items-center gap-3 px-4 py-4 bg-surface-container/50 rounded-2xl border border-outline-variant/10">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-md">
            A
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-on-surface truncate">Admin User</span>
            <span className="text-[10px] text-secondary font-bold uppercase opacity-60 tracking-wider">Super Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
