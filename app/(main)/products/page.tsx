import { getProducts } from "@/services/product.service";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: { name: string; slug: string } | string;
  price: number | string | { toString(): string };
  image: string;
}

const mockProducts: Product[] = [
  {
    id: "11",
    name: "Emerald Estate Sofa",
    category: "Luxury Velvet",
    price: "1299",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcMNi6jewIxEUwGgU23I-VB4j3ol-l-ok3gsyISwTDJMIT6USwLaWpgeTqBqBcpn4kJwTxG_dkTvwwIOgjk2TJGJ4aN-UI72s-Ikc-F-Ea7zqcG8p_rtWsRPOOzZsCYBwIb_z0A1AK2C3q1D3z6C7eViPekxY98G96OOp7f6RxU0bkHnE4luQAAlbQNN1RlaqnqECFtB6SWLAR3Hb0mbgUMEemzjruioJynGyBv2Di1QKSNvz6qxvp9dadJgXev6b0GJik_R-8-kD-",
  },
  {
    id: "14",
    name: "Nordic Cloud Sectional",
    category: "Sectional Sofas",
    price: "2450",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDbhAaeZf12yzf2QAi4TzftqAxaIVGJzHbTMIVkbrRXmk3af64so_OlsuRFqKu9FxeOlxjHh2YpU7innwF2GTr3mDc39rNAGI9uNCqc6yuKNI2A58RenK7jAgnYw2DoKstQGcPEiDawHeeyBCvj_wGmpCgDh04ZF3njXSr8Vkp7bMfJ4aYvWyNYELDvrCidsLBn0L3WkFZ1EbCpVj24N5NsHJOFjHAUhruPcRYOgZSmzOU9NRCEViwPjxtRidHf_h-abivDEOsytbl",
  },
  {
    id: "15",
    name: "Heritage Leather Sofa",
    category: "Mid-Century Modern",
    price: "1850",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPPiTukwbwrZZBDOScw7jwcR3EbZJ5CGvg0qcIa4OeQHjeIdNCkKe9l_rqJpNW_syGmjIlD0Re8o88bSEenjxBymHnggWqAHbGhAVQfkRfAR9hWIpGuuVWF6SyV752zyGaJlOTN8hPU7rRlG80ZcmKAYQzhMzgaXGNE35uPjE49YB4vZDFxheqldZNk4DUtHw5yLyDZb-5-DSf2qHSi2HHF5whtfzz8gQRYYTZJjGzBfJTsAD4TOedqYcIUGLk-xnKPff7clnG8q7D",
  },
  {
    id: "16",
    name: "Apex Modular Unit",
    category: "Luxury Velvet",
    price: "3100",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJKw1H7PPbvFADjMXlwnJE5Pd0O51w3BXahlvB5LfABL4xnUTn18xWWGbiAsQHXLjgguvZ1APCmyODOPY-GV-qQ4sHTH_lFM1B3ZG67ktrylBbwYk12UM5n9dRDzapiU-267FXK3JAkDboNxPjLh46uann8bCoYv-Dk2iQZwPsUJshaQYox2lbA-jp0RVya2vFwM3byyNq_AK9ibI19jBpVA0HhIOaedkURrLQ8TMKkbJllGaPA4IuszYJmNgoM4TbnlSO2N7eU2Wc",
  }
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  const { products: dbProducts, total } = await getProducts({
    categorySlug: category,
    search: search,
    limit: 12,
  });

  // Use DB products if available, or mock data for demo
  const displayProducts = dbProducts.length > 0
    ? dbProducts.map(p => ({
      ...p,
      price: p.price.toString(),
      image: p.images?.[0]?.startsWith('http') ? p.images?.[0] : mockProducts[0].image
    }))
    : mockProducts;

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex py-6 text-on-secondary-container font-label-md text-label-md">
        <ol className="flex items-center space-x-2">
          <li><Link className="hover:text-primary transition-colors" href="/">Home</Link></li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-primary font-bold capitalize">{category || "All Products"}</span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Sidebar Filters - Sticky and higher z-index */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8 md:sticky md:top-28 h-fit z-30">
          <div>
            <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-3">
              {["Sectional Sofas", "Luxury Velvet", "Mid-Century Modern", "Sleeper Sofas", "Loveseats"].map(cat => (
                <li key={cat}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                    <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-wider">Price Range</h3>
            <div className="px-2">
              <input className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" max="5000" min="500" step="100" type="range" />
              <div className="flex justify-between mt-3 font-label-md text-on-secondary-container font-bold">
                <span>$500</span>
                <span className="text-primary">$5,000+</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-wider">Material</h3>
            <div className="flex flex-wrap gap-2">
              {["Leather", "Velvet", "Linen", "Suede"].map((m, i) => (
                <button key={m} className={`px-4 py-1.5 rounded-full border border-outline-variant font-bold text-xs uppercase tracking-widest transition-all ${i === 1 ? 'bg-primary text-white' : 'hover:border-primary hover:text-primary'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-wider">Ratings</h3>
            <div className="space-y-2">
              {[5, 4].map(stars => (
                <button key={stars} className="flex items-center gap-2 group w-full">
                  <div className="flex text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: i < stars ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                    ))}
                  </div>
                  <span className="font-label-md text-on-surface group-hover:underline font-bold">{stars} Stars</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <p className="font-body-md text-on-secondary-container">
              Showing <span className="font-bold text-on-surface">{displayProducts.length}</span> of {total || displayProducts.length} products
            </p>
            <div className="flex items-center gap-3">
              <span className="font-label-md text-on-secondary-container font-bold uppercase tracking-wider">Sort by:</span>
              <div className="relative">
                <select className="appearance-none bg-surface-container border border-outline-variant rounded-lg px-4 py-2 pr-10 font-bold text-xs uppercase tracking-widest focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer">
                  <option>Popularity</option>
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-secondary">expand_more</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((p) => (
              <div key={p.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-premium hover:shadow-hover-premium transition-all group relative">
                <Link href={`/products/${p.id}`} className="relative aspect-[4/5] block overflow-hidden">
                  <img alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={p.image} />
                  <div className="absolute top-4 left-4 bg-primary-container text-white px-3 py-1 rounded-full font-bold text-[10px] shadow-sm uppercase tracking-widest">20% OFF</div>
                </Link>

                {/* Favorite button moved outside Link to fix interaction issues */}
                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-primary hover:text-white">
                  <span className="material-symbols-outlined">favorite</span>
                </button>

                <div className="p-6">
                  <Link href={`/products/${p.id}`}>
                    <h4 className="font-headline-md text-xl mb-2 group-hover:text-primary transition-colors">{p.name}</h4>
                  </Link>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary font-bold text-xl">${p.price.toString()}</span>
                    <span className="text-on-secondary-container line-through text-xs opacity-60 font-bold">${(Number(p.price) * 1.2).toFixed(0)}</span>
                  </div>
                  <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-white text-lg">add_shopping_cart</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="mt-16 flex items-center justify-center gap-2">
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-outline-variant hover:bg-primary hover:text-white transition-all text-on-surface">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white font-bold shadow-lg">1</button>
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-outline-variant hover:bg-primary hover:text-white transition-all text-on-surface font-bold">2</button>
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-outline-variant hover:bg-primary hover:text-white transition-all text-on-surface font-bold">3</button>
            <span className="px-2 text-secondary font-bold">...</span>
            <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-outline-variant hover:bg-primary hover:text-white transition-all text-on-surface">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </section>
      </div>
    </main>
  );
}
