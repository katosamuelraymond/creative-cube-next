import { getSession } from "@/lib/session";
import { getOrdersByUser } from "@/services/order.service";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const statusClasses: Record<string, string> = {
  SHIPPED: "bg-blue-100 text-blue-700",
  PENDING: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function OrderHistoryPage() {
  const session = await getSession();
  const orders = await getOrdersByUser(session?.userId as string);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Order History</h1>
        <p className="text-sm text-secondary font-medium mt-1">Track and manage your recent purchases</p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/5 shadow-premium">
              <div className="p-6 bg-surface-container/30 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 mb-1">Order Placed</p>
                    <p className="text-sm font-bold text-on-surface">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 mb-1">Total Amount</p>
                    <p className="text-sm font-bold text-on-surface">{formatPrice(Number(order.total))}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 mb-1">Order ID</p>
                    <p className="text-sm font-bold text-on-surface">#{order.id.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest ${statusClasses[order.status]}`}>
                    {order.status}
                  </span>
                  <Link 
                    href={`/account/orders/${order.id}`}
                    className="text-xs font-bold text-primary hover:underline px-4 py-2 bg-white rounded-lg border border-outline-variant/10 shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden flex-shrink-0 border border-outline-variant/5">
                      <img 
                        src={item.product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100"} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-lowest p-12 rounded-3xl border border-dashed border-outline-variant/20 text-center">
          <span className="material-symbols-outlined text-5xl text-secondary opacity-20 mb-4">shopping_cart</span>
          <h3 className="text-lg font-bold text-on-surface mb-2">No orders found</h3>
          <p className="text-sm text-secondary font-medium mb-8">You haven't placed any orders yet. Start shopping to fill your history!</p>
          <Link 
            href="/products"
            className="px-8 py-3 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all inline-block"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
