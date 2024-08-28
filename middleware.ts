import NextAuth from 'next-auth'
import authConfig from './auth/split-auth'
import { NextResponse } from 'next/server';

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const protectedPaths = ['/Donationsform', '/Donationslist', '/Register'];
    if (!req.auth) {
        if (protectedPaths.includes(req.nextUrl.pathname)) {
            const newUrl = new URL("/", req.nextUrl.origin)
            return Response.redirect(newUrl)
        }
    }
    return NextResponse.next()
})