"use client";

import { Locale } from '../../i18n/settings';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface TestimonialsPageProps {
  params: {
    locale: Locale;
  };
}

export default function TestimonialsPage({ params: { locale } }: TestimonialsPageProps) {
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
          testimonials: {
            title: locale === 'fr' ? 'Témoignages' : locale === 'ar' ? 'الشهادات' : 'Testimonials',
            subtitle: locale === 'fr' ? 'Ce que nos étudiants disent de nous' : locale === 'ar' ? 'ما يقوله طلابنا عنا' : 'What our students say about us'
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
                {translations.testimonials?.title || (locale === 'fr' ? 'Témoignages' : locale === 'ar' ? 'الشهادات' : 'Testimonials')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {translations.testimonials?.subtitle || (locale === 'fr' ? 'Ce que nos étudiants disent de nous' : locale === 'ar' ? 'ما يقوله طلابنا عنا' : 'What our students say about us')}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Testimonials Component */}
        <Testimonials locale={locale} translations={translations.testimonials} />
        
        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
              >
                {locale === 'fr' 
                  ? "Histoires de Réussite" 
                  : locale === 'ar' 
                  ? "قصص النجاح" 
                  : "Success Stories"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {locale === 'fr'
                  ? "Découvrez comment nos anciens étudiants ont transformé leur carrière après avoir suivi nos formations."
                  : locale === 'ar'
                  ? "اكتشف كيف قام طلابنا السابقون بتحويل حياتهم المهنية بعد الالتحاق ببرامجنا التعليمية."
                  : "Discover how our alumni have transformed their careers after completing our programs."}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Success Story 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Success Story" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-dark mb-2">
                    {locale === 'fr' 
                      ? "De Débutant à Développeur Front-End" 
                      : locale === 'ar' 
                      ? "من مبتدئ إلى مطور واجهة أمامية" 
                      : "From Beginner to Front-End Developer"}
                  </h3>
                  <p className="text-neutral mb-4">
                    {locale === 'fr'
                      ? "Après six mois de formation intensive, Sarah a décroché un poste de développeur front-end dans une startup technologique de premier plan."
                      : locale === 'ar'
                      ? "بعد ستة أشهر من التدريب المكثف، حصلت سارة على وظيفة كمطور واجهة أمامية في شركة تقنية ناشئة رائدة."
                      : "After six months of intensive training, Sarah landed a position as a front-end developer at a leading tech startup."}
                  </p>
                  <Link 
                    href={`/${locale}/stories/1`}
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center transition-colors"
                  >
                    {locale === 'fr' 
                      ? "Lire l'histoire complète" 
                      : locale === 'ar' 
                      ? "اقرأ القصة كاملة" 
                      : "Read the full story"}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'mr-1' : 'ml-1'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
              
              {/* Success Story 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Success Story" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-dark mb-2">
                    {locale === 'fr' 
                      ? "Reconversion Professionnelle Réussie" 
                      : locale === 'ar' 
                      ? "إعادة التدريب المهني الناجح" 
                      : "Successful Career Change"}
                  </h3>
                  <p className="text-neutral mb-4">
                    {locale === 'fr'
                      ? "Ancien comptable, Mohammed a complètement changé de carrière après notre formation en marketing digital et travaille maintenant comme spécialiste SEO."
                      : locale === 'ar'
                      ? "بعد أن كان محاسبًا، غير محمد مهنته تمامًا بعد تدريبنا في التسويق الرقمي ويعمل الآن كمتخصص في تحسين محركات البحث."
                      : "A former accountant, Mohammed completely changed careers after our digital marketing training and now works as an SEO specialist."}
                  </p>
                  <Link 
                    href={`/${locale}/stories/2`}
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center transition-colors"
                  >
                    {locale === 'fr' 
                      ? "Lire l'histoire complète" 
                      : locale === 'ar' 
                      ? "اقرأ القصة كاملة" 
                      : "Read the full story"}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'mr-1' : 'ml-1'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
              
              {/* Success Story 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Success Story" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-dark mb-2">
                    {locale === 'fr' 
                      ? "Du Stagiaire au Chef de Projet" 
                      : locale === 'ar' 
                      ? "من متدرب إلى مدير مشروع" 
                      : "From Intern to Project Manager"}
                  </h3>
                  <p className="text-neutral mb-4">
                    {locale === 'fr'
                      ? "Après avoir commencé comme stagiaire chez nous, Amina a suivi plusieurs de nos cours et est maintenant chef de projet dans une agence digitale internationale."
                      : locale === 'ar'
                      ? "بعد أن بدأت كمتدربة لدينا، حضرت أمينة العديد من دوراتنا وهي الآن مديرة مشروع في وكالة رقمية دولية."
                      : "After starting as an intern with us, Amina took several of our courses and is now a project manager at an international digital agency."}
                  </p>
                  <Link 
                    href={`/${locale}/stories/3`}
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center transition-colors"
                  >
                    {locale === 'fr' 
                      ? "Lire l'histoire complète" 
                      : locale === 'ar' 
                      ? "اقرأ القصة كاملة" 
                      : "Read the full story"}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'mr-1' : 'ml-1'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
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
              {locale === 'fr' 
                ? "Prêt à Écrire Votre Propre Histoire de Réussite?" 
                : locale === 'ar' 
                ? "هل أنت مستعد لكتابة قصة نجاحك الخاصة؟" 
                : "Ready to Write Your Own Success Story?"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              {locale === 'fr'
                ? "Rejoignez notre communauté d'apprenants et commencez votre parcours vers de nouvelles opportunités professionnelles."
                : locale === 'ar'
                ? "انضم إلى مجتمع المتعلمين لدينا وابدأ رحلتك نحو فرص مهنية جديدة."
                : "Join our community of learners and start your journey toward new career opportunities."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href={`/${locale}/courses`} className="inline-block bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
                {locale === 'fr' 
                  ? "Explorer Nos Cours" 
                  : locale === 'ar' 
                  ? "استكشف دوراتنا" 
                  : "Explore Our Courses"}
              </Link>
              <Link href={`/${locale}/contact`} className="inline-block bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-lg transition-colors">
                {locale === 'fr' 
                  ? "Nous Contacter" 
                  : locale === 'ar' 
                  ? "اتصل بنا" 
                  : "Contact Us"}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer locale={locale} translations={translations.footer} />
    </div>
  );
} 