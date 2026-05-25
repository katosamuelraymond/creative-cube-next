import { notFound } from "next/navigation";
import { getOrderById } from "@/services/order.service";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

const statusClasses: Record<string, string> = {
  SHIPPED: "bg-blue-100 text-blue-700",
  PENDING: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-on-surface tracking-tight">Order Details</h1>
            <span className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest ${statusClasses[order.status]}`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-secondary font-medium">#{order.id.toUpperCase()}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-surface-container text-secondary font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-outline-variant/10 transition-all border border-outline-variant/10">
            Cancel Order
          </button>
          <button className="px-6 py-3 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10">
              <h3 className="font-bold text-on-surface">Ordered Items</h3>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-surface-container overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200"} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-on-surface mb-1">{item.product.name}</h4>
                    <p className="text-sm text-secondary font-medium">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-on-surface">{formatPrice(Number(item.price))}</p>
                    <p className="text-sm text-secondary font-medium">Total: {formatPrice(Number(item.price) * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-surface-container/30 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-secondary font-medium">Subtotal</span>
                <span className="font-bold text-on-surface">{formatPrice(Number(order.total))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary font-medium">Shipping</span>
                <span className="font-bold text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-outline-variant/10">
                <span className="font-bold text-on-surface uppercase tracking-widest text-xs">Total</span>
                <span className="font-bold text-primary text-xl">{formatPrice(Number(order.total))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-premium border border-outline-variant/5 space-y-6">
            <div>
              <h3 className="font-bold text-on-surface mb-4">Customer Info</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {order.user.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-bold text-on-surface">{order.user.name}</p>
                  <p className="text-xs text-secondary">{order.user.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/10">
              <h3 className="font-bold text-on-surface mb-4">Shipping Address</h3>
              <div className="space-y-1">
                <p className="text-sm text-secondary font-medium">{order.address}</p>
                <p className="text-sm text-secondary font-medium">{order.city}, {order.postalCode}</p>
                <p className="text-sm text-secondary font-medium">{order.country}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/10">
              <h3 className="font-bold text-on-surface mb-4">Payment Info</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary font-medium">Method</span>
                <span className="font-bold text-on-surface text-sm">{order.payment?.method || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-secondary font-medium">Status</span>
                <span className="text-xs font-bold text-green-600">{order.payment?.status || "PENDING"}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-premium border border-outline-variant/5">
            <h3 className="font-bold text-on-surface mb-4">Order Notes</h3>
            <p className="text-sm text-secondary font-medium italic">
              {order.notes || "No special instructions provided for this order."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
