import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  const pathName = req.nextUrl.pathname;

  if (pathName.startsWith("/user") && !session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (pathName.startsWith("/admin") && session?.role !== "Admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathName.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// export const config = { matcher: ["/admin/:path*", "/user"] };
