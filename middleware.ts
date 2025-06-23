import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Định nghĩa route matcher để kiểm soát route
const isProtectedRoute = createRouteMatcher([
  '/((?!_next|[^?]*\\.(?:png|jpg|jpeg|gif|ico|svg|css|js|woff2?|ttf|otf)|api/trpc|trpc|.*\\..*).*)',
]);

export default clerkMiddleware((auth, req) => {
  // Kiểm tra nếu route được bảo vệ
  if (isProtectedRoute(req)) {
    // Kiểm tra header từ req
    const headers = req.headers; // Giả định req.headers là Headers object
    const xForwardedHost = headers.get('x-forwarded-host') || headers.get('host') || 'fluffy-cod-74vwpvj69v9fx67j-3000.app.github.dev';

    if (xForwardedHost) {
      const protocol = headers.get('x-forwarded-proto') || 'https';
      const newOrigin = `${protocol}://${xForwardedHost}`;

      const requestHeaders = new Headers();
      requestHeaders.set('Origin', newOrigin);
      requestHeaders.set('X-Forwarded-Host', xForwardedHost);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:png|jpg|jpeg|gif|ico|svg|css|js|woff2?|ttf|otf)|api/trpc|trpc|.*\\..*).*)',
  ],
};