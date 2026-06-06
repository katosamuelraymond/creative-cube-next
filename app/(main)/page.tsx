import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import { getProducts } from "@/services/product.service";

const categories = [
  { name: "Sofas", icon: "chair", slug: "sofas", color: "bg-orange-50 text-orange-600" },
  { name: "Beds", icon: "bed", slug: "beds", color: "bg-blue-50 text-blue-600" },
  { name: "Dining", icon: "table_restaurant", slug: "dining", color: "bg-green-50 text-green-600" },
  { name: "Office", icon: "desk", slug: "office", color: "bg-purple-50 text-purple-600" },
  { name: "Décor", icon: "potted_plant", slug: "decor", color: "bg-pink-50 text-pink-600" },
];

interface Product {
  id: string;
  name: string;
  category: { name: string } | string;
  price: number | string | { toString(): string };
  image: string;
}

// Guaranteed high-res furniture images
const mockNewArrivals: Product[] = [
  {
    id: "5",
    name: "Ethereal Glass Vase",
    category: "Home Décor",
    price: 120,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    name: "Velvet Accent Chair",
    category: "Seating",
    price: 340,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "7",
    name: "Minimalist Oak Desk",
    category: "Office",
    price: 850,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "8",
    name: "Industrial Wall Clock",
    category: "Accessories",
    price: 85,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "10",
    name: "Sleek Modern Bed",
    category: "Bedroom",
    price: 1500,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "11",
    name: "Emerald Velvet Sofa",
    category: "Living Room",
    price: 2200,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "12",
    name: "Floating Oak Shelves",
    category: "Storage",
    price: 250,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "13",
    name: "Geometric Floor Mirror",
    category: "Decor",
    price: 450,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
  }
];

const mockBestSellers: Product[] = [
  {
    id: "1",
    name: "Nordic Ash Armchair",
    category: { name: "Scandinavian Living" },
    price: 499,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "2",
    name: "Crescent Marble Table",
    category: { name: "Modern Minimalist" },
    price: 350,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Onyx Triple Head Lamp",
    category: { name: "Lighting & Ambiance" },
    price: 189,
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "Echo Geometric Rug",
    category: { name: "Hand-tufted Textiles" },
    price: 620,
    image: "https://images.unsplash.com/photo-1531835597960-697aa9ca9063?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "9",
    name: "Walnut Sideboard",
    category: { name: "Storage" },
    price: 1200,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
  }
];

