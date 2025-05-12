"use client";

import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaLaptop, FaCertificate } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface FeaturesProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    features: {
      quality: {
        title: string;
        description: string;
      };
      experts: {
        title: string;
        description: string;
      };
      practical: {
        title: string;
        description: string;
      };
      certification: {
        title: string;
        description: string;
      };
    };
  };
}

export default function Features({ locale, translations }: FeaturesProps) {
  const features = [
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: translations.features.quality.title,
      description: translations.features.quality.description,
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: translations.features.experts.title,
      description: translations.features.experts.description,
    },
    {
      icon: <FaLaptop className="w-8 h-8" />,
      title: translations.features.practical.title,
      description: translations.features.practical.description,
    },
    {
      icon: <FaCertificate className="w-8 h-8" />,
      title: translations.features.certification.title,
      description: translations.features.certification.description,
    },
  ];

  return (
    <section className="py-20 bg-neutral-light">
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
            {translations.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-neutral-dark mb-2">{feature.title}</h3>
              <p className="text-neutral">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 