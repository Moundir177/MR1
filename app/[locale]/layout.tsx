import { Metadata } from 'next';
import { locales, localeDirs, Locale } from '../i18n/settings';
import '../globals.css';

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
      <body className="font-sans bg-background min-h-screen">
        {children}
      </body>
    </html>
  );
} 