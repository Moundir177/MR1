"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { locales, localeNames, Locale } from '../i18n/settings';
import { FaGlobe, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

interface NavigationProps {
  locale: Locale;
  translations: {
    home: string;
    about: any; // Changed from string to any since it might be an object
    courses: string;
    contact: string;
    login: string;
    register: string;
    language?: string;
    careers?: string;
    dashboard?: string;
    profile?: string;
    logout?: string;
  };
  isLoggedIn?: boolean; // Optional prop to determine if user is logged in
}

export default function Navigation({ locale, translations, isLoggedIn = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get the path without the locale
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/');
    segments.splice(1, 1); // Remove the locale segment
    return segments.join('/') || '/';
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  // Default dashboard and profile texts if not provided
  const dashboardText = translations.dashboard || (
    locale === 'fr' ? 'Tableau de bord' : locale === 'ar' ? 'لوحة التحكم' : 'Dashboard'
  );
  const profileText = translations.profile || (
    locale === 'fr' ? 'Profil' : locale === 'ar' ? 'الملف الشخصي' : 'Profile'
  );
  const logoutText = translations.logout || (
    locale === 'fr' ? 'Déconnexion' : locale === 'ar' ? 'تسجيل الخروج' : 'Logout'
  );

  // Get the about text safely, ensuring it's a string
  const aboutText = typeof translations.about === 'string' 
    ? translations.about 
    : locale === 'fr' ? 'À propos' : locale === 'ar' ? 'حول' : 'About';
  
  // Get the courses text safely, ensuring it's a string
  const coursesText = typeof translations.courses === 'string'
    ? translations.courses
    : locale === 'fr' ? 'Formations' : locale === 'ar' ? 'دورات' : 'Courses';

  // Get the contact text safely, ensuring it's a string
  const contactText = typeof translations.contact === 'string'
    ? translations.contact
    : locale === 'fr' ? 'Contact' : locale === 'ar' ? 'اتصل بنا' : 'Contact';

  // Get the careers text safely, ensuring it's a string
  const careersText = typeof translations.careers === 'string'
    ? translations.careers
    : locale === 'fr' ? 'Carrières' : locale === 'ar' ? 'وظائف' : 'Careers';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <span className={`text-2xl font-bold font-heading ${isScrolled ? 'text-primary' : 'text-white'}`}>
              MIRA ACADEMY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}`} className={`${isScrolled ? 'text-neutral-dark' : 'text-white'} hover:text-primary-light transition-colors`}>
              {translations.home}
            </Link>
            <Link href={`/${locale}/about`} className={`${isScrolled ? 'text-neutral-dark' : 'text-white'} hover:text-primary-light transition-colors`}>
              {aboutText}
            </Link>
            <Link href={`/${locale}/courses`} className={`${isScrolled ? 'text-neutral-dark' : 'text-white'} hover:text-primary-light transition-colors`}>
              {coursesText}
            </Link>
            <Link href={`/${locale}/careers`} className={`${isScrolled ? 'text-neutral-dark' : 'text-white'} hover:text-primary-light transition-colors`}>
              {careersText}
            </Link>
            <Link href={`/${locale}/contact`} className={`${isScrolled ? 'text-neutral-dark' : 'text-white'} hover:text-primary-light transition-colors`}>
              {contactText}
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={toggleLangMenu}
                className={`flex items-center ${isScrolled ? 'text-neutral-dark' : 'text-white'} hover:text-primary-light transition-colors`}
              >
                <FaGlobe className="mr-1" />
                <span>{localeNames[locale]}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-xl z-20">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}${getPathWithoutLocale()}`}
                      className={`block px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light hover:text-white ${l === locale ? 'bg-primary-light/10' : ''}`}
                      onClick={() => setIsLangMenuOpen(false)}
                    >
                      {localeNames[l]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons or User Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className={`flex items-center ${isScrolled ? 'text-neutral-dark' : 'text-white'} hover:text-primary-light transition-colors`}
                >
                  <FaUserCircle className="h-6 w-6 mr-2" />
                  <span>User</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <Link
                      href={`/${locale}/dashboard`}
                      className="block px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light hover:text-white"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {dashboardText}
                    </Link>
                    <Link
                      href={`/${locale}/dashboard/settings`}
                      className="block px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light hover:text-white"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {profileText}
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        // Add logout logic here
                      }}
                    >
                      {logoutText}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href={`/${locale}/login`} className="btn btn-outline">
                  {translations.login}
                </Link>
                <Link href={`/${locale}/register`} className="btn btn-primary">
                  {translations.register}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${isScrolled ? 'text-neutral-dark' : 'text-white'} focus:outline-none`}
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-4 p-4 animate-fade-in-down">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/${locale}`}
                onClick={toggleMenu}
                className="text-neutral-dark hover:text-primary transition-colors py-2"
              >
                {translations.home}
              </Link>
              <Link
                href={`/${locale}/about`}
                onClick={toggleMenu}
                className="text-neutral-dark hover:text-primary transition-colors py-2"
              >
                {aboutText}
              </Link>
              <Link
                href={`/${locale}/courses`}
                onClick={toggleMenu}
                className="text-neutral-dark hover:text-primary transition-colors py-2"
              >
                {coursesText}
              </Link>
              <Link
                href={`/${locale}/careers`}
                onClick={toggleMenu}
                className="text-neutral-dark hover:text-primary transition-colors py-2"
              >
                {careersText}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={toggleMenu}
                className="text-neutral-dark hover:text-primary transition-colors py-2"
              >
                {contactText}
              </Link>

              {/* Language Options */}
              <div className="py-2 border-t border-gray-200">
                <p className="text-sm text-neutral-light mb-2">{translations.language || "Language"}</p>
                <div className="grid grid-cols-3 gap-2">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}${getPathWithoutLocale()}`}
                      onClick={toggleMenu}
                      className={`text-sm px-3 py-1 rounded ${l === locale ? 'bg-primary text-white' : 'bg-gray-100 text-neutral-dark hover:bg-gray-200'}`}
                    >
                      {localeNames[l]}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth Buttons or User Options */}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                {isLoggedIn ? (
                  <>
                    <Link
                      href={`/${locale}/dashboard`}
                      onClick={toggleMenu}
                      className="text-neutral-dark hover:text-primary transition-colors py-2"
                    >
                      {dashboardText}
                    </Link>
                    <Link
                      href={`/${locale}/dashboard/settings`}
                      onClick={toggleMenu}
                      className="text-neutral-dark hover:text-primary transition-colors py-2"
                    >
                      {profileText}
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800 transition-colors py-2 text-left"
                      onClick={() => {
                        toggleMenu();
                        // Add logout logic here
                      }}
                    >
                      {logoutText}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/${locale}/login`}
                      onClick={toggleMenu}
                      className="btn btn-outline w-full text-center"
                    >
                      {translations.login}
                    </Link>
                    <Link
                      href={`/${locale}/register`}
                      onClick={toggleMenu}
                      className="btn btn-primary w-full text-center"
                    >
                      {translations.register}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 