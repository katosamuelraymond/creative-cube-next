"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { ActionState } from "@/lib/definitions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginFormInner() {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    login,
    undefined
  );
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="auth-card">
      {/* Header */}
      <div className="auth-card-header">
        <div className="auth-card-icon">🔐</div>
        <h1 className="auth-card-title">Welcome back</h1>
        <p className="auth-card-subtitle">
          Sign in to your Creative Cube account
        </p>
      </div>

      {/* Global error */}
      {state?.message && !state?.success && (
        <div className="auth-alert auth-alert--error" role="alert">
          {state.message}
        </div>
      )}

      <form action={action} className="auth-form" noValidate>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        {/* Email */}
        <div className="form-group">
          <label htmlFor="login-email" className="form-label">
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`form-input ${state?.errors?.email ? "form-input--error" : ""}`}
            aria-describedby={state?.errors?.email ? "login-email-error" : undefined}
          />
          {state?.errors?.email && (
            <p id="login-email-error" className="form-error">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <div className="form-label-row">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <Link href="/forgot-password" className="form-label-link">
              Forgot password?
            </Link>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className={`form-input ${state?.errors?.password ? "form-input--error" : ""}`}
            aria-describedby={state?.errors?.password ? "login-password-error" : undefined}
          />
          {state?.errors?.password && (
            <p id="login-password-error" className="form-error">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary btn-full"
        >
          {pending ? (
            <span className="btn-spinner">
              <span className="spinner" /> Signing in…
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="auth-divider">
        <span>New to Creative Cube?</span>
      </div>

      {/* Register link */}
      <Link href="/register" className="btn btn-secondary btn-full">
        Create an account
      </Link>

      {/* Demo credentials */}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-loading">Loading…</div>}>
      <LoginFormInner />
    </Suspense>
  );
}
