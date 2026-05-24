import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-cream)" }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--color-charcoal-900) 0%, var(--color-brand-900) 60%, var(--color-brand-800) 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Decorative grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 70% 30%, rgba(184,105,42,0.18) 0%, transparent 60%)",
          }}
        />

        <div className="container-xl relative" style={{ zIndex: 1 }}>
          <div style={{ maxWidth: "640px" }}>
            <span
              className="badge badge-brand animate-fade-in"
              style={{ animationDelay: "0.1s", marginBottom: "1.5rem" }}
            >
              New Collection 2026
            </span>
            <h1
              className="animate-fade-in-up"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                animationDelay: "0.2s",
              }}
            >
              Furniture That
              <br />
              <span style={{ color: "var(--color-brand-300)" }}>
                Tells Your Story
              </span>
            </h1>
            <p
              className="animate-fade-in-up"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.125rem",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                animationDelay: "0.35s",
              }}
            >
              Discover handcrafted premium furniture designed to transform your
              living spaces. From statement sofas to artisan dining sets.
            </p>
            <div
              className="animate-fade-in-up"
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                animationDelay: "0.5s",
              }}
            >
              <Link href="/products" className="btn btn-primary btn-lg">
                Shop Collection
              </Link>
              <Link href="/products?featured=true" className="btn btn-outline btn-lg"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div style={{
          position: "absolute", right: "-5rem", bottom: "-5rem",
          width: "40rem", height: "40rem",
          borderRadius: "50%",
          border: "1px solid rgba(184,105,42,0.15)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "-2rem", bottom: "-2rem",
          width: "25rem", height: "25rem",
          borderRadius: "50%",
          border: "1px solid rgba(184,105,42,0.1)",
          pointerEvents: "none",
        }} />
      </section>

      {/* ── Build-in-progress banner ─────────────────────────────────────────── */}
      <section style={{ padding: "4rem 0", textAlign: "center" }}>
        <div className="container-xl">
          <div className="card" style={{ padding: "3rem", maxWidth: 640, margin: "0 auto" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🪑</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", marginBottom: "0.75rem" }}>
              Creative Cube is Being Built
            </h2>
            <div className="divider" style={{ margin: "0.75rem auto 1.5rem" }} />
            <p style={{ color: "var(--color-charcoal-500)", marginBottom: "2rem" }}>
              Phase 1 complete: Project setup, design system, Prisma schema, folder
              structure, and middleware are all in place. Coming next: database
              migration + auth system.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { label: "✅ Phase 1: Setup", done: true },
                { label: "⬜ Phase 2: Database", done: false },
                { label: "⬜ Phase 3: Auth", done: false },
                { label: "⬜ Phase 4: Products", done: false },
              ].map((p) => (
                <span key={p.label} className={`badge ${p.done ? "badge-success" : "badge-neutral"}`}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
