import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = [`/nova_aetas`];
const publicRoutes = ['/login', '/signup', '/']; 
const adminRoutes = [`/blog/dashboard`];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const isAdminRoute = adminRoutes.some(route => path.startsWith(route));
   
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
    console.log("Session data:", { userId: session?.userId, userRole: session?.userRole });

    // Admin route logic
    if (isAdminRoute) {
        if (session?.userRole !== 'admin') {
            console.log("Unauthorized admin access attempt:", { path });
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }
    }

    // Protected route logic
    if (isProtectedRoute && !session?.userId) {
        console.log("Unauthorized access to protected route:", { path });
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Public route logic
    if (
        isPublicRoute &&
        session?.userId &&
        session?.userRole !== 'admin' && // Avoid redirecting admins &&
        !req.nextUrl.pathname.startsWith('/nova_aetas')
    ) {
        return NextResponse.redirect(new URL('/nova_aetas', req.nextUrl));
    }

    return NextResponse.next();
}

// Exclude static files and API routes from middleware
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
