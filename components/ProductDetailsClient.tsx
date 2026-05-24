"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: { name: string } | string;
  price: string;
  image: string;
  description?: string;
}

export default function ProductDetailsClient({
  product,
  relatedProducts
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [currentImage, setCurrentImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("dimensions");
  const [selectedColor, setSelectedColor] = useState("Burnt Orange");

  const categoryName = typeof product.category === 'string'
    ? product.category
    : product.category?.name;

  const thumbnails = [
    product.image,
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800",
  ];

  const colors = [
    { name: "Burnt Orange", hex: "#a04100" },
    { name: "Anthracite", hex: "#2f3131" },
    { name: "Slate Gray", hex: "#5d5f5f" },
    { name: "Earth Brown", hex: "#8e7164" },
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-body-sm text-secondary">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link href={`/products?category=${categoryName?.toLowerCase()}`} className="hover:text-primary transition-colors">
          {categoryName}
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-on-surface font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Image Gallery Section */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24">
            {thumbnails.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImage(img)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${currentImage === img ? "border-primary" : "border-outline-variant hover:border-primary"
                  }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="flex-1 rounded-xl overflow-hidden bg-surface-container shadow-sm group relative">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <button className="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md p-3 rounded-full hover:bg-primary transition-all duration-300 group/fav">
              <span className="material-symbols-outlined text-on-surface group-hover/fav:text-on-primary">favorite</span>
            </button>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <span className="font-label-md text-label-md text-primary bg-primary-fixed px-3 py-1 rounded-full mb-4 inline-block tracking-widest font-bold">
              BEST SELLER
            </span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex text-primary">
                {[1, 2, 3, 4].map(s => (
                  <span key={s} className="material-symbols-outlined fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="material-symbols-outlined">star_half</span>
              </div>
              <span className="font-body-sm text-body-sm text-secondary">(124 Customer Reviews)</span>
            </div>
            <p className="font-headline-lg text-headline-lg text-primary-container font-bold">${product.price}</p>
          </div>

          <div className="h-px bg-outline-variant"></div>

          {/* Configurator */}
          <div className="flex flex-col gap-6">
            {/* Color Swatches */}
            <div>
              <p className="font-label-md text-label-md text-on-surface mb-3 uppercase tracking-wider font-bold">
                SELECT COLOR: <span className="text-secondary font-normal">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 bg-surface transition-all active:scale-95 ${selectedColor === color.name ? "border-primary" : "border-outline-variant"
                      }`}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="font-label-md text-label-md text-on-surface mb-3 uppercase tracking-wider font-bold">QUANTITY</p>
              <div className="flex items-center border border-outline-variant rounded-lg w-fit px-2 py-1 bg-surface-container-lowest">
                <button
                  className="p-2 hover:text-primary transition-colors"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <input
                  className="w-12 text-center border-none focus:ring-0 bg-transparent font-body-md"
                  type="number"
                  value={quantity}
                  readOnly
                />
                <button
                  className="p-2 hover:text-primary transition-colors"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4">
            <button className="w-full bg-primary text-on-primary py-5 rounded-lg font-bold tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
              ADD TO CART
            </button>
            <button className="w-full bg-on-background text-on-primary py-5 rounded-lg font-bold tracking-wider hover:bg-on-background/90 active:scale-[0.98] transition-all">
              BUY NOW
            </button>
          </div>

          {/* Specs Accordion */}
          <div className="flex flex-col border-t border-outline-variant mt-4">
            {[
              {
                id: "dimensions", title: "DIMENSIONS", content: (
                  <div className="pb-4 text-body-sm text-secondary space-y-2">
                    <div className="flex justify-between"><span>Width:</span> <span className="text-on-surface">104 inches</span></div>
                    <div className="flex justify-between"><span>Depth:</span> <span className="text-on-surface">36 inches</span></div>
                    <div className="flex justify-between"><span>Height:</span> <span className="text-on-surface">32 inches</span></div>
                    <div className="flex justify-between"><span>Seat Height:</span> <span className="text-on-surface">18 inches</span></div>
                  </div>
                )
              },
              {
                id: "materials", title: "MATERIALS", content: (
                  <p className="pb-4 text-body-sm text-secondary">Premium high-pile velvet upholstery, solid kiln-dried oak frame, high-density foam cushions with down toppers for maximum comfort. Modular connectors hidden under the frame.</p>
                )
              },
              {
                id: "shipping", title: "SHIPPING INFO", content: (
                  <p className="pb-4 text-body-sm text-secondary">Standard delivery within 5-10 business days. White-glove delivery and assembly service available at checkout for an additional $99. 30-day trial period with free returns.</p>
                )
              },
            ].map(item => (
              <div key={item.id} className="border-b border-outline-variant">
                <button
                  className="w-full py-4 flex justify-between items-center group"
                  onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                >
                  <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors font-bold uppercase tracking-wider">
                    {item.title}
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${activeAccordion === item.id ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === item.id ? "max-h-40" : "max-h-0"}`}>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-l-4 border-primary pl-6">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Recommended for you</h2>
            <p className="text-secondary mt-2 font-body-md text-body-md">Complete your living space with these curated matching pieces.</p>
          </div>
          <Link href="/products" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-2 font-bold uppercase tracking-widest text-xs group">
            Explore All Collection <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {relatedProducts.map(rp => (
            <Link key={rp.id} href={`/products/${rp.id}`} className="group cursor-pointer animate-scale-in">
              <div className="aspect-square rounded-[32px] overflow-hidden bg-surface-container relative mb-5 shadow-premium group-hover:shadow-hover-premium transition-all duration-500">
                <img src={rp.images?.[0]} alt={rp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                <button className="absolute bottom-4 right-4 bg-white text-primary w-12 h-12 flex items-center justify-center rounded-2xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <div className="px-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1 opacity-60">{typeof rp.category === 'string' ? rp.category : rp.category?.name}</p>
                <h3 className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">{rp.name}</h3>
                <p className="text-primary font-bold text-lg mt-1">${rp.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
