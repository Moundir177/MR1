export const locales = ['fr', 'ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  ar: 'العربية',
  en: 'English'
};

export const localeDirs: Record<Locale, string> = {
  fr: 'ltr',
  ar: 'rtl',
  en: 'ltr',
}; 