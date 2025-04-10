import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:any) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(`log from middleware${token}`)
  //  Allow unauthenticated access to the landing page (`/`) and login page (`/login`)
  if (pathname === "/" || pathname.startsWith("/login") || pathname === "/auth/signin") {
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to `/login`
  if (!token) {
    console.log("not token")
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // If authenticated, allow access 
  return NextResponse.next();
}

// Apply middleware to all except `/` and `/login`
export const config = {
  matcher: ["/dashboard"], // Protect all pages except system files
};