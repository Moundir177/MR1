"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface ContactFormProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      submit: string;
    };
    contact: {
      title: string;
      address: string;
      phone: string;
      email: string;
    };
    success: string;
    error: string;
  };
}

export default function ContactForm({ locale, translations }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage(
        locale === 'fr'
          ? 'Veuillez remplir tous les champs obligatoires'
          : locale === 'ar'
          ? 'يرجى ملء جميع الحقول المطلوبة'
          : 'Please fill all required fields'
      );
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(
        locale === 'fr'
          ? 'Veuillez entrer une adresse email valide'
          : locale === 'ar'
          ? 'الرجاء إدخال عنوان بريد إلكتروني صالح'
          : 'Please enter a valid email address'
      );
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrorMessage('');
    
    if (!validateForm()) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.2) { // 80% success rate for demo
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(translations.error);
      }
    }, 1500);
  };
  
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4"
          >
            {translations.title || (locale === 'fr' ? 'Contactez-nous' : locale === 'ar' ? 'اتصل بنا' : 'Contact Us')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral max-w-xl mx-auto"
          >
            {translations.subtitle || (locale === 'fr' ? 'Nous sommes à votre écoute' : locale === 'ar' ? 'نحن هنا للإجابة على استفساراتك' : 'We are here to help')}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 bg-primary text-white rounded-xl overflow-hidden"
          >
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6">
                {translations.contact && translations.contact.title ? 
                  translations.contact.title : 
                  locale === 'fr' ? 'Informations de contact' : 
                  locale === 'ar' ? 'معلومات الاتصال' : 
                  'Contact Information'}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">
                      {locale === 'fr' ? 'Adresse' : locale === 'ar' ? 'العنوان' : 'Address'}
                    </h3>
                    <p className="text-white/80">
                      {translations.contact && translations.contact.address ? 
                        translations.contact.address : 
                        locale === 'fr' ? '123 Boulevard Mohammed V, Casablanca, Maroc' :
                        locale === 'ar' ? '123 شارع محمد الخامس، الدار البيضاء، المغرب' :
                        '123 Mohammed V Boulevard, Casablanca, Morocco'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaPhone className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">
                      {locale === 'fr' ? 'Téléphone' : locale === 'ar' ? 'الهاتف' : 'Phone'}
                    </h3>
                    <p className="text-white/80">
                      {translations.contact && translations.contact.phone ? 
                        translations.contact.phone : 
                        '+212 522 123 456'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaEnvelope className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">
                      {locale === 'fr' ? 'Email' : locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </h3>
                    <p className="text-white/80">
                      {translations.contact && translations.contact.email ? 
                        translations.contact.email : 
                        'contact@miracademy.edu'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-10 border-t border-white/20">
                <h3 className="text-lg font-semibold mb-4">
                  {locale === 'fr' ? 'Heures d\'ouverture' : locale === 'ar' ? 'ساعات العمل' : 'Opening Hours'}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">
                      {locale === 'fr' ? 'Lundi - Vendredi' : locale === 'ar' ? 'الإثنين - الجمعة' : 'Monday - Friday'}
                    </span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">
                      {locale === 'fr' ? 'Samedi' : locale === 'ar' ? 'السبت' : 'Saturday'}
                    </span>
                    <span>9:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">
                      {locale === 'fr' ? 'Dimanche' : locale === 'ar' ? 'الأحد' : 'Sunday'}
                    </span>
                    <span>
                      {locale === 'fr' ? 'Fermé' : locale === 'ar' ? 'مغلق' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.532856695861!2d3.0525683!3d36.7399692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb300a66a0dd1%3A0x4602b9b22b0a5e07!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2sus!4v1622023585730!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-xl border border-gray-100 p-8 md:p-10"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FaPaperPlane className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-dark mb-4">
                  {locale === 'fr' ? 'Message envoyé!' : locale === 'ar' ? 'تم إرسال الرسالة!' : 'Message Sent!'}
                </h3>
                <p className="text-neutral mb-8 max-w-md">
                  {translations.success || (
                    locale === 'fr' 
                      ? 'Merci de nous avoir contacté! Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.' 
                      : locale === 'ar' 
                      ? 'شكرا للتواصل معنا! لقد تلقينا رسالتك وسنرد عليك في أقرب وقت ممكن.'
                      : 'Thank you for contacting us! We have received your message and will get back to you as soon as possible.'
                  )}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg"
                >
                  {locale === 'fr' ? 'Envoyer un autre message' : locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-neutral-dark font-medium mb-2">
                      {translations.form && translations.form.name ? 
                        translations.form.name : 
                        locale === 'fr' ? 'Votre Nom' : 
                        locale === 'ar' ? 'اسمك' : 
                        'Your Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={translations.form && translations.form.name ? 
                        translations.form.name : 
                        locale === 'fr' ? 'Votre Nom' : 
                        locale === 'ar' ? 'اسمك' : 
                        'Your Name'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-neutral-dark font-medium mb-2">
                      {translations.form && translations.form.email ? 
                        translations.form.email : 
                        locale === 'fr' ? 'Votre Email' : 
                        locale === 'ar' ? 'بريدك الإلكتروني' : 
                        'Your Email'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={translations.form && translations.form.email ? 
                        translations.form.email : 
                        locale === 'fr' ? 'Votre Email' : 
                        locale === 'ar' ? 'بريدك الإلكتروني' : 
                        'Your Email'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-neutral-dark font-medium mb-2">
                      {translations.form && translations.form.phone ? 
                        translations.form.phone : 
                        locale === 'fr' ? 'Téléphone' : 
                        locale === 'ar' ? 'رقم الهاتف' : 
                        'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={translations.form && translations.form.phone ? 
                        translations.form.phone : 
                        locale === 'fr' ? 'Téléphone' : 
                        locale === 'ar' ? 'رقم الهاتف' : 
                        'Phone Number'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-neutral-dark font-medium mb-2">
                      {translations.form && translations.form.subject ? 
                        translations.form.subject : 
                        locale === 'fr' ? 'Sujet' : 
                        locale === 'ar' ? 'الموضوع' : 
                        'Subject'}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={translations.form && translations.form.subject ? 
                        translations.form.subject : 
                        locale === 'fr' ? 'Sujet' : 
                        locale === 'ar' ? 'الموضوع' : 
                        'Subject'}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-neutral-dark font-medium mb-2">
                    {translations.form && translations.form.message ? 
                      translations.form.message : 
                      locale === 'fr' ? 'Votre Message' : 
                      locale === 'ar' ? 'رسالتك' : 
                      'Your Message'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={translations.form && translations.form.message ? 
                      translations.form.message : 
                      locale === 'fr' ? 'Comment pouvons-nous vous aider?' : 
                      locale === 'ar' ? 'كيف يمكننا مساعدتك؟' : 
                      'How can we help you?'}
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                    {errorMessage || translations.error || (
                      locale === 'fr' 
                        ? 'Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.' 
                        : locale === 'ar' 
                        ? 'حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.'
                        : 'There was an error sending your message. Please try again.'
                    )}
                  </div>
                )}
                
                <div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <FaPaperPlane className="mr-2" />
                    )}
                    {translations.form && translations.form.submit ? 
                      translations.form.submit : 
                      locale === 'fr' ? 'Envoyer' : 
                      locale === 'ar' ? 'إرسال' : 
                      'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 