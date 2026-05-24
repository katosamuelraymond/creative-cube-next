import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary-container text-primary">
      <div className="w-full max-w-container-max mx-auto px-margin-desktop py-12 flex flex-col gap-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-on-secondary-container">
          <div className="col-span-2">
            <Link
              href="/"
              className="font-headline-md text-headline-md font-bold text-primary mb-6 inline-block"
            >
              Creative Cube
            </Link>
            <p className="font-body-sm text-body-sm max-w-xs mb-6">
              Crafting modern living spaces with premium furniture designed for
              comfort and longevity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <span className="material-symbols-outlined">share</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-label-md text-label-md font-bold mb-4 uppercase">
              Shop
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/products?category=sofas"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Sofas
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=tables"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Tables
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=beds"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Beds
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=chairs"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Chairs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-md text-label-md font-bold mb-4 uppercase">
              Collections
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/products?category=office"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Office
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=decor"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Home Décor
                </Link>
              </li>
              <li>
                <Link
                  href="/products?featured=true"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products?sale=true"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-md text-label-md font-bold mb-4 uppercase">
              Support
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/shipping"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-md text-label-md font-bold mb-4 uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/about"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="font-body-sm text-body-sm hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-on-secondary-container/10 flex flex-col md:flex-row justify-between items-center gap-4 text-on-secondary-container">
          <p className="font-body-sm text-body-sm">
            © {new Date().getFullYear()} Creative Cube. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-3xl">credit_card</span>
            <span className="material-symbols-outlined text-3xl">payments</span>
            <span className="material-symbols-outlined text-3xl">
              account_balance_wallet
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
