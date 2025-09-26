import { redirect } from 'react-router-dom';
import { parseCookies } from 'nookies';

interface MiddlewareConfig {
  protectedRoutes: string[];
  guestOnlyRoutes: string[];
}

const config: MiddlewareConfig = {
  protectedRoutes: ['/profile'],
  guestOnlyRoutes: ['/'],
};

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const { 'auth.access_token': token } = parseCookies();

  const isProtectedRoute = config.protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isGuestOnlyRoute = config.guestOnlyRoutes.includes(pathname);

  if (isProtectedRoute && !token) {
    throw redirect('/');
  }

  if (isGuestOnlyRoute && token) {
    throw redirect('/profile');
  }

  const allKnownRoutes = [...config.protectedRoutes, ...config.guestOnlyRoutes];

  const isKnownRoute = allKnownRoutes.some(
    (route) => pathname === route,
  );

  if (!isKnownRoute) {
    throw redirect('/');
  }

  return null;
}
