export { default } from "next-auth/middleware";

// Public pages (/, /demo, /onboarding, /run-local, /signin) stay open for
// demos and onboarding. Only the actual workspace and protected APIs require login.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/deals/:path*",
    "/review/:path*",
    "/api/deals/:path*",
    "/api/calls",
    "/api/calls/start",
    "/api/calls/:id",
    "/api/calls/:id/confirm",
  ],
};

// Production redeploy marker.
