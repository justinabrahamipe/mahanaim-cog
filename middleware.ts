import { NextResponse, type NextRequest } from 'next/server';
import { features } from '@/config/features';

// Sections switched off in src/config/features.ts answer with a real 404.
// Calling notFound() inside those pages isn't enough on its own: Next prerenders
// them and serves the not-found screen with a 200 status, which search engines
// can index as an empty page. Rewriting to a path that doesn't exist gives a true 404.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isMagazine = pathname === '/youth/magazine' || pathname.startsWith('/youth/magazine/');
  const isReels = pathname === '/youth';

  if ((isMagazine && !features.magazine) || (isReels && !features.youthReels)) {
    return NextResponse.rewrite(new URL('/__not-launched__', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/youth', '/youth/:path*'],
};
