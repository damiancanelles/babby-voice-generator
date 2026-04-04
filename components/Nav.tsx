"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLang } from "@/components/LangProvider";

export default function Nav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { lang, setLang, t } = useLang();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  const user = session?.backendUser;

  return (
    <>
      <style>{navStyles}</style>
      <nav className="nav-root">
        <div className="nav-inner max-w-5xl mx-auto">

          {/* Logo */}
          <Link href="/" className="nav-logo">
            <span>👶</span>
            <span className="nav-logo-text">Baby Voice Generator</span>
          </Link>

          <div style={{ flex: 1 }} />

          {/* Page links */}
          <Link href="/" className={`nav-link${isActive("/") ? " nav-link--active" : ""}`}>
            {t("nav_upload")}
          </Link>
          <Link href="/jobs" className={`nav-link${isActive("/jobs") ? " nav-link--active" : ""}`}>
            {t("nav_jobs")}
          </Link>

          {/* Language toggle */}
          <div className="nav-lang">
            <button
              onClick={() => setLang("en")}
              className={`nav-lang-btn${lang === "en" ? " nav-lang-btn--active" : ""}`}
            >
              EN
            </button>
            <span style={{ color: "#4B2C6E" }}>|</span>
            <button
              onClick={() => setLang("es")}
              className={`nav-lang-btn${lang === "es" ? " nav-lang-btn--active" : ""}`}
            >
              ES
            </button>
          </div>

          {/* Avatar + Sign out */}
          {user && (
            <div className="nav-user">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name ?? user.email}
                  referrerPolicy="no-referrer"
                  className="nav-avatar"
                />
              ) : (
                <div className="nav-avatar nav-avatar--initials">
                  {(user.name ?? user.email).charAt(0).toUpperCase()}
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="nav-signout"
              >
                {t("nav_signout")}
              </button>
            </div>
          )}

        </div>
      </nav>
    </>
  );
}

const navStyles = `
  .nav-root {
    background-color: #18042E;
    width: 100%;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 0 24px;
    height: 64px;
  }

  .nav-logo {
    color: #FFFFFF;
    font-weight: 700;
    font-size: 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .nav-link {
    font-size: 14px;
    font-weight: 500;
    color: #BBA8D4;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color 0.15s;
  }
  .nav-link--active {
    font-weight: 600;
    color: #F472B6;
  }

  .nav-user {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .nav-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #6D28D9;
    flex-shrink: 0;
  }
  .nav-avatar--initials {
    background: linear-gradient(135deg, #F9A8D4, #C4B5FD);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #7C3AED;
    object-fit: unset;
  }

  .nav-signout {
    background: none;
    border: 1px solid #4B2C6E;
    border-radius: 8px;
    padding: 5px 12px;
    font-size: 13px;
    color: #BBA8D4;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .nav-signout:hover {
    border-color: #8B5CF6;
    color: #FFFFFF;
  }

  .nav-lang {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .nav-lang-btn {
    background: none;
    border: none;
    font-size: 12px;
    font-weight: 600;
    color: #BBA8D4;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    transition: color 0.15s;
  }
  .nav-lang-btn--active {
    color: #F472B6;
  }
  .nav-lang-btn:hover {
    color: #FFFFFF;
  }

  /* ── Mobile ── */
  @media (max-width: 600px) {
    .nav-inner {
      height: auto;
      min-height: 56px;
      padding: 10px 16px;
      gap: 14px;
      flex-wrap: nowrap;
    }

    .nav-logo-text {
      display: none;
    }

    .nav-link {
      font-size: 13px;
    }

    .nav-signout {
      font-size: 12px;
      padding: 4px 10px;
    }
  }
`;
