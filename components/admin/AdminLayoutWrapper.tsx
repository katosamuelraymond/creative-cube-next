"use client";

import React from "react";
import { useAdmin } from "./AdminContext";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarCollapsed } = useAdmin();

  return (
    <div 
      className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? "md:ml-[72px]" : "md:ml-[260px]"
      }`}
    >
      {children}
    </div>
  );
}
