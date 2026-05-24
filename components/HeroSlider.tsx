"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
    title: "Transform Your Living Space",
    description: "Up to 40% Off New Arrivals. Discover curated pieces designed for contemporary comfort.",
    tag: "New Season"
  },
  {
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000",
    title: "Nordic Elegance",
    description: "Experience the minimalist beauty of Scandinavian design. Handcrafted for longevity.",
    tag: "Featured"
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=2000",
    title: "Modern Minimalist",
    description: "Sleek lines and premium materials. Elevate your home with our latest collection.",
    tag: "Modern"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] flex items-center overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            src={slide.image}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="relative w-full max-w-container-max mx-auto px-margin-desktop h-full flex items-center">
            <div className={`max-w-xl text-white transition-transform duration-1000 ease-out ${
              index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <span className="font-label-md text-label-md uppercase tracking-widest bg-primary px-3 py-1 rounded-full mb-6 inline-block">
                {slide.tag}
              </span>
              <h1 className="font-headline-xl text-headline-xl mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="font-body-lg text-body-lg mb-8 text-white/90">
                {slide.description}
              </p>
              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="bg-primary-container text-white px-10 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform duration-200 active:scale-95"
                >
                  Shop Now
                </Link>
                <Link
                  href="/catalog"
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/20 transition-all"
                >
                  Explore Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
