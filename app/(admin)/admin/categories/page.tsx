import Link from "next/link";
import { getCategories } from "@/services/category.service";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in pb-24 md:pb-10 px-1 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="min-w-0 w-full">
          <h1 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight truncate">Categories</h1>
          <p className="text-xs md:text-sm text-secondary font-medium mt-1 truncate">Organize your product catalog</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          New Category
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-surface-container-lowest rounded-[32px] shadow-premium border border-outline-variant/5 overflow-hidden hover:shadow-hover-premium transition-all duration-500 group flex flex-col h-full">
            <div className="relative aspect-[16/7] sm:aspect-[16/9] overflow-hidden">
              <img 
                src={cat.imageUrl || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 md:bottom-6 left-5 md:left-6 right-5 md:right-6">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1 line-clamp-1">{cat.name}</h3>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                   <p className="text-white/70 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{cat._count.products} Products</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6 flex items-center justify-between mt-auto">
              <span className="text-[9px] md:text-[10px] font-bold text-secondary uppercase tracking-[0.2em] opacity-40 truncate pr-2">/{cat.slug}</span>
              <div className="flex gap-2 shrink-0">
                <Link 
                  href={`/admin/categories/${cat.id}`}
                  className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-surface-container hover:bg-primary/10 hover:text-primary transition-all text-secondary"
                  title="Edit Category"
                >
                  <span className="material-symbols-outlined text-lg md:text-xl">edit</span>
                </Link>
                <button 
                  className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-error/5 text-error hover:bg-error hover:text-white transition-all border border-error/10"
                  title="Delete Category"
                >
                  <span className="material-symbols-outlined text-lg md:text-xl">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
