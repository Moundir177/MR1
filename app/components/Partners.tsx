"use client";

import { motion } from 'framer-motion';
import { FaAward, FaMedal, FaGlobe } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface PartnersProps {
  locale: Locale;
  translations: {
    title: string;
    description: string;
    certifications: {
      recognition: {
        title: string;
        description: string;
      };
      quality: {
        title: string;
        description: string;
      };
      international: {
        title: string;
        description: string;
      };
    };
  };
}

export default function Partners({ locale, translations }: PartnersProps) {
  const partners = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Ministere-education-nationale.svg/1200px-Ministere-education-nationale.svg.png",
      name: locale === 'fr' ? "Ministère de l'Éducation Nationale" : locale === 'ar' ? "وزارة التربية الوطنية" : "Ministry of National Education",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Microsoft_Corporation_Logo.svg/1024px-Microsoft_Corporation_Logo.svg.png",
      name: "Microsoft",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_logo_%282013-2015%29.svg/1280px-Google_logo_%282013-2015%29.svg.png",
      name: "Google",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
      name: "Certification C++",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png",
      name: "VSCode Certification",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/4/45/MongoDB-Logo.svg/2560px-MongoDB-Logo.svg.png",
      name: "MongoDB",
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
          >
            {translations.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral max-w-2xl mx-auto"
          >
            {translations.description}
          </motion.p>
        </div>
        
        {/* Partner Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <div className="w-32 h-32 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Certification Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-neutral-light p-8 rounded-xl"
          >
            <div className="text-primary mb-4">
              <FaAward className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-neutral-dark mb-3">
              {translations.certifications.recognition.title}
            </h3>
            <p className="text-neutral">
              {translations.certifications.recognition.description}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-neutral-light p-8 rounded-xl"
          >
            <div className="text-secondary mb-4">
              <FaMedal className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-neutral-dark mb-3">
              {translations.certifications.quality.title}
            </h3>
            <p className="text-neutral">
              {translations.certifications.quality.description}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-neutral-light p-8 rounded-xl"
          >
            <div className="text-accent mb-4">
              <FaGlobe className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-neutral-dark mb-3">
              {translations.certifications.international.title}
            </h3>
            <p className="text-neutral">
              {translations.certifications.international.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 