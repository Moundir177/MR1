"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight, FaGlobeAmericas } from 'react-icons/fa';
import { Locale, localeNames } from '../i18n/settings';

interface FooterProps {
  locale: Locale;
  translations: {
    address: string;
    phone: string;
    email: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
}

export default function Footer({ locale, translations }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();
  
  // Set the current path for client-side navigation
  useEffect(() => {
    setCurrentPath(pathname || '');
  }, [pathname]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock subscription success (would connect to actual API in production)
    setSubscribeStatus('success');
    setTimeout(() => setSubscribeStatus('idle'), 3000);
    setEmail('');
  };
  
  // Helper function to get the path with the new locale
  const getLocalizedPath = (targetLocale: Locale) => {
    if (!currentPath) return `/${targetLocale}`;
    
    // If we're already on this locale, no need to change
    if (locale === targetLocale) return currentPath;
    
    // Otherwise, replace the locale segment of the path
    const pathWithoutLocale = currentPath.substring(3); // Remove the first 3 characters (e.g., /en/)
    return `/${targetLocale}${pathWithoutLocale}`;
  };
  
  const quickLinks = [
    { 
      href: `/${locale}`, 
      label: locale === 'fr' ? 'Accueil' : locale === 'ar' ? 'الرئيسية' : 'Home' 
    },
    { 
      href: `/${locale}/about`, 
      label: locale === 'fr' ? 'À propos' : locale === 'ar' ? 'حول' : 'About' 
    },
    { 
      href: `/${locale}/courses`, 
      label: locale === 'fr' ? 'Formations' : locale === 'ar' ? 'دوراتنا' : 'Courses' 
    },
    { 
      href: `/${locale}/contact`, 
      label: locale === 'fr' ? 'Contact' : locale === 'ar' ? 'اتصل بنا' : 'Contact' 
    }
  ];
  
  const courseLinks = [
    { 
      href: `/${locale}/courses/web-development`, 
      label: locale === 'fr' ? 'Développement Web' : locale === 'ar' ? 'تطوير الويب' : 'Web Development' 
    },
    { 
      href: `/${locale}/courses/graphic-design`, 
      label: locale === 'fr' ? 'Design Graphique' : locale === 'ar' ? 'التصميم الجرافيكي' : 'Graphic Design' 
    },
    { 
      href: `/${locale}/courses/digital-marketing`, 
      label: locale === 'fr' ? 'Marketing Digital' : locale === 'ar' ? 'التسويق الرقمي' : 'Digital Marketing' 
    },
    { 
      href: `/${locale}/courses/business-management`, 
      label: locale === 'fr' ? 'Gestion d\'Entreprise' : locale === 'ar' ? 'إدارة الأعمال' : 'Business Management' 
    }
  ];
  
  const newsletterText = {
    fr: {
      title: "S'abonner à la newsletter",
      description: "Recevez les dernières nouvelles et offres directement dans votre boîte de réception.",
      placeholder: "Votre email",
      button: "S'abonner",
      success: "Merci de vous être abonné!",
      error: "Une erreur s'est produite. Veuillez réessayer."
    },
    ar: {
      title: "اشترك في النشرة الإخبارية",
      description: "احصل على آخر الأخبار والعروض مباشرة في صندوق الوارد الخاص بك.",
      placeholder: "بريدك الإلكتروني",
      button: "اشتراك",
      success: "شكرا لاشتراكك!",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى."
    },
    en: {
      title: "Subscribe to newsletter",
      description: "Get the latest news and offers directly to your inbox.",
      placeholder: "Your email",
      button: "Subscribe",
      success: "Thanks for subscribing!",
      error: "An error occurred. Please try again."
    }
  };
  
  const t = newsletterText[locale as keyof typeof newsletterText] || newsletterText.en;
  const quickLinksTitle = locale === 'fr' ? 'Liens rapides' : locale === 'ar' ? 'روابط سريعة' : 'Quick Links';
  const coursesTitle = locale === 'fr' ? 'Formations' : locale === 'ar' ? 'دورات' : 'Courses';
  const contactTitle = locale === 'fr' ? 'Contact' : locale === 'ar' ? 'اتصل بنا' : 'Contact';
  const followTitle = locale === 'fr' ? 'Suivez-nous' : locale === 'ar' ? 'تابعنا' : 'Follow Us';

  return (
    <footer className="relative bg-neutral-dark text-white overflow-hidden">
      {/* Wave SVG for top decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-neutral-light/5">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Column 1: About */}
            <div className="col-span-1 lg:col-span-2 space-y-8">
              <Link href={`/${locale}`} className="inline-block">
                <span className="text-3xl font-bold font-heading text-white">
                  MIRA<span className="text-secondary">ACADEMY</span>
                </span>
              </Link>
              
              <p className="text-neutral-light max-w-md">
                {locale === 'fr' 
                  ? "Centre de formation professionnelle d'excellence offrant des programmes innovants pour préparer nos étudiants aux métiers d'avenir." 
                  : locale === 'ar' 
                  ? "مركز تدريب مهني متميز يقدم برامج مبتكرة لإعداد طلابنا للمهن المستقبلية."
                  : "Professional training center of excellence offering innovative programs to prepare our students for future careers."}
              </p>
              
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{followTitle}</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors duration-300" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors duration-300" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors duration-300" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors duration-300" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors duration-300" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2">{quickLinksTitle}</h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index} className="group">
                    <Link href={link.href} className="text-neutral-light hover:text-white transition-colors flex items-center gap-2">
                      <span className="text-xs group-hover:translate-x-1 transition-transform">
                        <FaArrowRight />
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3: Courses */}
            <div className="col-span-1">
              <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2">{coursesTitle}</h3>
              <ul className="space-y-4">
                {courseLinks.map((link, index) => (
                  <li key={index} className="group">
                    <Link href={link.href} className="text-neutral-light hover:text-white transition-colors flex items-center gap-2">
                      <span className="text-xs group-hover:translate-x-1 transition-transform">
                        <FaArrowRight />
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 4: Contact & Newsletter */}
            <div className="col-span-1">
              <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2">{contactTitle}</h3>
              <ul className="space-y-6 mb-8">
                <li className="flex">
                  <FaMapMarkerAlt className="text-secondary w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="text-neutral-light ml-3">{translations.address}</span>
                </li>
                <li className="flex">
                  <FaPhoneAlt className="text-secondary w-5 h-5 flex-shrink-0" />
                  <span className="text-neutral-light ml-3">{translations.phone}</span>
                </li>
                <li className="flex">
                  <FaEnvelope className="text-secondary w-5 h-5 flex-shrink-0" />
                  <span className="text-neutral-light ml-3">{translations.email}</span>
                </li>
                <li className="flex">
                  <FaGlobeAmericas className="text-secondary w-5 h-5 flex-shrink-0" />
                  <div className="ml-3 flex flex-wrap gap-2">
                    <Link href={getLocalizedPath('fr')}
                      className={`px-2 py-1 text-xs rounded ${locale === 'fr' ? 'bg-primary text-white' : 'bg-white/10 text-neutral-light hover:bg-white/20'}`}>
                      Français
                    </Link>
                    <Link href={getLocalizedPath('ar')}
                      className={`px-2 py-1 text-xs rounded ${locale === 'ar' ? 'bg-primary text-white' : 'bg-white/10 text-neutral-light hover:bg-white/20'}`}>
                      العربية
                    </Link>
                    <Link href={getLocalizedPath('en')}
                      className={`px-2 py-1 text-xs rounded ${locale === 'en' ? 'bg-primary text-white' : 'bg-white/10 text-neutral-light hover:bg-white/20'}`}>
                      English
                    </Link>
                  </div>
                </li>
              </ul>
              
              {/* Newsletter */}
              <div className="bg-neutral-dark/60 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h4 className="text-white font-bold mb-2">{t.title}</h4>
                <p className="text-sm text-neutral-light mb-4">{t.description}</p>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.placeholder}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    {t.button}
                    <FaArrowRight />
                  </button>
                  
                  {subscribeStatus === 'success' && (
                    <p className="text-green-400 text-sm">{t.success}</p>
                  )}
                  
                  {subscribeStatus === 'error' && (
                    <p className="text-red-400 text-sm">{t.error}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-light text-sm mb-4 md:mb-0">
              {translations.copyright} © {new Date().getFullYear()} MIRA ACADEMY
            </p>
            
            <div className="flex space-x-6">
              <Link href={`/${locale}/privacy`} className="text-neutral-light hover:text-white text-sm transition-colors">
                {translations.privacy}
              </Link>
              <Link href={`/${locale}/terms`} className="text-neutral-light hover:text-white text-sm transition-colors">
                {translations.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 