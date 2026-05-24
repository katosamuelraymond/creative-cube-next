import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-12">
      {/* Secure Header Info */}
      <div className="flex justify-between items-center mb-12 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
        <div className="font-headline-md text-2xl font-bold text-primary">Checkout</div>
        <div className="flex items-center gap-2 text-on-secondary-container">
          <span className="material-symbols-outlined text-primary">lock</span>
          <span className="font-label-md text-xs font-bold tracking-widest uppercase">SECURE CHECKOUT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Forms & Payments */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* Shipping Address Section */}
          <section className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-lg">1</div>
              <h2 className="font-headline-md text-2xl font-bold uppercase tracking-wide">Shipping Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block font-label-md text-xs font-bold text-secondary mb-2 uppercase tracking-widest">Full Name</label>
                <input className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-5 py-4 text-body-md outline-none border transition-all shadow-sm" placeholder="John Doe" type="text" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-label-md text-xs font-bold text-secondary mb-2 uppercase tracking-widest">Street Address</label>
                <input className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-5 py-4 text-body-md outline-none border transition-all shadow-sm" placeholder="123 Furniture Lane" type="text" />
              </div>
              <div>
                <label className="block font-label-md text-xs font-bold text-secondary mb-2 uppercase tracking-widest">City</label>
                <input className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-5 py-4 text-body-md outline-none border transition-all shadow-sm" placeholder="Design City" type="text" />
              </div>
              <div>
                <label className="block font-label-md text-xs font-bold text-secondary mb-2 uppercase tracking-widest">Phone Number</label>
                <input className="w-full border-outline-variant bg-surface-container-lowest rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-5 py-4 text-body-md outline-none border transition-all shadow-sm" placeholder="+1 (555) 000-0000" type="tel" />
              </div>
            </div>
          </section>

          <hr className="border-outline-variant opacity-20" />

          {/* Payment Method Section */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-lg">2</div>
              <h2 className="font-headline-md text-2xl font-bold uppercase tracking-wide">Payment Method</h2>
            </div>
            <div className="space-y-4">
              {/* Credit Card Option */}
              <label className="flex items-center p-6 border border-outline-variant/30 rounded-2xl cursor-pointer hover:bg-surface-container-low transition-all group relative overflow-hidden bg-surface-container-lowest shadow-sm">
                <input defaultChecked className="w-6 h-6 text-primary border-outline-variant focus:ring-primary accent-primary" name="payment" type="radio" />
                <div className="ml-5 flex-grow">
                  <span className="font-body-md font-bold block text-lg">Credit Card</span>
                  <span className="text-body-sm text-secondary font-medium uppercase text-[10px] tracking-widest opacity-70">Secure checkout via encrypted gateway</span>
                </div>
                <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-3xl">credit_card</span>
                </div>
              </label>

              {/* PayPal Option */}
              <label className="flex items-center p-6 border border-outline-variant/30 rounded-2xl cursor-pointer hover:bg-surface-container-low transition-all group bg-surface-container-lowest shadow-sm">
                <input className="w-6 h-6 text-primary border-outline-variant focus:ring-primary accent-primary" name="payment" type="radio" />
                <div className="ml-5 flex-grow">
                  <span className="font-body-md font-bold block text-lg">PayPal</span>
                  <span className="text-body-sm text-secondary font-medium uppercase text-[10px] tracking-widest opacity-70">Pay with your PayPal account safely</span>
                </div>
                <span className="material-symbols-outlined text-secondary opacity-40 group-hover:opacity-100 transition-opacity text-3xl">account_balance_wallet</span>
              </label>
            </div>

            {/* Credit Card Details */}
            <div className="mt-8 bg-surface-container-low/50 p-8 rounded-3xl border border-outline-variant/20 space-y-5 shadow-inner">
              <div>
                <label className="block font-label-md text-xs font-bold text-secondary mb-2 uppercase tracking-widest">Card Number</label>
                <div className="relative">
                  <input className="w-full border-outline-variant/30 bg-surface-container-lowest rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-5 py-4 text-body-md outline-none border transition-all shadow-sm" placeholder="0000 0000 0000 0000" type="text" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary opacity-40">credit_card</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-md text-xs font-bold text-secondary mb-2 uppercase tracking-widest">Expiry Date</label>
                  <input className="w-full border-outline-variant/30 bg-surface-container-lowest rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-5 py-4 text-body-md outline-none border transition-all shadow-sm" placeholder="MM/YY" type="text" />
                </div>
                <div>
                  <label className="block font-label-md text-xs font-bold text-secondary mb-2 uppercase tracking-widest">CVV</label>
                  <input className="w-full border-outline-variant/30 bg-surface-container-lowest rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-5 py-4 text-body-md outline-none border transition-all shadow-sm" placeholder="***" type="password" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <div className="bg-surface-container-lowest p-10 rounded-[40px] shadow-premium border border-outline-variant/10">
              <h2 className="font-headline-md text-2xl font-bold uppercase tracking-wider mb-8">Order Summary</h2>
              
              {/* Item List Preview */}
              <div className="space-y-6 mb-8">
                <div className="flex gap-5">
                  <div className="w-20 h-20 bg-surface-container rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcMNi6jewIxEUwGgU23I-VB4j3ol-l-ok3gsyISwTDJMIT6USwLaWpgeTqBqBcpn4kJwTxG_dkTvwwIOgjk2TJGJ4aN-UI72s-Ikc-F-Ea7zqcG8p_rtWsRPOOzZsCYBwIb_z0A1AK2C3q1D3z6C7eViPekxY98G96OOp7f6RxU0bkHnE4luQAAlbQNN1RlaqnqECFtB6SWLAR3Hb0mbgUMEemzjruioJynGyBv2Di1QKSNvz6qxvp9dadJgXev6b0GJik_R-8-kD-" alt="Item" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-body-md font-bold text-lg">Velvet Estate Sofa</p>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest opacity-60">Quantity: 1</p>
                    <p className="text-primary font-bold mt-2 text-lg">$1,299.00</p>
                  </div>
                </div>
              </div>

              <hr className="border-outline-variant opacity-10 mb-8" />

              {/* Totals */}
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-body-md font-medium">
                  <span className="text-secondary font-bold uppercase text-[10px] tracking-widest">Subtotal</span>
                  <span className="font-bold">$1,299.00</span>
                </div>
                <div className="flex justify-between text-body-md font-medium">
                  <span className="text-secondary font-bold uppercase text-[10px] tracking-widest">Shipping</span>
                  <span className="text-primary font-bold tracking-widest">FREE</span>
                </div>
                <div className="flex justify-between text-body-md font-medium">
                  <span className="text-secondary font-bold uppercase text-[10px] tracking-widest">Estimated Tax</span>
                  <span className="font-bold">$64.95</span>
                </div>
                <div className="flex justify-between font-headline-md text-2xl pt-6 border-t border-outline-variant border-dashed">
                  <span className="font-bold uppercase tracking-wider">Total</span>
                  <span className="text-primary font-bold">$1,363.95</span>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all duration-200 uppercase tracking-widest">
                Place Order
              </button>
            </div>

            {/* Trust & Guarantees */}
            <div className="bg-surface-container-low/50 p-8 rounded-[32px] space-y-6 border border-outline-variant/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Money-Back Guarantee</p>
                  <p className="text-xs text-secondary leading-relaxed font-medium">Love your furniture or return it within 30 days for a full refund. No questions asked.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">SSL Secure Payment</p>
                  <p className="text-xs text-secondary leading-relaxed font-medium">Your payment information is processed securely with bank-grade 256-bit encryption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
