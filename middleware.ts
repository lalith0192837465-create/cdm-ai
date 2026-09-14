import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Public landing/demo/setup pages must never invoke the auth middleware.
// Only the workspace and protected API routes below require a signed-in user.
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const signIn = new URL("/signin", request.url);
    signIn.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }
  return NextResponse.next();
}

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
