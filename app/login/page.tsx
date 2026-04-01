"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.push("/");
  }, [status, router]);

  async function handleGoogleSignIn() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  }

  if (status === "loading" || status === "authenticated") {
    return (
      <div style={fullPage}>
        <span style={{ color: "#BBA8D4", fontSize: 14 }}>Loading…</span>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div style={fullPage}>
        {/* Decorative orbs */}
        <div className="login-orb login-orb--pink-tl" />
        <div className="login-orb login-orb--blue-br" />
        <div className="login-orb login-orb--fuchsia-tr" />
        <div className="login-orb login-orb--indigo-bl" />

        {/* Card */}
        <div className="login-card">

          {/* Logo + branding */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <div className="login-logo">👶</div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <h1 className="login-title" style={{ fontWeight: 800, color: "#1A0533", margin: 0, textAlign: "center" }}>
                Baby Voice Generator
              </h1>
              <span style={revealBadge}>✨ Gender Reveal Voice Studio</span>
              <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>
                Sign in to start creating
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, backgroundColor: "#F3F4F6" }} />

          {/* Google button + note */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="login-google-btn"
              style={{
                backgroundColor: loading ? "#F9FAFB" : "#FFFFFF",
                cursor: loading ? "default" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.borderColor = "#8B5CF6";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(139,92,246,0.18)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              {loading ? (
                <span style={{ color: "#9CA3AF", fontSize: 15 }}>Redirecting…</span>
              ) : (
                <>
                  <GoogleIcon />
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#1A0533" }}>
                    Continue with Google
                  </span>
                </>
              )}
            </button>

            <p style={{ fontSize: 12, color: "#B0A8C0", textAlign: "center", lineHeight: 1.5, margin: 0, maxWidth: 280 }}>
              Your data is private and only visible to you.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

// ── Static styles (CSS string with responsive breakpoints) ────────────────────

const styles = `
  /* Full-page wrapper */
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #18042E;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  /* Card */
  .login-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    background-color: #FFFFFF;
    border-radius: 24px;
    padding: 48px 40px;
    box-shadow: 0 24px 64px rgba(139,92,246,0.25), 0 4px 16px rgba(0,0,0,0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }

  /* Logo bubble */
  .login-logo {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #F9A8D4, #C4B5FD);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    flex-shrink: 0;
  }

  /* Title */
  .login-title { font-size: 22px; }

  /* Google button */
  .login-google-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 14px 24px;
    border-radius: 14px;
    border: 1.5px solid #E5E7EB;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
  }

  /* Decorative orbs */
  .login-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .login-orb--pink-tl {
    width: 400px; height: 400px;
    top: -80px; left: -80px;
    background: #F9A8D4; opacity: 0.45;
    filter: blur(60px);
  }
  .login-orb--blue-br {
    width: 340px; height: 340px;
    bottom: -60px; right: -60px;
    background: #BAE6FD; opacity: 0.4;
    filter: blur(60px);
  }
  .login-orb--fuchsia-tr {
    width: 220px; height: 220px;
    top: 30px; right: 8%;
    background: #F472B6; opacity: 0.35;
    filter: blur(50px);
  }
  .login-orb--indigo-bl {
    width: 180px; height: 180px;
    bottom: 12%; left: 5%;
    background: #818CF8; opacity: 0.38;
    filter: blur(50px);
  }

  /* ── Mobile (≤ 480px) ───────────────────────────────────────────────────── */
  @media (max-width: 480px) {
    .login-card {
      padding: 36px 24px;
      gap: 22px;
      border-radius: 20px;
    }
    .login-logo {
      width: 60px;
      height: 60px;
      font-size: 28px;
    }
    .login-title { font-size: 19px; }
    .login-google-btn {
      padding: 13px 16px;
      border-radius: 12px;
    }

    /* Shrink orbs so they don't cause layout issues */
    .login-orb--pink-tl   { width: 240px; height: 240px; top: -50px; left: -50px; filter: blur(50px); }
    .login-orb--blue-br   { width: 200px; height: 200px; bottom: -40px; right: -40px; filter: blur(50px); }
    .login-orb--fuchsia-tr { width: 140px; height: 140px; top: 20px; right: 4%; filter: blur(40px); }
    .login-orb--indigo-bl  { width: 120px; height: 120px; filter: blur(40px); }
  }
`;

// ── Inline styles (non-responsive values) ─────────────────────────────────────

const fullPage: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#18042E",
  padding: 24,
  overflow: "hidden",
  zIndex: 50,
};

const revealBadge: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  background: "linear-gradient(90deg, #FBCFE8, #DDD6FE)",
  color: "#7C3AED",
  fontSize: 11,
  fontWeight: 600,
  padding: "5px 14px",
  borderRadius: 100,
};

// ── Google SVG icon ───────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
