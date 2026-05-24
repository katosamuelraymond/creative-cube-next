import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Account",
    template: "%s | Creative Cube",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left: Lifestyle Side (Hidden on mobile) */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-90 brightness-75 transition-transform duration-700 hover:scale-105" 
            alt="Premium Furniture Lifestyle"
            src="https://images.unsplash.com/photo-1618221195710-dd6b41fa33a8?auto=format&fit=crop&q=80&w=1200" 
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-20 bg-gradient-to-t from-black/60 to-transparent w-full h-full min-h-screen">
          <h1 className="font-headline-xl text-5xl text-white mb-6 leading-tight font-bold">
            Build Your Dream Home
          </h1>
          <p className="font-body-lg text-lg text-white/90 max-w-md leading-relaxed font-medium">
            Curated furniture collections for the modern professional. Experience comfort that meets high-end craftsmanship.
          </p>
          <div className="mt-12 flex gap-4">
            <div className="h-1.5 w-16 bg-primary-container rounded-full shadow-lg"></div>
            <div className="h-1.5 w-8 bg-white/30 rounded-full"></div>
            <div className="h-1.5 w-8 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Right: Auth Form Side */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-margin-mobile md:px-margin-desktop bg-surface-container-lowest min-h-screen py-20">
        <div className="w-full max-w-[440px] flex flex-col">
          {/* Brand Anchor */}
          <div className="mb-12 text-center lg:text-left">
            <Link href="/" className="font-headline-md text-2xl font-bold text-primary hover:scale-105 transition-transform inline-block">
              Creative Cube
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            {children}
          </div>

          {/* Legal Footer */}
          <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center lg:text-left">
            <p className="font-label-md text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60">
              © {new Date().getFullYear()} Creative Cube. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
