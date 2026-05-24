"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ActionState } from "@/lib/definitions";

type Props = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
};

export function RegisterForm({ action }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <div className="w-full animate-scale-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-headline-md text-3xl font-bold text-on-surface mb-2 tracking-tight">Create Account</h2>
        <p className="font-body-md text-secondary font-medium text-sm">Join Creative Cube and start furnishing your world.</p>
      </div>

      {state?.message && (
        <div className="bg-error-container/20 border border-error/10 p-3 rounded-xl mb-6 flex items-center gap-3 animate-fade-in" role="alert">
          <span className="material-symbols-outlined text-error text-xl">error</span>
          <p className="text-[10px] font-bold text-error uppercase tracking-widest">{state.message}</p>
        </div>
      )}

      {/* Form */}
      <form action={formAction} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label className="font-label-md text-[10px] font-bold text-secondary uppercase tracking-[0.2em]" htmlFor="reg-name">
            Full Name
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            required
            className={`w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-body-md text-sm text-on-surface placeholder:text-outline/40 shadow-sm ${
              state?.errors?.name ? "border-error" : ""
            }`}
          />
          {state?.errors?.name && (
            <p className="text-[10px] font-bold text-error uppercase tracking-wider mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="font-label-md text-[10px] font-bold text-secondary uppercase tracking-[0.2em]" htmlFor="reg-email">
            Email Address
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
            className={`w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-body-md text-sm text-on-surface placeholder:text-outline/40 shadow-sm ${
              state?.errors?.email ? "border-error" : ""
            }`}
          />
          {state?.errors?.email && (
            <p className="text-[10px] font-bold text-error uppercase tracking-wider mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="font-label-md text-[10px] font-bold text-secondary uppercase tracking-[0.2em]" htmlFor="reg-password">
            Password
          </label>
          <input
            id="reg-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            required
            className={`w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-body-md text-sm text-on-surface placeholder:text-outline/40 shadow-sm ${
              state?.errors?.password ? "border-error" : ""
            }`}
          />
          {state?.errors?.password && (
            <ul className="space-y-1 mt-1">
              {state.errors.password.map((err) => (
                <li key={err} className="text-[10px] font-bold text-error uppercase tracking-wider">• {err}</li>
              ))}
            </ul>
          )}
        </div>

        <button 
          type="submit" 
          disabled={pending} 
          className="w-full bg-primary text-white font-bold text-xs py-4 rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="font-body-sm text-xs text-secondary font-medium">
          Already have an account? 
          <Link href="/login" className="text-primary font-bold hover:underline ml-2 uppercase tracking-widest text-[10px] transition-all">
            Sign In
          </Link>
        </p>
      </div>

      <p className="mt-6 text-[10px] text-secondary font-bold text-center uppercase tracking-widest opacity-40 leading-relaxed">
        By creating an account you agree to our<br />
        <Link href="#" className="underline hover:text-primary">Terms of Service</Link> and <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </div>
  );
}
