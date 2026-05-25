import Link from "next/link";
import { getProducts } from "@/services/product.service";
import { formatPrice } from "@/lib/utils";
import { AddStockButton } from "@/components/admin/AddStockButton";
import { deleteProductAction } from "@/app/actions/admin";

const statusClasses: Record<string, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Low Stock": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface ProductsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { search } = await searchParams;
  const { products } = await getProducts({ 
    limit: 100, 
    search: search 
  });

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in pb-24 md:pb-10 px-1 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="min-w-0 w-full">
          <h1 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight truncate">Product Catalog</h1>
          {search ? (
            <p className="text-xs md:text-sm text-secondary font-medium mt-1 truncate">Showing results for "{search}"</p>
          ) : (
            <p className="text-xs md:text-sm text-secondary font-medium mt-1">Manage your furniture inventory</p>
          )}
        </div>
        <Link
          href="/admin/products/new"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-surface-container-lowest p-10 md:p-20 rounded-[32px] border border-dashed border-outline-variant/20 text-center">
          <span className="material-symbols-outlined text-5xl text-secondary opacity-20 mb-4">search_off</span>
          <h3 className="text-lg font-bold text-on-surface">No products found</h3>
          <p className="text-xs text-secondary font-medium mt-2 mb-8 max-w-xs mx-auto">Try adjusting your search query or add a new item.</p>
          <Link href="/admin/products" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">Clear Search</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => {
            const status = product.stock === 0 ? "Out of Stock" : product.stock <= 5 ? "Low Stock" : "Active";
            
            return (
              <div key={product.id} className="bg-surface-container-lowest rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden hover:shadow-hover-premium transition-all duration-500 group flex flex-col h-full">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1.5 rounded-lg font-bold text-[8px] md:text-[9px] uppercase tracking-widest shadow-lg backdrop-blur-md ${statusClasses[status]}`}>
                    {status}
                  </span>
                </div>
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{product.category.name}</p>
                    <span className="text-[9px] font-bold text-secondary/30">#{product.id.slice(-4).toUpperCase()}</span>
                  </div>
                  <h3 className="font-bold text-on-surface text-base mb-4 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  
                  <div className="flex items-center justify-between mt-auto bg-surface-container/30 p-3 md:p-4 rounded-2xl border border-outline-variant/5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[8px] font-bold text-secondary uppercase tracking-widest opacity-60">Price</span>
                      <span className="font-bold text-on-surface text-sm md:text-base">{formatPrice(Number(product.price))}</span>
                    </div>
                    <div className="flex flex-col text-right min-w-0">
                      <span className="text-[8px] font-bold text-secondary uppercase tracking-widest opacity-60">Stock</span>
                      <span className={`font-bold text-sm md:text-base ${product.stock === 0 ? "text-error" : product.stock <= 5 ? "text-orange-600" : "text-primary"}`}>
                        {product.stock}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 md:mt-6 pt-2">
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-xl bg-primary text-white hover:brightness-110 transition-all text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-md shadow-primary/10"
                    >
                      <span className="material-symbols-outlined text-base">edit</span> Edit
                    </Link>
                    
                    <AddStockButton productId={product.id} />

                    <form action={async () => {
                      "use server";
                      await deleteProductAction(product.id);
                    }} className="shrink-0">
                      <button 
                        type="submit"
                        className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-error/5 text-error hover:bg-error hover:text-white transition-all border border-error/10"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
