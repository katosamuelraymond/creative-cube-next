"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "./AdminContext";

const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/admin" },
  { label: "Orders", icon: "shopping_bag", href: "/admin/orders" },
  { label: "Products", icon: "inventory_2", href: "/admin/products" },
  { label: "Categories", icon: "category", href: "/admin/categories" },
  { label: "Customers", icon: "group", href: "/admin/customers" },
  { label: "Profile", icon: "person", href: "/admin/profile" },
  { label: "Settings", icon: "settings", href: "/admin/settings" },
];

const bottomItems = [
  { label: "Back to Store", icon: "storefront", href: "/" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar, isMobileSidebarOpen, setMobileSidebarOpen } = useAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  // Prevent hydration mismatch by rendering a skeleton or a stable version initially
  if (!mounted) return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 bg-surface-container-lowest border-r border-outline-variant/10 z-[70] w-[260px]" />
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-all duration-300 animate-fade-in"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside 
        className={`fixed left-0 top-0 bottom-0 bg-surface-container-lowest border-r border-outline-variant/10 z-[70] transition-all duration-300 ease-in-out shadow-2xl md:shadow-none ${
          isMobileSidebarOpen ? "translate-x-0 w-[280px]" : "-translate-x-full md:translate-x-0"
        } ${
          isSidebarCollapsed ? "md:w-[72px]" : "md:w-[260px]"
        }`}
      >
        {/* Brand & Toggle */}
        <div className={`px-4 pt-8 pb-6 flex items-center ${isSidebarCollapsed ? "md:justify-center" : "justify-between"}`}>
          <Link href="/" onClick={() => setMobileSidebarOpen(false)} className={`flex items-center gap-3 group overflow-hidden whitespace-nowrap ${(isSidebarCollapsed && !isMobileSidebarOpen) ? "md:hidden" : ""}`}>
            <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
              <span className="material-symbols-outlined text-xl">grid_view</span>
            </div>
            <div className="animate-fade-in min-w-0">
              <span className="font-bold text-base text-on-surface tracking-tight block leading-tight truncate">Creative Cube</span>
              <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.15em] opacity-60">Admin Panel</span>
            </div>
          </Link>
          
          {(isSidebarCollapsed && !isMobileSidebarOpen) && (
            <div className="hidden md:flex w-9 h-9 bg-primary text-white rounded-xl items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-xl">grid_view</span>
            </div>
          )}

          {/* Mobile Close Button */}
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden w-8 h-8 rounded-lg hover:bg-surface-container text-secondary flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar no-scrollbar">
          {(!isSidebarCollapsed || isMobileSidebarOpen) && (
            <p className="px-3 pt-4 pb-2 text-[9px] font-bold text-secondary uppercase tracking-[0.2em] opacity-40 whitespace-nowrap">Main Menu</p>
          )}

          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-primary text-white font-bold shadow-lg shadow-primary/20"
                    : "text-secondary hover:bg-surface-container hover:text-on-surface"
                } ${(isSidebarCollapsed && !isMobileSidebarOpen) ? "md:justify-center" : ""}`}
                title={(isSidebarCollapsed && !isMobileSidebarOpen) ? item.label : ""}
              >
                <span className={`material-symbols-outlined text-lg ${active ? "" : "opacity-60"}`}>
                  {item.icon}
                </span>
                {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                  <span className="font-bold text-[10px] uppercase tracking-[0.1em] whitespace-nowrap animate-fade-in truncate">
                    {item.label}
                  </span>
                )}
                {active && (!isSidebarCollapsed || isMobileSidebarOpen) && (
                  <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                )}
              </Link>
            );
          })}

          <div className="my-4 mx-3 border-t border-outline-variant/10" />

          {(!isSidebarCollapsed || isMobileSidebarOpen) && (
            <p className="px-3 pb-2 text-[9px] font-bold text-secondary uppercase tracking-[0.2em] opacity-40 whitespace-nowrap">System</p>
          )}

          {bottomItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary hover:bg-surface-container hover:text-on-surface transition-all duration-200 ${(isSidebarCollapsed && !isMobileSidebarOpen) ? "md:justify-center" : ""}`}
              title={(isSidebarCollapsed && !isMobileSidebarOpen) ? item.label : ""}
            >
              <span className="material-symbols-outlined text-lg opacity-60">{item.icon}</span>
              {(!isSidebarCollapsed || isMobileSidebarOpen) && (
                <span className="font-bold text-[10px] uppercase tracking-[0.1em] whitespace-nowrap animate-fade-in truncate">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Toggle button bottom */}
        <div className="hidden md:flex p-3 justify-center">
          <button 
            onClick={toggleSidebar}
            className="w-9 h-9 rounded-xl bg-surface-container border border-outline-variant/10 text-secondary hover:text-primary hover:border-primary transition-all flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg transition-transform duration-300" style={{ transform: isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              side_navigation_last
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
