import Link from "next/link";

const stats = [
  { label: "Total Revenue", value: "$128,430.00", trend: "+12.5%", icon: "payments", color: "text-primary" },
  { label: "Active Orders", value: "42", trend: "Current", icon: "local_shipping", color: "text-blue-600" },
  { label: "New Customers", value: "1,284", trend: "+8%", icon: "person_add", color: "text-purple-600" },
  { label: "Inventory Alerts", value: "7 Items Low", trend: "Action Needed", icon: "warning", color: "text-error" },
];

const recentOrders = [
  { id: "#ORD-2849", customer: "Eleanor Kade", product: "Mid-Century Oak Desk", amount: "$1,250.00", status: "Shipped" },
  { id: "#ORD-2850", customer: "Julian Moore", product: "Velvet Lounge Chair", amount: "$840.00", status: "Pending" },
  { id: "#ORD-2851", customer: "Sarah Thompson", product: "Marble Coffee Table", amount: "$560.00", status: "Shipped" },
  { id: "#ORD-2852", customer: "Liam Baker", product: "Minimalist Bookshelf", amount: "$420.00", status: "Pending" },
];

export default function AdminDashboard() {
  return (
    <main className="p-margin-mobile md:p-margin-desktop space-y-10 animate-fade-in-up">
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface uppercase tracking-tight">Admin Dashboard</h2>
          <p className="font-body-md text-secondary font-medium">Welcome back, Administrator. Monitoring Creative Cube analytics.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-highest text-on-surface font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-all border border-outline-variant/10 shadow-sm">
            <span className="material-symbols-outlined text-xl">ios_share</span>
            Export
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-xl">add</span>
            New Product
          </button>
        </div>
      </header>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-surface-container-lowest p-8 rounded-[32px] shadow-premium hover:shadow-hover-premium transition-all duration-300 border border-outline-variant/5 group ${stat.label === "Inventory Alerts" ? "bg-error-container/20 border-error/10" : ""}`}>
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${stat.label === "Inventory Alerts" ? "bg-white" : "bg-surface-container-low"}`}>
                <span className={`material-symbols-outlined ${stat.color} text-2xl`}>{stat.icon}</span>
              </div>
              <span className={`font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-surface-container text-secondary'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="font-label-md text-xs font-bold text-secondary uppercase tracking-widest opacity-60">{stat.label}</p>
            <h3 className={`font-headline-md text-2xl font-bold mt-2 ${stat.label === "Inventory Alerts" ? "text-error" : "text-on-surface"}`}>{stat.value}</h3>
          </div>
        ))}
      </section>

      {/* Charts & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest p-10 rounded-[40px] shadow-premium border border-outline-variant/5">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="font-headline-md text-xl font-bold uppercase tracking-wider">Monthly Sales Growth</h4>
              <p className="font-body-sm text-secondary font-medium">Performance tracking for 2024</p>
            </div>
            <select className="bg-surface-container-low border-none font-bold text-[10px] uppercase tracking-widest rounded-xl focus:ring-primary px-4 py-2 cursor-pointer shadow-inner">
              <option>Last 12 Months</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="relative h-[300px] w-full bg-surface-container-low/50 rounded-3xl overflow-hidden flex items-end px-8 py-10 shadow-inner border border-outline-variant/10">
            <div className="flex items-end justify-between w-full h-full gap-4">
              {[40, 55, 45, 70, 60, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                   <div className="w-full bg-primary/10 rounded-xl transition-all hover:bg-primary/40 group-hover:shadow-lg" style={{ height: `${h}%` }}>
                      {h === 100 && <div className="w-full h-full bg-primary rounded-xl"></div>}
                   </div>
                   <span className="text-[10px] font-bold text-secondary opacity-40 uppercase">M{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-10 rounded-[40px] shadow-premium border border-outline-variant/5 flex flex-col">
          <h4 className="font-headline-md text-xl font-bold uppercase tracking-wider mb-10">Top Categories</h4>
          <div className="space-y-8 flex-1">
            {[
              { label: "Sofas", val: 42, color: "bg-primary" },
              { label: "Office", val: 28, color: "bg-blue-600" },
              { label: "Dining", val: 15, color: "bg-purple-600" },
              { label: "Bedroom", val: 15, color: "bg-orange-400" },
            ].map(cat => (
              <div key={cat.label} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm uppercase tracking-widest text-on-surface">{cat.label}</span>
                  <span className="font-bold text-xs text-secondary">{cat.val}%</span>
                </div>
                <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden shadow-inner border border-outline-variant/10">
                  <div className={`h-full ${cat.color} transition-all duration-1000 shadow-lg shadow-primary/10`} style={{ width: `${cat.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <section className="bg-surface-container-lowest rounded-[40px] shadow-premium border border-outline-variant/5 overflow-hidden">
        <div className="px-10 py-8 border-b border-outline-variant/10 flex items-center justify-between">
          <h4 className="font-headline-md text-xl font-bold uppercase tracking-wider">Recent Orders</h4>
          <button className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                {["Order ID", "Customer", "Product", "Amount", "Status", "Action"].map(h => (
                  <th key={h} className="px-10 py-5 font-bold text-[10px] uppercase tracking-widest text-secondary opacity-60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low transition-all group cursor-pointer">
                  <td className="px-10 py-6 font-bold text-sm text-on-surface">{order.id}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 shadow-sm">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-sm text-on-surface">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 font-medium text-sm text-secondary">{order.product}</td>
                  <td className="px-10 py-6 font-bold text-sm text-primary">{order.amount}</td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-sm ${
                      order.status === 'Shipped' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-primary/10 hover:text-primary rounded-2xl transition-all text-secondary opacity-40 group-hover:opacity-100">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
