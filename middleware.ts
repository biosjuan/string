import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authenticaedApiRoutes = [
    pathname.startsWith("/api/users"),
    pathname.startsWith("/api/posts"),
    pathname.startsWith("/api/follows"),
  ];

  if (authenticaedApiRoutes.includes(true)) {
    const cookie = request.cookies.get("jwt-token");
    if (!cookie || !cookie?.value) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const res = await jwtVerify(cookie.value, secret);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
  }
}

export const config = {
  matcher: "/:path*",
};
