import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function AdminDashboard() {
  const [totalRevenue, activeOrders, totalCustomers, lowStockCount, recentOrders] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.count({ where: { status: { in: ["PENDING", "PROCESSING", "SHIPPED"] } } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.product.count({ where: { stock: { lte: 5 } } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { 
        user: { select: { name: true, email: true } },
        items: true
      },
    }),
  ]);

  // For profit tracking, we calculate Revenue - Cost of Goods Sold
  // This is a simplified calculation for the dashboard summary
  const revenue = Number(totalRevenue._sum.total || 0);
  const estimatedProfit = revenue * 0.42; // Placeholder: In a real app, we'd sum (price - costPrice) * quantity from order items

  const stats = [
    { label: "Total Revenue", value: formatPrice(revenue), trend: "+12.5%", icon: "payments", color: "text-primary" },
    { label: "Net Profit", value: formatPrice(estimatedProfit), trend: "+8.2%", icon: "trending_up", color: "text-green-600" },
    { label: "Active Orders", value: activeOrders.toString(), trend: "Current", icon: "local_shipping", color: "text-blue-600" },
    { label: "Inventory Alerts", value: `${lowStockCount} Items Low`, trend: "Action Needed", icon: "warning", color: "text-error" },
  ];

  return (
    <div className="space-y-6 md:space-y-10 animate-fade-in pb-24 md:pb-10 px-1 md:px-0">
      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6">
        <div className="min-w-0">
          <h2 className="text-xl md:text-3xl font-bold text-on-surface uppercase tracking-tight truncate">Dashboard</h2>
          <p className="text-xs md:text-sm text-secondary font-medium mt-1">Creative Cube store performance and profits.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-3 shrink-0">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-surface-container-highest text-on-surface font-bold text-[9px] md:text-[10px] uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-all border border-outline-variant/10 shadow-sm">
            <span className="material-symbols-outlined text-lg">ios_share</span>
            Export
          </button>
          <Link href="/admin/products/new" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-[9px] md:text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            New Product
          </Link>
        </div>
      </header>

      {/* Stats Grid - Fixed 2x2 on mobile, 4 in row on large */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-surface-container-lowest p-4 md:p-8 rounded-[24px] md:rounded-[32px] shadow-premium hover:shadow-hover-premium transition-all duration-300 border border-outline-variant/5 group ${stat.label === "Inventory Alerts" && lowStockCount > 0 ? "bg-error-container/10 border-error/20" : ""}`}>
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center shadow-inner ${stat.label === "Inventory Alerts" && lowStockCount > 0 ? "bg-error text-white" : "bg-surface-container"}`}>
                <span className={`material-symbols-outlined ${stat.label === "Inventory Alerts" && lowStockCount > 0 ? "" : stat.color} text-base md:text-2xl`}>{stat.icon}</span>
              </div>
              <span className={`hidden xs:inline-block font-bold text-[7px] md:text-[9px] uppercase tracking-widest px-2 py-0.5 md:px-2.5 md:py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-surface-container text-secondary'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[8px] md:text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 truncate">{stat.label}</p>
            <h3 className={`text-sm md:text-2xl font-bold mt-1 md:mt-2 ${stat.label === "Inventory Alerts" && lowStockCount > 0 ? "text-error" : "text-on-surface"}`}>{stat.value}</h3>
          </div>
        ))}
      </section>

      {/* Recent Orders Section */}
      <section className="bg-surface-container-lowest rounded-[28px] md:rounded-[32px] shadow-premium border border-outline-variant/5 overflow-hidden">
        <div className="px-6 md:px-8 py-5 md:py-6 border-b border-outline-variant/10 flex items-center justify-between">
          <h4 className="font-bold uppercase tracking-wider text-xs md:text-sm">Recent Activity</h4>
          <Link href="/admin/orders" className="text-primary font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:underline">View All</Link>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-surface-container/50">
                {["Order ID", "Customer", "Amount", "Status", "Date", "Action"].map(h => (
                  <th key={h} className="px-8 py-4 font-bold text-[9px] uppercase tracking-[0.2em] text-secondary opacity-60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container/30 transition-all group">
                  <td className="px-8 py-5 font-bold text-xs text-on-surface">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] border border-primary/10">
                        {order.user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs text-on-surface">{order.user.name}</span>
                        <span className="text-[10px] text-secondary opacity-60">{order.user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-xs text-primary">{formatPrice(Number(order.total))}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg bg-surface-container font-bold text-[9px] uppercase tracking-widest shadow-sm ${
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' : 
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-xs text-secondary">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-5">
                    <Link href={`/admin/orders/${order.id}`} className="w-9 h-9 flex items-center justify-center hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-secondary opacity-40 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Substantial Card View */}
        <div className="md:hidden divide-y divide-outline-variant/5">
          {recentOrders.map((order) => (
            <Link key={order.id} href={`/admin/orders/${order.id}`} className="block p-6 hover:bg-surface-container/30 transition-all active:bg-surface-container">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/10 shadow-sm">
                    {order.user.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-on-surface truncate">{order.user.name}</p>
                    <p className="text-[11px] text-secondary opacity-60">Order #{order.id.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-surface-container font-bold text-[9px] uppercase tracking-[0.15em] shadow-sm">
                  {order.status}
                </span>
              </div>
              <div className="bg-surface-container/40 rounded-2xl p-4 flex justify-between items-center border border-outline-variant/5">
                <div className="space-y-1">
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-widest opacity-60">Revenue</p>
                  <p className="font-bold text-base text-primary">{formatPrice(Number(order.total))}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-widest opacity-60">Items</p>
                  <p className="font-bold text-sm text-on-surface">{order.items.length} units</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-[0.2em] opacity-40">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
