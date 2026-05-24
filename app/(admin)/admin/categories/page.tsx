const categories = [
  { id: 1, name: "Chairs", slug: "chairs", products: 24, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200" },
  { id: 2, name: "Tables", slug: "tables", products: 18, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200" },
  { id: 3, name: "Beds", slug: "beds", products: 12, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=200" },
  { id: 4, name: "Sofas", slug: "sofas", products: 15, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200" },
  { id: 5, name: "Cabinets", slug: "cabinets", products: 9, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200" },
];

export default function CategoriesPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Categories</h1>
          <p className="text-sm text-secondary font-medium mt-1">Organize your product catalog</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-lg">add</span>
          New Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-surface-container-lowest rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden hover:shadow-hover-premium transition-all duration-300 group">
            <div className="relative h-40 overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <h3 className="text-white font-bold text-xl">{cat.name}</h3>
                <p className="text-white/70 text-sm font-medium">{cat.products} products</p>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between">
              <span className="text-sm font-bold text-secondary">/{cat.slug}</span>
              <div className="flex gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-secondary">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-error/10 hover:text-error transition-all text-secondary">
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
