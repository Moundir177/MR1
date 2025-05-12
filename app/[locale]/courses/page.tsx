"use client";

import { Locale } from '../../i18n/settings';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import CourseCatalog from '../../components/CourseCatalog';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CoursesPageProps {
  params: {
    locale: Locale;
  };
}

export default function CoursesPage({ params: { locale } }: CoursesPageProps) {
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchTranslations() {
      try {
        const response = await fetch(`/api/translations?locale=${locale}`);
        const data = await response.json();
        setTranslations(data.translations);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching translations:", error);
        // Use fallback data
        setTranslations({
          nav: {},
          footer: {},
          courses: {
            title: locale === 'fr' ? 'Nos Cours' : locale === 'ar' ? 'دوراتنا' : 'Our Courses'
          },
          cta: {
            title: locale === 'fr' ? 'Prêt à commencer?' : locale === 'ar' ? 'مستعد للبدء؟' : 'Ready to get started?',
            description: locale === 'fr' ? 'Inscrivez-vous dès aujourd\'hui et commencez votre parcours d\'apprentissage' : locale === 'ar' ? 'سجل اليوم وابدأ رحلة التعلم الخاصة بك' : 'Register today and start your learning journey',
            register: locale === 'fr' ? 'S\'inscrire maintenant' : locale === 'ar' ? 'سجل الآن' : 'Register now',
            contact: locale === 'fr' ? 'Contactez-nous' : locale === 'ar' ? 'اتصل بنا' : 'Contact us'
          }
        });
        setIsLoading(false);
      }
    }
    
    fetchTranslations();
  }, [locale]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
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
                {translations.courses?.title || (locale === 'fr' ? 'Nos Cours' : locale === 'ar' ? 'دوراتنا' : 'Our Courses')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {/* Description text about courses */}
                {locale === 'fr' 
                  ? "Explorez notre gamme complète de cours conçus pour vous aider à atteindre vos objectifs académiques et professionnels."
                  : locale === 'ar'
                  ? "استكشف مجموعتنا الكاملة من الدورات المصممة لمساعدتك على تحقيق أهدافك الأكاديمية والمهنية."
                  : "Explore our comprehensive range of courses designed to help you achieve your academic and professional goals."}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Courses Catalog Component */}
        <CourseCatalog locale={locale} translations={translations.courses} />
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {translations.cta?.title || (locale === 'fr' ? 'Prêt à commencer?' : locale === 'ar' ? 'مستعد للبدء؟' : 'Ready to get started?')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              {translations.cta?.description || (locale === 'fr' ? 'Inscrivez-vous dès aujourd\'hui et commencez votre parcours d\'apprentissage' : locale === 'ar' ? 'سجل اليوم وابدأ رحلة التعلم الخاصة بك' : 'Register today and start your learning journey')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#" className="inline-block bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
                {translations.cta?.register || (locale === 'fr' ? 'S\'inscrire maintenant' : locale === 'ar' ? 'سجل الآن' : 'Register now')}
              </a>
              <a href="#" className="inline-block bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-lg transition-colors">
                {translations.cta?.contact || (locale === 'fr' ? 'Contactez-nous' : locale === 'ar' ? 'اتصل بنا' : 'Contact us')}
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer locale={locale} translations={translations.footer} />
    </div>
  );
} 