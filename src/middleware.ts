import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let API routes pass through
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Run intl middleware first
  const response = intlMiddleware(request);

  // Check if this is a protected route
  const localeMatch = pathname.match(/^\/(pt|en|es|fr)\//);
  const locale = localeMatch ? localeMatch[1] : 'pt';
  const pathWithoutLocale = localeMatch ? pathname.slice(localeMatch[0].length - 1) : pathname;

  const isDashboard = pathWithoutLocale.startsWith('/dashboard');
  const isAdmin = pathWithoutLocale.startsWith('/admin');

  if (!isDashboard && !isAdmin) {
    return response;
  }

  // Create Supabase client from request cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Not logged in → redirect to login
  if (!user) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Admin route → check admin status
  if (isAdmin) {
    const { data } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!data?.is_admin) {
      const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(pt|en|es|fr)/:path*'],
};
