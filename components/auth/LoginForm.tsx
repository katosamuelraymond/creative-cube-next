"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <div className="auth-card-icon">🔐</div>
        <h1 className="auth-card-title">Welcome back</h1>
        <p className="auth-card-subtitle">Sign in to your Creative Cube account</p>
      </div>

      {state?.message && (
        <div className="auth-alert auth-alert--error" role="alert">
          {state.message}
        </div>
      )}

      <form action={action} className="auth-form" noValidate>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <div className="form-group">
          <label htmlFor="login-email" className="form-label">Email address</label>
          <input
            id="login-email"
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
          <div className="form-label-row">
            <label htmlFor="login-password" className="form-label">Password</label>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className={`form-input${state?.errors?.password ? " form-input--error" : ""}`}
          />
          {state?.errors?.password && (
            <p className="form-error">{state.errors.password[0]}</p>
          )}
        </div>

        <button type="submit" disabled={pending} className="btn btn-primary btn-full">
          {pending ? (
            <span className="btn-spinner"><span className="spinner" /> Signing in…</span>
          ) : "Sign in"}
        </button>
      </form>

      <div className="auth-divider"><span>New to Creative Cube?</span></div>

      <Link href="/register" className="btn btn-secondary btn-full">
        Create an account
      </Link>

      <div className="auth-demo-creds">
        <p className="auth-demo-title">Demo credentials</p>
        <div className="auth-demo-grid">
          <div>
            <p className="auth-demo-role">Customer</p>
            <p>demo@creativecube.com</p>
            <p>Customer@123</p>
          </div>
          <div>
            <p className="auth-demo-role">Admin</p>
            <p>admin@creativecube.com</p>
            <p>Admin@123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
