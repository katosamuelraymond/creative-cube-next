"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ActionState } from "@/lib/definitions";

type Props = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  callbackUrl: string;
};

export function LoginForm({ action, callbackUrl }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <div className="w-full animate-scale-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-headline-md text-3xl font-bold text-on-surface mb-2 tracking-tight">Welcome Back</h2>
        <p className="font-body-md text-secondary font-medium text-sm">Please enter your details to sign in.</p>
      </div>

      {state?.message && (
        <div className="bg-error-container/20 border border-error/10 p-3 rounded-xl mb-6 flex items-center gap-3 animate-fade-in" role="alert">
          <span className="material-symbols-outlined text-error text-xl">error</span>
          <p className="text-[10px] font-bold text-error uppercase tracking-widest">{state.message}</p>
        </div>
      )}

      {/* Form */}
      <form action={formAction} className="space-y-4" noValidate>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <div className="space-y-1.5">
          <label className="font-label-md text-[10px] font-bold text-secondary uppercase tracking-[0.2em]" htmlFor="login-email">
            Email Address
          </label>
          <input
            id="login-email"
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
          <div className="flex justify-between items-end">
            <label className="font-label-md text-[10px] font-bold text-secondary uppercase tracking-[0.2em]" htmlFor="login-password">
              Password
            </label>
            <Link href="#" className="font-label-md text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">
              Forgot?
            </Link>
          </div>
          <div className="relative group">
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className={`w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-body-md text-sm text-on-surface placeholder:text-outline/40 shadow-sm ${
                state?.errors?.password ? "border-error" : ""
              }`}
            />
            <button 
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
          {state?.errors?.password && (
            <p className="text-[10px] font-bold text-error uppercase tracking-wider mt-1">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center">
            <input 
              type="checkbox" 
              className="peer appearance-none w-5 h-5 border-2 border-outline-variant/30 rounded-lg checked:bg-primary checked:border-primary transition-all cursor-pointer shadow-sm"
            />
            <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none text-sm left-0.5" style={{ fontVariationSettings: "'wght' 700" }}>
              check
            </span>
          </div>
          <span className="font-label-md text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Remember Me</span>
        </div>

        <button 
          type="submit" 
          disabled={pending} 
          className="w-full bg-primary text-white font-bold text-xs py-4 rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Signing In..." : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6 flex items-center">
        <div className="flex-grow border-t border-outline-variant/10"></div>
        <span className="flex-shrink mx-4 font-label-md text-[10px] font-bold text-secondary uppercase tracking-widest opacity-40">Or continue with</span>
        <div className="flex-grow border-t border-outline-variant/10"></div>
      </div>

      {/* Social Logins */}
      <button className="w-full flex items-center justify-center gap-4 px-6 py-3.5 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low transition-all active:scale-98 shadow-sm group">
        <img 
          alt="Google" 
          className="w-4 h-4 group-hover:scale-110 transition-transform" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZQGIqzsUSi3Pc2L2SCkBdpSMamuepuZQNssRXoAYSNqrIxHDIB2Im3jYyUP7SnCVRnkVOcVqWzWWAp9BTDKBxhhv7YeUp6egROv9feE9olDdGLXx0DviotsBxt1rFapXfXswvgomQxHUxNoln1zHKqD5o4V_PxfFYq0sONDHpawo45zZJF0BB_kjzfRZYWVgIFzRWZPf9zABCFWnC_QnanBloy-Xjfi_pSqaDu8SH7SKI6ld2Wku35AXRYuyQ0UvRCimUBr8T9qDN" 
        />
        <span className="font-bold text-[10px] uppercase tracking-widest text-on-surface">Continue with Google</span>
      </button>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="font-body-sm text-xs text-secondary font-medium">
          Don&apos;t have an account? 
          <Link href="/register" className="text-primary font-bold hover:underline ml-2 uppercase tracking-widest text-[10px] transition-all">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
