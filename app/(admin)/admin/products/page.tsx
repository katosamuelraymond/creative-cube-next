import Link from "next/link";

const products = [
  { id: 1, name: "Aria Accent Chair", category: "Chairs", price: "$849.99", stock: 15, status: "Active", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=100" },
  { id: 2, name: "Ember Dining Table", category: "Tables", price: "$2,199.99", stock: 8, status: "Active", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100" },
  { id: 3, name: "Cloud Platform Bed", category: "Beds", price: "$1,899.99", stock: 3, status: "Low Stock", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=100" },
  { id: 4, name: "Haven 3-Seat Sofa", category: "Sofas", price: "$2,999.99", stock: 7, status: "Active", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100" },
  { id: 5, name: "Marble Coffee Table", category: "Tables", price: "$1,299.99", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=100" },
  { id: 6, name: "Japandi Sideboard", category: "Cabinets", price: "$1,149.99", stock: 18, status: "Active", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100" },
];

const statusClasses: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Low Stock": "bg-orange-100 text-orange-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

export default function ProductsPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Product Catalog</h1>
          <p className="text-sm text-secondary font-medium mt-1">Manage your furniture inventory</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Product
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-surface-container-lowest rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden hover:shadow-hover-premium transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-md ${statusClasses[product.status]}`}>
                {product.status}
              </span>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 mb-1">{product.category}</p>
              <h3 className="font-bold text-on-surface text-lg mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary text-lg">{product.price}</span>
                <span className={`text-sm font-bold ${product.stock === 0 ? "text-error" : product.stock <= 5 ? "text-orange-600" : "text-secondary"}`}>
                  {product.stock} in stock
                </span>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-outline-variant/10">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-container hover:bg-primary/10 hover:text-primary transition-all text-sm font-bold text-secondary">
                  <span className="material-symbols-outlined text-lg">edit</span> Edit
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-error/10 hover:text-error transition-all text-secondary">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
