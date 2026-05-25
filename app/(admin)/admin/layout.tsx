import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminProvider } from "@/components/admin/AdminContext";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import Link from "next/link";

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
    <AdminProvider>
      <div className="flex min-h-screen bg-surface overflow-x-hidden">
        <AdminSidebar />
        <AdminLayoutWrapper>
          <AdminHeader />
          <main className="flex-1 p-2 sm:p-4 md:p-10 pb-28 md:pb-10 animate-fade-in max-w-full overflow-x-hidden">
            <div className="max-w-[1600px] mx-auto w-full px-1 sm:px-0">
              {children}
            </div>
          </main>
        </AdminLayoutWrapper>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-outline-variant/10 flex justify-around py-3 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
          {[
            { label: "Home", icon: "dashboard", href: "/admin" },
            { label: "Orders", icon: "shopping_bag", href: "/admin/orders" },
            { label: "Products", icon: "inventory_2", href: "/admin/products" },
            { label: "Profile", icon: "person", href: "/admin/profile" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 text-secondary hover:text-primary transition-all active:scale-90">
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </AdminProvider>
  );
}
