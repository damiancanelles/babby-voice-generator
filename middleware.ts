export { default } from "next-auth/middleware";

/**
 * Protect all routes except:
 *  - /login         — the sign-in page
 *  - /api/auth/*    — NextAuth's own API routes
 *  - /_next/*       — Next.js internals
 *  - /favicon.ico   — browser favicon request
 */
export const config = {
  matcher: ["/((?!login|api/auth|_next|favicon).*)"],
};
