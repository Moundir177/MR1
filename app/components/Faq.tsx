"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface FAQProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export default function FAQ({ locale, translations }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const isRTL = locale === 'ar';
  
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
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
            {translations.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral max-w-3xl mx-auto"
          >
            {translations.subtitle}
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {translations.questions.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className={`w-full text-left p-5 rounded-xl flex justify-between items-center transition-colors ${
                  activeIndex === index 
                    ? 'bg-primary text-white'
                    : 'bg-neutral-light/30 hover:bg-neutral-light/50 text-neutral-dark'
                }`}
              >
                <div className="flex items-center">
                  <FaQuestionCircle className={`${activeIndex === index ? 'text-white/70' : 'text-primary/70'} ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span className="font-medium">{faq.question}</span>
                </div>
                <FaChevronDown 
                  className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-white border border-gray-100 rounded-b-xl shadow-sm">
                      <p className="text-neutral">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 