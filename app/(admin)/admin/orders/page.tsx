import Link from "next/link";

const orders = [
  { id: "#ORD-2849", customer: "Eleanor Kade", email: "eleanor@email.com", items: 3, amount: "$1,250.00", status: "Shipped", date: "2024-12-18" },
  { id: "#ORD-2850", customer: "Julian Moore", email: "julian@email.com", items: 1, amount: "$840.00", status: "Pending", date: "2024-12-17" },
  { id: "#ORD-2851", customer: "Sarah Thompson", email: "sarah@email.com", items: 2, amount: "$560.00", status: "Delivered", date: "2024-12-16" },
  { id: "#ORD-2852", customer: "Liam Baker", email: "liam@email.com", items: 1, amount: "$420.00", status: "Processing", date: "2024-12-15" },
  { id: "#ORD-2853", customer: "Maya Chen", email: "maya@email.com", items: 4, amount: "$2,100.00", status: "Shipped", date: "2024-12-14" },
  { id: "#ORD-2854", customer: "David Park", email: "david@email.com", items: 2, amount: "$990.00", status: "Cancelled", date: "2024-12-13" },
];

const statusClasses: Record<string, string> = {
  Shipped: "bg-blue-100 text-blue-700",
  Pending: "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-purple-100 text-purple-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Order Management</h1>
          <p className="text-sm text-secondary font-medium mt-1">Track and manage all customer orders</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-[11px] cursor-pointer">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container text-on-surface font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-all border border-outline-variant/10">
            <span className="material-symbols-outlined text-lg">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "2,854", icon: "receipt_long", color: "text-primary" },
          { label: "Pending", value: "12", icon: "schedule", color: "text-orange-600" },
          { label: "Shipped", value: "28", icon: "local_shipping", color: "text-blue-600" },
          { label: "Revenue", value: "$128K", icon: "payments", color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/5 shadow-premium">
            <div className="flex items-center gap-3 mb-3">
              <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60">{s.label}</span>
            </div>
            <span className="text-xl font-bold text-on-surface">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-surface-container-lowest rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container/50">
                {["Order ID", "Customer", "Items", "Amount", "Status", "Date", ""].map((h) => (
                  <th key={h} className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-secondary opacity-60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-all group">
                  <td className="px-6 py-5 font-bold text-sm text-on-surface">{order.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {order.customer.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-on-surface block">{order.customer}</span>
                        <span className="text-[11px] text-secondary">{order.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-secondary font-medium">{order.items}</td>
                  <td className="px-6 py-5 font-bold text-sm text-primary">{order.amount}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest ${statusClasses[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-secondary">{order.date}</td>
                  <td className="px-6 py-5">
                    <button className="w-9 h-9 flex items-center justify-center hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-secondary opacity-0 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
