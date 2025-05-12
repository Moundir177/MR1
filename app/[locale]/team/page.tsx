import { Locale } from '../../i18n/settings';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import TeamMembers from '../../components/TeamMembers';
import fs from 'fs';
import path from 'path';
import { motion } from 'framer-motion';

interface TeamPageProps {
  params: {
    locale: Locale;
  };
}

async function getTranslations(locale: Locale) {
  try {
    // Validate that locale is one of the supported locales
    if (!['en', 'fr', 'ar'].includes(locale)) {
      // Return default English translations for invalid locales
      const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
      const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
      return JSON.parse(defaultFileContents);
    }
    
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // Fallback to English if there's an error
    console.error(`Error loading translations for ${locale}:`, error);
    const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
    const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
    return JSON.parse(defaultFileContents);
  }
}

export default async function TeamPage({ params: { locale } }: TeamPageProps) {
  const translations = await getTranslations(locale);
  
  // Handle RTL for Arabic
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations.nav} />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom">
            <div className="text-center mb-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {translations.team.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {translations.team.subtitle}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Team Members Component */}
        <TeamMembers locale={locale} translations={translations.team} />
      </main>
      
      <Footer locale={locale} translations={translations.footer} />
    </div>
  );
} 