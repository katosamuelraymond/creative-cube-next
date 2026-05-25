import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export default async function CustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: {
      _count: { select: { orders: true } },
      orders: { select: { total: true } },
    },
    orderBy: { createdAt: "desc" },
  });

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
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-surface-container/50">
                {["Customer", "Orders", "Total Spent", "Joined"].map(h => (
                  <th key={h} className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-secondary opacity-60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {customers.map(c => {
                const totalSpent = c.orders.reduce((sum, o) => sum + Number(o.total), 0);
                return (
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
                    <td className="px-6 py-5 font-bold text-sm">{c._count.orders}</td>
                    <td className="px-6 py-5 font-bold text-sm text-primary">{formatPrice(totalSpent)}</td>
                    <td className="px-6 py-5 text-sm text-secondary">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
