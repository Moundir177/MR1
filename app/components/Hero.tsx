"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Locale } from '../i18n/settings';
import Image from 'next/image';

interface HeroProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
  };
}

export default function Hero({ locale, translations }: HeroProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-dark via-primary-dark to-primary flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
          alt="Students in a modern classroom"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-10"></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/90"></div>
      
      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {translations.title}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
              {translations.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href={`/${locale}/courses`}
                className="btn btn-secondary text-center"
              >
                {translations.cta}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="btn btn-outline border-white text-white hover:bg-white hover:text-primary text-center"
              >
                {translations.secondaryCta}
              </Link>
            </div>
            
            <div className="mt-12 hidden lg:flex items-center space-x-4">
              <span className="text-white/70">Certifié par:</span>
              <div className="flex space-x-6">
                <div className="h-12 w-20 bg-white/90 rounded flex items-center justify-center">
                  <Image
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                    alt="Certification Logo 1"
                    width={60}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="h-12 w-20 bg-white/90 rounded flex items-center justify-center">
                  <Image
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                    alt="Certification Logo 2"
                    width={60}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="h-12 w-20 bg-white/90 rounded flex items-center justify-center">
                  <Image
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                    alt="Certification Logo 3"
                    width={60}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-secondary rounded-full opacity-80"></div>
              <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-accent rounded-full opacity-80"></div>
              
              <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                    alt="Students in a modern classroom"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-dark mb-2">
                    Nos cours innovants
                  </h3>
                  <p className="text-neutral mb-4">
                    Découvrez nos formations professionnelles de haute qualité
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs">
                          {index}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-neutral">+1200 étudiants</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/70 text-sm mb-2">Défiler pour en savoir plus</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 