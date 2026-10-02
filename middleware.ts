import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const AUTH_COOKIE_NAME = "quizee_auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "quizee-super-secret-jwt-key-change-in-production-min32chars!";
const secretKey = new TextEncoder().encode(JWT_SECRET);

async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return !!payload?.userId;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = await isValidToken(token);

  // Protected paths
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  // Auth pages (login, signup, sign-in, sign-up)
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/sign-in" ||
    pathname === "/sign-up";

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/login",
    "/signup",
    "/sign-in",
    "/sign-up",
  ],
};
