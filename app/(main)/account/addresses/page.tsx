import { getSession } from "@/lib/session";
import { getUserAddresses } from "@/services/address.service";
import Link from "next/link";

export default async function AddressesPage() {
  const session = await getSession();
  const addresses = await getUserAddresses(session?.userId as string);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Saved Addresses</h1>
          <p className="text-sm text-secondary font-medium mt-1">Manage your delivery locations</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/5 shadow-premium flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary opacity-40">location_on</span>
                {address.isDefault && (
                  <span className="px-2 py-1 bg-primary/10 text-primary font-bold text-[9px] uppercase tracking-widest rounded-md">
                    Default
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm text-on-surface font-bold">{address.street}</p>
                <p className="text-sm text-secondary font-medium">{address.city}, {address.state}</p>
                <p className="text-sm text-secondary font-medium">{address.postalCode}</p>
                <p className="text-sm text-secondary font-medium">{address.country}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-8 pt-6 border-t border-outline-variant/10">
              <button className="text-[11px] font-bold text-secondary uppercase tracking-widest hover:text-primary transition-colors">Edit</button>
              <button className="text-[11px] font-bold text-secondary uppercase tracking-widest hover:text-error transition-colors">Remove</button>
              {!address.isDefault && (
                <button className="ml-auto text-[11px] font-bold text-primary uppercase tracking-widest hover:underline">Set Default</button>
              )}
            </div>
          </div>
        ))}

        {addresses.length === 0 && (
          <div className="md:col-span-2 bg-surface-container/20 p-12 rounded-3xl border border-dashed border-outline-variant/20 text-center">
            <p className="text-sm text-secondary font-medium italic">You haven't saved any addresses yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
