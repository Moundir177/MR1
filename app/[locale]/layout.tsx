import { Metadata } from 'next';
import { Inter, Playfair_Display, Cairo } from 'next/font/google';
import { locales, localeDirs, Locale } from '../i18n/settings';
import '../globals.css';

// Font declarations
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'MIRA ACADEMY | Centre de formation professionnelle',
  description: 'Centre de formation professionnelle en Algérie offrant des programmes de haute qualité pour préparer nos étudiants aux métiers d\'avenir.',
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={locale} dir={localeDirs[locale]}>
      <body className={`${inter.variable} ${playfair.variable} ${cairo.variable} font-sans bg-background min-h-screen`}>
        {children}
      </body>
    </html>
  );
} 