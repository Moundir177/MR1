"use client";

import { motion } from 'framer-motion';
import { Locale } from '../i18n/settings';

interface CtaProps {
  locale: Locale;
  translations: {
    title: string;
    description: string;
    register: string;
    contact: string;
  };
}

export default function Cta({ locale, translations }: CtaProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-32 left-1/2 w-48 h-48 bg-white opacity-5 rounded-full"></div>
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-white opacity-5 rounded-full"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            {translations.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white/80 mb-12 max-w-2xl mx-auto"
          >
            {translations.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href={`/${locale}/register`}
              className="btn bg-secondary hover:bg-secondary-dark text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex-none"
            >
              {translations.register}
            </a>
            <a
              href={`/${locale}/contact`}
              className="btn bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all backdrop-blur-sm flex-none"
            >
              {translations.contact}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 