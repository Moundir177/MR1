import { Locale } from '../../i18n/settings';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import FAQ from '../../components/Faq';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface FAQPageProps {
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

export default async function FAQPage({ params: { locale } }: FAQPageProps) {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {translations.faq.title}
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                {translations.faq.subtitle}
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Component */}
        <FAQ locale={locale} translations={translations.faq} />
        
        {/* Contact CTA */}
        <section className="py-20 bg-neutral-light/30">
          <div className="container-custom">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">
                {locale === 'fr' 
                  ? "Vous avez d'autres questions?" 
                  : locale === 'ar' 
                  ? "هل لديك أسئلة أخرى؟" 
                  : "Have more questions?"}
              </h2>
              <p className="text-neutral mb-6 max-w-xl mx-auto">
                {locale === 'fr'
                  ? "Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter. Notre équipe est là pour vous aider."
                  : locale === 'ar'
                  ? "إذا لم تجد إجابة لسؤالك، فلا تتردد في الاتصال بنا. فريقنا موجود لمساعدتك."
                  : "If you can't find the answer to your question, feel free to contact us. Our team is here to help you."}
              </p>
              <Link 
                href={`/${locale}/contact`}
                className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {locale === 'fr' 
                  ? "Contactez-nous" 
                  : locale === 'ar' 
                  ? "اتصل بنا" 
                  : "Contact Us"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer locale={locale} translations={translations.footer} />
    </div>
  );
} 