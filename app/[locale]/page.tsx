import { Locale } from '../i18n/settings';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Faq from '../components/Faq';
import BlogPreview from '../components/BlogPreview';
import Newsletter from '../components/Newsletter';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import fs from 'fs';
import path from 'path';

interface HomePageProps {
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

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const translations = await getTranslations(locale);

  return (
    <main className="min-h-screen">
      <Navigation locale={locale} translations={translations.nav} />
      <Hero locale={locale} translations={translations.hero} />
      <Features locale={locale} translations={translations.features} />
      
      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {/* Stat 1: Students */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-2">1200+</h3>
                <div className="absolute -top-1 -right-2 transform translate-x-full -translate-y-1/2 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                  +15%
                </div>
              </div>
              <p className="text-neutral">
                {locale === 'fr' ? 'Étudiants formés' : locale === 'ar' ? 'طلاب مدربون' : 'Students trained'}
              </p>
            </div>
            
            {/* Stat 2: Courses */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-2">25+</h3>
              <p className="text-neutral">
                {locale === 'fr' ? 'Formations disponibles' : locale === 'ar' ? 'دورات متاحة' : 'Available courses'}
              </p>
            </div>
            
            {/* Stat 3: Instructors */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-2">18</h3>
              <p className="text-neutral">
                {locale === 'fr' ? 'Instructeurs experts' : locale === 'ar' ? 'مدربون خبراء' : 'Expert instructors'}
              </p>
            </div>
            
            {/* Stat 4: Satisfaction Rate */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-2">98%</h3>
              <p className="text-neutral">
                {locale === 'fr' ? 'Taux de satisfaction' : locale === 'ar' ? 'معدل الرضا' : 'Satisfaction rate'}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Courses Preview */}
      <section className="section bg-white py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6 md:mb-0 text-center md:text-left">{translations.courses.title}</h2>
            <a href={`/${locale}/courses`} className="group flex items-center text-primary hover:text-primary-dark font-medium transition-colors">
              <span className="mr-2">{translations.courses.viewAll}</span>
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01] transition-transform border border-gray-100">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg"
                  alt="Web Development Course" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-primary text-white rounded-full">Web</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-white shadow-md text-secondary rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-neutral-dark">Développement Web</h3>
                <p className="text-neutral mb-4">Maîtrisez HTML, CSS et JavaScript pour créer des sites web modernes et réactifs.</p>
                <div className="flex justify-between items-center text-sm text-neutral-light mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>120 {locale === 'fr' ? 'heures' : locale === 'ar' ? 'ساعة' : 'hours'}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>20 {locale === 'fr' ? 'places' : locale === 'ar' ? 'مقعد' : 'seats'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-primary">35,000 DA</span>
                  <a href={`/${locale}/courses/web-development`} className="btn btn-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    {typeof translations.courses.learnMore === 'string' ? translations.courses.learnMore : 'Learn More'}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Course 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01] transition-transform border border-gray-100">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg"
                  alt="Graphic Design Course" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-secondary text-white rounded-full">Design</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-white shadow-md text-secondary rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.8
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-neutral-dark">Design Graphique</h3>
                <p className="text-neutral mb-4">Apprenez à utiliser Photoshop, Illustrator et les principes du design moderne.</p>
                <div className="flex justify-between items-center text-sm text-neutral-light mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>90 {locale === 'fr' ? 'heures' : locale === 'ar' ? 'ساعة' : 'hours'}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>15 {locale === 'fr' ? 'places' : locale === 'ar' ? 'مقعد' : 'seats'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-secondary">30,000 DA</span>
                  <a href={`/${locale}/courses/graphic-design`} className="btn bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    {typeof translations.courses.learnMore === 'string' ? translations.courses.learnMore : 'Learn More'}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Course 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01] transition-transform border border-gray-100">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg"
                  alt="Digital Marketing Course" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-accent text-white rounded-full">Marketing</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-white shadow-md text-secondary rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.7
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-neutral-dark">Marketing Digital</h3>
                <p className="text-neutral mb-4">Stratégies de marketing en ligne, réseaux sociaux, SEO et publicité digitale.</p>
                <div className="flex justify-between items-center text-sm text-neutral-light mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>80 {locale === 'fr' ? 'heures' : locale === 'ar' ? 'ساعة' : 'hours'}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>25 {locale === 'fr' ? 'places' : locale === 'ar' ? 'مقعد' : 'seats'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-accent">28,000 DA</span>
                  <a href={`/${locale}/courses/digital-marketing`} className="btn bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    {typeof translations.courses.learnMore === 'string' ? translations.courses.learnMore : 'Learn More'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Testimonials locale={locale} translations={translations.testimonials} />
      
      {/* Partners Section */}
      <Partners locale={locale} translations={translations.partners} />
      
      {/* FAQ Section */}
      <Faq locale={locale} translations={translations.faq} />
      
      {/* Blog Preview Section */}
      <BlogPreview locale={locale} translations={{
        title: translations.blog.title,
        subtitle: translations.blog.subtitle,
        viewAll: translations.blog.viewAll
      }} />
      
      {/* Newsletter Section */}
      <Newsletter locale={locale} translations={translations.newsletter} />
      
      {/* CTA Section */}
      <Cta locale={locale} translations={translations.cta} />
      
      <Footer locale={locale} translations={translations.footer} />
    </main>
  );
} 