import Link from "next/link";

const cartItems = [
  {
    id: "11",
    name: "Velvet Lounge Sofa",
    variant: "Forest Green / Three-Seater",
    price: 1299.0,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkQ4zBfqwEp8nJO3KBQG-Xvms8fgSPWiV9Hz5Z5hMD9iWOgNAv5CbG0YplkWggJ5JQOaaSppXZVDcH0pYn32h5D-dPaPlCrj9brY5xjqNfsScG3Un0BB3LjgYnNw-Qtp0BfA2tjV-znKJxoKTZJkEBJmdx8oxib_n_sngDBfcFlN9dD6TppAbiVs3dDj20IyAR8XCrMwu7-3ZhzvNj1SpRc4R4GCbHy8XzM09RAxNpOFphbpYZpXoLv5iQ54AA6_vzq5ASYRzN_lr",
  },
  {
    id: "2",
    name: "Walnut Artisan Table",
    variant: "Natural Finish / 6-Person",
    price: 850.0,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOOHCFqq0-P1S-E9ZlmQIAafi2j_PM1zvJvpuqGeEKvcTHJkT2Nk5LsJRHfHQCMI2TsbJrR47qAEvlNwGmxbOebgk_vO8MfI-k60tIworNLfEB83WYcWlKBAksGnODkNpXoqDGlsodvoleAqqnbKwbnuA2wzMh6HhQgVYNqZvL0YGuU-rYkK2w6rpZoATuSKriTJAqfSNxfzbHxJvpn-S5rgyVM7KKjLibhM16fzSx1yIjeJEBxrwfmaE-rjLbJY7d0OYarCQcTGPC",
  },
  {
    id: "6",
    name: "Pro Ergonomic Chair",
    variant: "Slate Grey / Mesh Back",
    price: 340.0,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa7hVYLgqpBtoJ9u4nQwZ9jh5dMvTfvnN0E5kVcTeCuHoE2FUllEJRTgrH0Edw-myeXPy9pEm0OuzmQTVapCgM7tSGaCP5kldIemQC7sWfb64wLdBiZ3Z0Un8nQ67EwZFvd6Ss4-kmB6PfdB9MDbr-saqz51PhzWYkklG84olVJtWrkWyTyty3ZynyUi9mHyCCc-hUj_VkZGNIrAz9VftDReE1cYUS3ktFWTQvu5CDgQGdBObpyIq2f7cBp0S-401ApFHynezn6xNO",
  },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12">
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="font-headline-xl text-headline-xl text-on-surface">Your Shopping Cart</h1>
        <p className="font-body-md text-body-md text-secondary">Review your selection before proceeding to checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Section: Cart Items */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Cart Table Headers (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-outline-variant items-center px-4">
            <div className="col-span-6 font-label-md text-label-md text-secondary uppercase tracking-widest font-bold">PRODUCT</div>
            <div className="col-span-2 font-label-md text-label-md text-secondary text-center uppercase tracking-widest font-bold">PRICE</div>
            <div className="col-span-2 font-label-md text-label-md text-secondary text-center uppercase tracking-widest font-bold">QUANTITY</div>
            <div className="col-span-2 font-label-md text-label-md text-secondary text-right uppercase tracking-widest font-bold">SUBTOTAL</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="item-row group bg-surface-container-lowest p-6 rounded-3xl shadow-premium flex flex-col md:grid md:grid-cols-12 md:items-center gap-4 transition-all duration-200 hover:shadow-hover-premium border border-outline-variant/10">
              <div className="col-span-6 flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-surface-container shadow-sm">
                  <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="font-body-sm text-body-sm text-secondary font-medium">{item.variant}</p>
                  <button className="remove-btn flex items-center gap-1 text-error font-bold text-xs uppercase tracking-widest mt-3 transition-opacity duration-200 active:scale-95">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    <span>Remove</span>
                  </button>
                </div>
              </div>
              <div className="col-span-2 text-center md:block flex justify-between items-center">
                <span className="md:hidden font-label-md text-secondary font-bold">Price:</span>
                <span className="font-body-md text-on-surface font-bold">${item.price.toFixed(2)}</span>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <div className="flex items-center border border-outline-variant rounded-xl overflow-hidden bg-surface-container-low shadow-inner">
                  <button className="px-3 py-2 hover:bg-primary hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">remove</span></button>
                  <span className="px-4 font-body-md text-on-surface font-bold">{item.quantity}</span>
                  <button className="px-3 py-2 hover:bg-primary hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">add</span></button>
                </div>
              </div>
              <div className="col-span-2 text-right md:block flex justify-between items-center">
                <span className="md:hidden font-label-md text-secondary font-bold">Subtotal:</span>
                <span className="font-headline-md text-headline-md text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-8 mt-4 py-8 px-8 bg-primary/5 rounded-[32px] border border-primary/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-premium">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-secondary-container font-bold uppercase tracking-widest">Secure Checkout</span>
                <span className="font-body-sm text-[10px] text-secondary font-bold uppercase opacity-60">SSL Encrypted Transaction</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-premium">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-secondary-container font-bold uppercase tracking-widest">Free Delivery over $500</span>
                <span className="font-body-sm text-[10px] text-secondary font-bold uppercase opacity-60">White Glove Assembly Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-4">
          <div className="bg-surface-container-lowest p-10 rounded-[40px] shadow-premium border border-outline-variant/10 sticky top-28">
            <h2 className="font-headline-md text-2xl text-on-surface mb-8 font-bold uppercase tracking-wider">Order Summary</h2>
            <div className="space-y-5 mb-8">
              <div className="flex justify-between">
                <span className="font-body-md text-body-md text-secondary font-bold">Subtotal ({cartItems.length} items)</span>
                <span className="font-body-md text-body-md text-on-surface font-bold text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-secondary font-bold">Shipping</span>
                  <button className="text-primary font-bold text-xs uppercase tracking-widest underline text-left mt-1">Calculate Shipping</button>
                </div>
                <span className="font-body-md text-body-md text-primary font-bold text-lg tracking-widest">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body-md text-body-md text-secondary font-bold">Estimated Tax</span>
                <span className="font-body-md text-body-md text-on-surface font-bold text-lg">${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-8 border-t border-outline-variant/10 mb-10">
              <div className="flex justify-between items-end">
                <span className="font-headline-md text-xl font-bold text-on-surface uppercase tracking-widest">Total</span>
                <span className="font-headline-xl text-3xl text-primary font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link 
              href="/checkout"
              className="w-full bg-primary text-white font-bold text-lg py-5 rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all duration-150 uppercase tracking-widest block text-center"
            >
              Proceed to Checkout
            </Link>
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-center gap-3 text-secondary bg-surface-container-low p-3 rounded-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-xl">lock</span>
                <span className="font-body-sm text-xs font-bold uppercase tracking-widest opacity-80">Payments are highly secure & encrypted</span>
              </div>
              <div className="flex gap-4 justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="w-12 h-8 bg-surface-container rounded-lg border border-outline-variant/30 flex items-center justify-center font-bold text-[8px]">VISA</div>
                <div className="w-12 h-8 bg-surface-container rounded-lg border border-outline-variant/30 flex items-center justify-center font-bold text-[8px]">MC</div>
                <div className="w-12 h-8 bg-surface-container rounded-lg border border-outline-variant/30 flex items-center justify-center font-bold text-[8px]">AMEX</div>
                <div className="w-12 h-8 bg-surface-container rounded-lg border border-outline-variant/30 flex items-center justify-center font-bold text-[8px]">APPLE</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
