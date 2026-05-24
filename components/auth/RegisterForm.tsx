"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import Link from "next/link";

export function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <div className="auth-card-icon">✨</div>
        <h1 className="auth-card-title">Create account</h1>
        <p className="auth-card-subtitle">Join Creative Cube and start furnishing your world</p>
      </div>

      {state?.message && (
        <div className="auth-alert auth-alert--error" role="alert">
          {state.message}
        </div>
      )}

      <form action={action} className="auth-form" noValidate>
        <div className="form-group">
          <label htmlFor="reg-name" className="form-label">Full name</label>
          <input
            id="reg-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            className={`form-input${state?.errors?.name ? " form-input--error" : ""}`}
          />
          {state?.errors?.name && (
            <p className="form-error">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="reg-email" className="form-label">Email address</label>
          <input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`form-input${state?.errors?.email ? " form-input--error" : ""}`}
          />
          {state?.errors?.email && (
            <p className="form-error">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="reg-password" className="form-label">Password</label>
          <input
            id="reg-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            className={`form-input${state?.errors?.password ? " form-input--error" : ""}`}
          />
          {state?.errors?.password && (
            <ul className="form-error-list">
              {state.errors.password.map((err) => (
                <li key={err}>• {err}</li>
              ))}
            </ul>
          )}
          <p className="form-hint">Must be 8+ characters with a letter and a number.</p>
        </div>

        <button type="submit" disabled={pending} className="btn btn-primary btn-full">
          {pending ? (
            <span className="btn-spinner"><span className="spinner" /> Creating account…</span>
          ) : "Create account"}
        </button>
      </form>

      <div className="auth-divider"><span>Already have an account?</span></div>

      <Link href="/login" className="btn btn-secondary btn-full">
        Sign in instead
      </Link>

      <p className="auth-terms">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="auth-terms-link">Terms of Service</Link>{" "}
        and{" "}
        <Link href="/privacy" className="auth-terms-link">Privacy Policy</Link>.
      </p>
    </div>
  );
}
