import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getSession();
  const user = await prisma.user.findUnique({
    where: { id: session?.userId },
  });

  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Profile Settings</h1>
        <p className="text-sm text-secondary font-medium mt-1">Update your personal information and security</p>
      </div>

      <form className="space-y-8 max-w-2xl">
        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/5 shadow-premium space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Full Name</label>
            <input
              name="name"
              defaultValue={user.name}
              className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              disabled
              className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 outline-none transition-all font-medium opacity-50 cursor-not-allowed"
            />
            <p className="text-[10px] text-secondary font-medium ml-1">Email cannot be changed for security reasons.</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/5 shadow-premium space-y-6">
          <h3 className="font-bold text-on-surface uppercase tracking-widest text-xs">Security</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">New Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="Leave blank to keep current"
              className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary uppercase tracking-widest ml-1">Confirm New Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
