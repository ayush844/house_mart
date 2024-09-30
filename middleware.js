import { NextResponse } from 'next/server';
import authMiddleware from 'next-auth/middleware'; // Import the default next-auth middleware

export function middleware(req) {
  const contentLength = req.headers.get('content-length') || 0;

  const maxContentLength = 50 * 1024 * 1024; // 50 MB

  if (parseInt(contentLength, 10) > maxContentLength) {
    return new NextResponse('Payload too large', { status: 413 });
  }

  // Call next-auth middleware after content-length check
  return authMiddleware(req);
}

export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
