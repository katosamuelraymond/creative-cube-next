const customers = [
  { id: 1, name: "Eleanor Kade", email: "eleanor@email.com", orders: 12, spent: "$4,280", joined: "2024-03-15", status: "Active" },
  { id: 2, name: "Julian Moore", email: "julian@email.com", orders: 8, spent: "$2,940", joined: "2024-05-22", status: "Active" },
  { id: 3, name: "Sarah Thompson", email: "sarah@email.com", orders: 15, spent: "$6,120", joined: "2024-01-08", status: "VIP" },
  { id: 4, name: "Liam Baker", email: "liam@email.com", orders: 3, spent: "$890", joined: "2024-09-10", status: "Active" },
  { id: 5, name: "Maya Chen", email: "maya@email.com", orders: 21, spent: "$8,450", joined: "2023-11-20", status: "VIP" },
];

const statusClasses: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  VIP: "bg-purple-100 text-purple-700",
};

export default function CustomersPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Customers</h1>
          <p className="text-sm text-secondary font-medium mt-1">Manage your customer base</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container/50">
                {["Customer", "Orders", "Spent", "Status", "Joined"].map(h => (
                  <th key={h} className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-secondary opacity-60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-surface-container-low/50 transition-all">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {c.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-on-surface block">{c.name}</span>
                        <span className="text-[11px] text-secondary">{c.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold text-sm">{c.orders}</td>
                  <td className="px-6 py-5 font-bold text-sm text-primary">{c.spent}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest ${statusClasses[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-6 py-5 text-sm text-secondary">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
