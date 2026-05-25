import { getAllOrders } from "@/services/order.service";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const statusClasses: Record<string, string> = {
  SHIPPED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50",
  PENDING: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200/50 dark:border-orange-800/50",
  DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200/50 dark:border-green-800/50",
  PROCESSING: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200/50 dark:border-red-800/50",
};

export default async function OrdersPage() {
  const { orders } = await getAllOrders();

  return (
    <div className="space-y-6 md:space-y-10 animate-fade-in pb-24 md:pb-10 px-1 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold text-on-surface tracking-tight truncate">Order Management</h1>
          <p className="text-xs md:text-sm text-secondary font-medium mt-1">Track and manage all customer purchases.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-3 shrink-0">
          <select className="flex-1 sm:flex-none bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest cursor-pointer outline-none focus:ring-1 focus:ring-primary/30 shadow-sm">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-surface-container text-on-surface font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-all border border-outline-variant/10 shadow-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Stats Summary - Responsive 2x2 or 4x1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Orders", value: orders.length.toString(), color: "text-primary", icon: "receipt_long" },
          { label: "Pending", value: orders.filter(o => o.status === "PENDING").length.toString(), color: "text-orange-600", icon: "schedule" },
          { label: "Active Revenue", value: formatPrice(orders.reduce((sum, o) => sum + Number(o.total), 0)), color: "text-green-600", icon: "payments" },
          { label: "Avg. Ticket", value: formatPrice(orders.length > 0 ? (orders.reduce((sum, o) => sum + Number(o.total), 0) / orders.length) : 0), color: "text-blue-600", icon: "analytics" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-5 md:p-8 rounded-[28px] md:rounded-[32px] border border-outline-variant/5 shadow-premium">
            <div className="flex items-center gap-3 mb-3">
              <span className={`material-symbols-outlined ${s.color} text-xl`}>{s.icon}</span>
              <p className="text-[8px] md:text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 truncate">{s.label}</p>
            </div>
            <span className={`text-base md:text-2xl font-bold text-on-surface`}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Orders Container */}
      <div className="bg-surface-container-lowest rounded-[32px] shadow-premium border border-outline-variant/5 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-surface-container/50">
                {["Order ID", "Customer", "Items", "Amount", "Status", "Date", "Action"].map((h) => (
                  <th key={h} className="px-8 py-5 font-bold text-[9px] uppercase tracking-widest text-secondary opacity-60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-all group">
                  <td className="px-8 py-6 font-bold text-xs text-on-surface">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                        {order.user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs text-on-surface block truncate">{order.user.name}</span>
                        <span className="text-[10px] text-secondary truncate">{order.user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-secondary font-medium">{order.items.length} units</td>
                  <td className="px-8 py-6 font-bold text-xs text-primary">{formatPrice(Number(order.total))}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-widest shadow-sm ${statusClasses[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs text-secondary">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex w-10 h-10 items-center justify-center hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-secondary opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Substantial Card View */}
        <div className="md:hidden divide-y divide-outline-variant/5">
          {orders.map((order) => (
            <Link key={order.id} href={`/admin/orders/${order.id}`} className="block p-6 hover:bg-surface-container/30 transition-all active:bg-surface-container">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4 min-w-0">
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base border border-primary/10 shadow-sm shrink-0">
                    {order.user.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-on-surface truncate">{order.user.name}</p>
                    <p className="text-[11px] text-secondary opacity-60">Order #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-[10px] text-secondary mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-xl font-bold text-[8px] uppercase tracking-widest shadow-sm ${statusClasses[order.status]}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="bg-surface-container/40 rounded-3xl p-5 flex justify-between items-center border border-outline-variant/5">
                <div className="space-y-1">
                  <p className="text-[9px] text-secondary font-bold uppercase tracking-widest opacity-60">Grand Total</p>
                  <p className="font-bold text-lg text-primary">{formatPrice(Number(order.total))}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-secondary font-bold uppercase tracking-widest opacity-60">Items</p>
                  <p className="font-bold text-sm text-on-surface">{order.items.length} units</p>
                </div>
              </div>
              
              <div className="mt-5 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-base">visibility</span>
                View Order Details
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
