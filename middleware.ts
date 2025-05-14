import { NextRequest, NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from './app/i18n/settings';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const localeList: string[] = [...locales];
  
  let browserLocale: string | undefined;
  try {
    const negotiator = new Negotiator({ headers: negotiatorHeaders });
    browserLocale = negotiator.language(localeList);
  } catch (error) {
    // Failed to get browser locale, use default
  }

  const locale = browserLocale || defaultLocale;
  return matchLocale([locale], localeList, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring _next/ and API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 