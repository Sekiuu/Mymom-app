import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";
import path from 'path';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

    // If there's no token and the route is not public, redirect to login.
    if (!token) {
        if(!pathname.endsWith('/login') && !pathname.endsWith('/signup'))
            return NextResponse.redirect(new URL("/login", req.url));
    }
    else{
        if(pathname.endsWith('/login') || pathname.endsWith('/signup'))
            return NextResponse.redirect(new URL("/", req.url));
    }

    // If there is a token, allow the request to proceed.
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/feeder', '/profile', '/login', '/signup'],
};
