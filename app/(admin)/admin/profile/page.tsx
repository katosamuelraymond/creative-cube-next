import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminProfilePage() {
  const session = await getSession();
  const user = await prisma.user.findUnique({
    where: { id: session?.userId },
  });

  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Administrator Profile</h1>
        <p className="text-sm text-secondary font-medium mt-1">Manage your administrative credentials and security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/5 shadow-premium text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary text-white flex items-center justify-center font-bold text-3xl shadow-lg mx-auto mb-4">
              {user.name[0]}
            </div>
            <h3 className="font-bold text-on-surface">{user.name}</h3>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">Super Admin</p>
            
            <button className="w-full mt-8 py-3 bg-surface-container text-secondary font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-outline-variant/10 transition-all border border-outline-variant/10">
              Update Avatar
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <form className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/5 shadow-premium space-y-6">
            <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Account Information</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">Display Name</label>
              <input
                name="name"
                defaultValue={user.name}
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                defaultValue={user.email}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 outline-none transition-all font-medium text-sm opacity-50 cursor-not-allowed"
              />
              <p className="text-[10px] text-secondary font-medium italic opacity-60">Admin email can only be changed via system console.</p>
            </div>

            <div className="pt-4">
              <button className="px-8 py-3 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                Save Changes
              </button>
            </div>
          </form>

          <form className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/5 shadow-premium space-y-6">
            <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs mb-4">Security Settings</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">New Password</label>
                <input
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="px-8 py-3 bg-surface-container text-secondary font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-outline-variant/10 transition-all border border-outline-variant/10">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