export default async function Home() {
  const { products: dbFeatured } = await getProducts({ featured: true, limit: 5 });
  const { products: dbRecent } = await getProducts({ limit: 8 });

  // Merge logic: prefer DB products if they have valid images, otherwise use mock
  const bestSellers = dbFeatured.length >= 5
    ? dbFeatured.map((p, i) => ({
      ...p,
      price: p.price.toString(),
      image: p.images?.[0]?.startsWith('http') ? p.images?.[0] : mockBestSellers[i].image
    }))
    : mockBestSellers;

  const newArrivals = dbRecent.length >= 8
    ? dbRecent.map((p, i) => ({
      ...p,
      price: p.price.toString(),
      image: p.images?.[0]?.startsWith('http') ? p.images?.[0] : mockNewArrivals[i].image
    }))
    : mockNewArrivals;

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero */}
      <HeroSlider />

      {/* Categories Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Browse by Category</h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="group">
                <div className="flex flex-col items-center gap-4 transition-all duration-300">
                  <div className={`w-24 h-24 ${cat.color} rounded-3xl flex items-center justify-center shadow-premium group-hover:shadow-hover-premium group-hover:-translate-y-2 transition-all duration-300`}>
                    <span className="material-symbols-outlined text-4xl">
                      {cat.icon}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers - Packed Masonry Grid */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4 border-l-4 border-primary pl-6">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Best Sellers</h2>
            <p className="font-body-md text-body-md text-secondary">Our most loved pieces of the week</p>
          </div>
          <Link href="/products?featured=true" className="font-label-md text-label-md text-primary flex items-center gap-2 hover:underline group font-bold uppercase tracking-widest text-xs">
            View Collection <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Big Featured Item */}
            <div className="md:col-span-8 lg:col-span-7">
              <ProductCard product={bestSellers[0]} isFeatured />
            </div>

            {/* 4 item cluster */}
            <div className="md:col-span-4 lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
              {bestSellers.slice(1, 5).map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} isCompact />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop mb-12 text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">New Arrivals</h2>
          <p className="font-body-md text-body-md text-secondary">Freshly curated pieces just for you</p>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/products" className="inline-flex items-center gap-3 border-2 border-primary text-primary px-10 py-4 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all">
              View All Products
              <span className="material-symbols-outlined">expand_more</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Real Homes, Real Stories</h2>
            <p className="font-body-md text-body-md text-secondary">Join over 50,000 happy homeowners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah J.",
                role: "Interior Designer",
                text: "The quality of the Nordic Armchair exceeded my expectations. It's the perfect statement piece for my studio."
              },
              {
                name: "Mark Thompson",
                role: "Homeowner",
                text: "Shipping was surprisingly fast for such large pieces. Creative Cube has become my go-to for home upgrades."
              },
              {
                name: "Elena Rodriguez",
                role: "Architect",
                text: "The customer support team helped me coordinate a custom fabric for my sectional. Truly premium service."
              }
            ].map((t, i) => (
              <div key={i} className={`bg-surface-container-lowest p-10 rounded-[32px] shadow-premium hover:shadow-hover-premium transition-all duration-300 border border-outline-variant/10 ${i === 1 ? 'md:-translate-y-4 z-10 border-primary/20' : ''}`}>
                <div className="flex gap-1 text-primary mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="material-symbols-outlined fill text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface mb-8 italic leading-relaxed text-lg">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/10">
                  <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-bold">{t.name}</p>
                    <p className="font-body-sm text-body-sm text-secondary uppercase tracking-widest text-[10px]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 pb-40">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="bg-primary text-white rounded-[48px] p-12 md:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
            <div className="relative flex-1 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Stay in the Loop</h2>
              <p className="text-xl opacity-90 leading-relaxed">Get exclusive offers, décor tips, and early access to new collections delivered to your inbox.</p>
            </div>
            <div className="relative w-full lg:w-auto flex-1">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-8 py-5 rounded-2xl flex-grow focus:ring-2 focus:ring-white outline-none backdrop-blur-md"
                  placeholder="Enter your email address"
                  type="email"
                />
                <button
                  className="bg-white text-primary px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all whitespace-nowrap active:scale-95 shadow-lg"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
              <p className="font-label-md text-label-md mt-6 text-white/60 text-center lg:text-left">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ 
  product, 
  isFullHeight, 
  isCompact,
  isFeatured 
}: { 
  product: Product, 
  isFullHeight?: boolean, 
  isCompact?: boolean,
  isFeatured?: boolean
}) {
  const categoryName = typeof product.category === 'string'
    ? product.category
    : product.category?.name;

  const priceString = product.price?.toString() || "0";
  
  const isLarge = isFullHeight || isFeatured;

  return (
    <div className="group animate-scale-in h-full flex flex-col relative">
      <Link 
        href={`/products/${product.id}`} 
        className={`relative overflow-hidden rounded-[32px] bg-surface-container shadow-premium group-hover:shadow-hover-premium transition-all duration-500 ${isLarge ? 'flex-1' : isCompact ? 'aspect-square' : 'aspect-[4/5]'} ${!isLarge && !isCompact ? 'mb-4' : ''}`}
      >
        <img
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={product.image}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>

        {/* Detail Overlay for tight masonry grid items */}
        <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-transparent to-transparent ${isLarge || isCompact ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 md:hidden'}`}>
          <div className="text-white">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1 opacity-80">{categoryName}</p>
            <h3 className={`${isLarge ? 'text-2xl' : 'text-sm'} font-bold mb-1`}>{product.name}</h3>
            <p className={`${isLarge ? 'text-xl' : 'text-sm'} font-bold text-primary-container`}>${priceString}</p>
          </div>
        </div>
      </Link>

      {/* Floating Add to Cart Button (Outside Link to avoid nested button issues) */}
      <button className="absolute top-4 right-4 bg-white text-primary w-12 h-12 flex items-center justify-center rounded-2xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white active:scale-90 z-20">
        <span className="material-symbols-outlined">add_shopping_cart</span>
      </button>

      {!isLarge && !isCompact && (
        <div className="px-2 mt-2">
          <p className="font-body-sm text-body-sm text-secondary mb-1 uppercase tracking-widest text-[10px] font-bold">
            {categoryName}
          </p>
          <Link href={`/products/${product.id}`} className="block group/title">
            <h3 className="text-base font-headline-md text-headline-md text-on-surface leading-tight group-hover/title:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-primary">${priceString}</span>
          </div>
        </div>
      )}
    </div>
  );
}
