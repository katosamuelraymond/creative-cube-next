export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">System Settings</h1>
        <p className="text-sm text-secondary font-medium mt-1">Configure global store preferences and administrative options</p>
      </div>

      <div className="space-y-6 pb-10">
        {/* Store Profile */}
        <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/5 shadow-premium space-y-6">
          <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Store Profile</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">Store Name</label>
              <input
                defaultValue="Creative Cube"
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">Support Email</label>
              <input
                defaultValue="support@creativecube.com"
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm"
              />
            </div>
          </div>
        </section>

        {/* Inventory Settings */}
        <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/5 shadow-premium space-y-6">
          <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Inventory & Shipping</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container/50 rounded-2xl border border-outline-variant/10">
              <div>
                <p className="text-sm font-bold text-on-surface">Low Stock Alert</p>
                <p className="text-[10px] text-secondary font-medium">Notify when product stock drops below threshold</p>
              </div>
              <input type="number" defaultValue="5" className="w-16 px-2 py-1 bg-surface-container border border-outline-variant/20 rounded-lg text-center font-bold text-sm" />
            </div>

            <div className="flex items-center justify-between p-4 bg-surface-container/50 rounded-2xl border border-outline-variant/10">
              <div>
                <p className="text-sm font-bold text-on-surface">Free Shipping Threshold</p>
                <p className="text-[10px] text-secondary font-medium">Minimum order amount for free delivery</p>
              </div>
              <input type="number" defaultValue="500" className="w-20 px-2 py-1 bg-surface-container border border-outline-variant/20 rounded-lg text-center font-bold text-sm" />
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/5 shadow-premium space-y-6">
          <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Appearance</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-on-surface">Admin Dashboard Theme</p>
              <p className="text-[10px] text-secondary font-medium">Toggle between light and dark mode</p>
            </div>
            <div className="flex bg-surface-container p-1 rounded-xl border border-outline-variant/10">
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-md">Light</button>
              <button className="px-4 py-2 text-secondary rounded-lg text-[10px] font-bold uppercase tracking-widest">Dark</button>
            </div>
          </div>
        </section>

        <div className="pt-4 flex justify-end gap-4">
           <button className="px-8 py-3 bg-surface-container text-secondary font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-outline-variant/10 transition-all border border-outline-variant/10">
            Reset to Default
          </button>
          <button className="px-8 py-3 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
