"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAdmin } from "./AdminContext";
import { logout } from "@/app/actions/auth";

export function AdminHeader() {
  const { toggleSidebar, toggleMobileSidebar } = useAdmin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotifyOpen, setNotifyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) {
        setNotifyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Automatic Search with Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery !== (searchParams.get("search") || "")) {
        if (searchQuery.trim()) {
          router.push(`/admin/products?search=${encodeURIComponent(searchQuery)}`);
        } else if (searchParams.get("search")) {
          router.push(`/admin/products`);
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams]);

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 px-4 md:px-10 py-3 md:py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4 flex-1">
          <button 
            onClick={() => {
              if (window.innerWidth < 768) {
                toggleMobileSidebar();
              } else {
                toggleSidebar();
              }
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-all text-secondary shrink-0"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          
          <div className="flex-1 max-w-md">
            <div className="flex items-center bg-surface-container border border-outline-variant/20 rounded-2xl px-3 md:px-4 py-2 md:py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <span className="material-symbols-outlined text-secondary/40 mr-2 md:mr-3 text-lg">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-xs md:text-sm w-full outline-none placeholder:text-secondary/40 font-medium"
                placeholder="Search products..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3 shrink-0">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifyRef}>
            <button 
              onClick={() => setNotifyOpen(!isNotifyOpen)}
              className={`relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-all text-secondary ${isNotifyOpen ? "bg-surface-container text-primary" : ""}`}
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface-container-lowest" />
            </button>

            {isNotifyOpen && (
              <div className="absolute right-0 mt-3 w-72 md:w-80 bg-surface-container-lowest rounded-3xl shadow-premium border border-outline-variant/10 p-4 animate-scale-in origin-top-right z-50 overflow-hidden">
                <div className="flex items-center justify-between mb-4 px-2 pt-2">
                  <h3 className="font-bold text-xs uppercase tracking-widest text-on-surface">Notifications</h3>
                  <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">Mark all</span>
                </div>
                <div className="space-y-1">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-2xl hover:bg-surface-container transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-lg">shopping_cart</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-on-surface leading-tight">New Order</p>
                        <p className="text-[10px] text-secondary truncate mt-1">Order #ORD-7729 just arrived.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ThemeToggle className="w-9 h-9 md:w-10 md:h-10" />

          <div className="hidden sm:block w-px h-6 bg-outline-variant/20 mx-1" />

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-2 md:gap-3 p-1 rounded-2xl hover:bg-surface-container transition-all ${isProfileOpen ? "bg-surface-container" : ""}`}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md overflow-hidden">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="hidden lg:flex flex-col text-left pr-2">
                <span className="text-xs font-bold text-on-surface leading-tight">Administrator</span>
                <span className="text-[9px] font-bold text-secondary uppercase tracking-widest opacity-60">Super Admin</span>
              </div>
              <span className={`material-symbols-outlined text-secondary text-sm transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}>
                expand_more
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 md:w-64 bg-surface-container-lowest rounded-3xl shadow-premium border border-outline-variant/10 p-2 animate-scale-in origin-top-right z-50">
                <div className="p-4 border-b border-outline-variant/5 mb-2">
                  <p className="text-xs font-bold text-on-surface leading-tight truncate">Administrator</p>
                  <p className="text-[10px] text-secondary font-medium truncate">admin@creativecube.com</p>
                </div>
                <div className="space-y-1">
                  <Link href="/admin/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container transition-all group">
                    <span className="material-symbols-outlined text-secondary text-lg group-hover:text-primary">person</span>
                    <span className="text-xs font-bold text-secondary group-hover:text-on-surface">My Profile</span>
                  </Link>
                  <Link href="/admin/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container transition-all group">
                    <span className="material-symbols-outlined text-secondary text-lg group-hover:text-primary">settings</span>
                    <span className="text-xs font-bold text-secondary group-hover:text-on-surface">Settings</span>
                  </Link>
                  <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container transition-all group">
                    <span className="material-symbols-outlined text-secondary text-lg group-hover:text-primary">storefront</span>
                    <span className="text-xs font-bold text-secondary group-hover:text-on-surface">View Store</span>
                  </Link>
                </div>
                <div className="mt-2 pt-2 border-t border-outline-variant/5">
                  <form action={logout}>
                    <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-error/10 text-error transition-all group">
                      <span className="material-symbols-outlined text-lg">logout</span>
                      <span className="text-xs font-bold">Sign Out</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
