import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function AccountDashboard() {
  const session = await getSession();
  const user = await prisma.user.findUnique({
    where: { id: session?.userId },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 3,
        include: { items: { include: { product: true } } },
      },
      addresses: { where: { isDefault: true }, take: 1 },
    },
  });

  if (!user) return null;

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/5 shadow-premium">
        <h2 className="text-xl font-bold text-on-surface mb-2">Welcome back, {user.name}!</h2>
        <p className="text-sm text-secondary font-medium">From your account dashboard, you can easily check your recent orders, manage your shipping addresses, and edit your profile details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Orders Summary */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/5 shadow-premium">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs">Recent Orders</h3>
            <Link href="/account/orders" className="text-xs font-bold text-primary hover:underline">View All</Link>
          </div>
          {user.orders.length > 0 ? (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div key={order.id} className="flex justify-between items-center py-3 border-b border-outline-variant/5 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-on-surface">Order #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-[11px] text-secondary">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{formatPrice(Number(order.total))}</p>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-secondary font-medium italic">You haven't placed any orders yet.</p>
          )}
        </div>

        {/* Default Address */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/5 shadow-premium">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs">Primary Address</h3>
            <Link href="/account/addresses" className="text-xs font-bold text-primary hover:underline">Manage</Link>
          </div>
          {user.addresses[0] ? (
            <div className="space-y-1">
              <p className="text-sm font-bold text-on-surface mb-2">Default Shipping</p>
              <p className="text-sm text-secondary font-medium">{user.addresses[0].street}</p>
              <p className="text-sm text-secondary font-medium">{user.addresses[0].city}, {user.addresses[0].postalCode}</p>
              <p className="text-sm text-secondary font-medium">{user.addresses[0].country}</p>
            </div>
          ) : (
            <p className="text-sm text-secondary font-medium italic">No default address set.</p>
          )}
        </div>
      </div>
    </div>
  );
}
