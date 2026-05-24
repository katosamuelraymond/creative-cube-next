import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Account",
    template: "%s | Creative Cube",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      {/* Left panel — decorative */}
      <div className="auth-panel">
        <Link href="/" className="auth-logo">
          <span className="auth-logo-icon">◆</span>
          <span>Creative Cube</span>
        </Link>

        <div className="auth-panel-content">
          <blockquote className="auth-quote">
            &ldquo;Every great room begins with a single piece of furniture that
            tells your story.&rdquo;
          </blockquote>
          <p className="auth-quote-author">— Creative Cube Design Studio</p>
        </div>

        {/* Decorative furniture silhouettes */}
        <div className="auth-panel-deco" aria-hidden="true">
          <div className="auth-deco-circle auth-deco-circle--lg" />
          <div className="auth-deco-circle auth-deco-circle--sm" />
        </div>
      </div>

      {/* Right panel — form */}
      <div className="auth-form-panel">
        <div className="auth-form-container">{children}</div>
      </div>
    </div>
  );
}
