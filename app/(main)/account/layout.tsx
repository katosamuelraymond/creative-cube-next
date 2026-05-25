import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const navItems = [
    { label: "Dashboard", href: "/account", icon: "dashboard" },
    { label: "My Orders", href: "/account/orders", icon: "shopping_bag" },
    { label: "Saved Addresses", href: "/account/addresses", icon: "location_on" },
    { label: "Profile Settings", href: "/account/profile", icon: "person" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-on-surface">My Account</h2>
            <p className="text-sm text-secondary font-medium mt-1">Manage your experience</p>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container transition-all group"
              >
                <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">
                  {item.icon}
                </span>
                <span className="text-sm font-bold text-secondary group-hover:text-on-surface transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-error/5 transition-all group mt-8">
              <span className="material-symbols-outlined text-secondary group-hover:text-error transition-colors">
                logout
              </span>
              <span className="text-sm font-bold text-secondary group-hover:text-error transition-colors">
                Sign Out
              </span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
