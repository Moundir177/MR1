"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface NewsletterProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
    errorMessage: string;
  };
  className?: string;
}

export default function Newsletter({ locale, translations, className = '' }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setErrorMessage(
        locale === 'fr'
          ? 'Veuillez entrer votre adresse email'
          : locale === 'ar'
          ? 'الرجاء إدخال عنوان بريدك الإلكتروني'
          : 'Please enter your email address'
      );
      return;
    }
    
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage(
        locale === 'fr'
          ? 'Veuillez entrer une adresse email valide'
          : locale === 'ar'
          ? 'الرجاء إدخال عنوان بريد إلكتروني صالح'
          : 'Please enter a valid email address'
      );
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.2) { // 80% success rate for demo
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(translations.errorMessage);
      }
    }, 1000);
  };
  
  const isRTL = locale === 'ar';
  
  return (
    <section className={`py-16 bg-primary ${className}`}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {translations.title}
            </h2>
            <p className="text-white/80 text-lg">
              {translations.subtitle}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPaperPlane className="text-2xl" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">
                  {locale === 'fr' 
                    ? 'Inscription réussie!' 
                    : locale === 'ar' 
                    ? 'تم الاشتراك بنجاح!' 
                    : 'Successfully Subscribed!'}
                </h3>
                <p className="text-white/80 mb-6">
                  {translations.successMessage}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn bg-white text-primary hover:bg-gray-100 transition-colors py-2 px-6 rounded-lg"
                >
                  {locale === 'fr' 
                    ? 'S\'abonner à nouveau' 
                    : locale === 'ar' 
                    ? 'الاشتراك مرة أخرى' 
                    : 'Subscribe Again'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <div className={`flex flex-col sm:flex-row ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={translations.placeholder}
                    className={`flex-grow py-4 px-6 rounded-lg ${
                      isRTL ? 'sm:rounded-r-lg sm:rounded-l-none' : 'sm:rounded-l-lg sm:rounded-r-none'
                    } outline-none text-neutral-dark mb-2 sm:mb-0`}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`${
                      isRTL ? 'sm:rounded-l-lg sm:rounded-r-none' : 'sm:rounded-r-lg sm:rounded-l-none'
                    } bg-neutral-dark hover:bg-neutral-dark/90 text-white py-4 px-6 transition-colors flex items-center justify-center`}
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaPaperPlane className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {translations.buttonText}
                      </>
                    )}
                  </button>
                </div>
                
                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 mt-4 p-3 rounded-lg">
                    {errorMessage}
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 