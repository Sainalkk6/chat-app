import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isAuthenticated = request.cookies.get("auth") !== undefined;

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login",request.nextUrl.origin));
    }
}

export const config = {
    matcher: ["/"]
}