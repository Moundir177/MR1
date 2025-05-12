import { Locale } from '@/app/i18n/settings';
import Navigation from '@/app/components/Navigation';
import ContactForm from '@/app/components/ContactForm';
import Footer from '@/app/components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaUser, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ContactPageProps {
  params: {
    locale: Locale;
  };
}

async function getTranslations(locale: Locale) {
  try {
    if (!['en', 'fr', 'ar'].includes(locale)) {
      const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
      const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
      return JSON.parse(defaultFileContents);
    }
    
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading translations for ${locale}:`, error);
    const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
    const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
    return JSON.parse(defaultFileContents);
  }
}

// Contact page content in all three languages
const contactContent = {
  fr: {
    title: "Contactez-nous",
    subtitle: "Nous sommes là pour vous aider",
    contactInfo: "Informations de contact",
    address: "Adresse",
    casablancaOffice: "Bureau de Casablanca",
    casablancaAddress: "123 Boulevard Hassan II, Casablanca 20000, Maroc",
    rabatOffice: "Bureau de Rabat",
    rabatAddress: "45 Avenue Mohammed V, Rabat 10000, Maroc",
    phone: "Téléphone",
    email: "Email",
    openingHours: "Heures d'ouverture",
    weekdays: "Lundi - Vendredi",
    weekdaysHours: "9:00 - 18:00",
    weekends: "Samedi",
    weekendsHours: "9:00 - 13:00",
    closed: "Dimanche: Fermé",
    followUs: "Suivez-nous",
    formTitle: "Envoyez-nous un message",
    formSubtitle: "Des questions, des commentaires ou des suggestions ? N'hésitez pas à nous contacter directement en utilisant le formulaire ci-dessous.",
    yourName: "Votre nom",
    yourEmail: "Votre e-mail",
    subject: "Sujet",
    message: "Message",
    send: "Envoyer",
    namePlaceholder: "Entrez votre nom complet",
    emailPlaceholder: "Entrez votre adresse e-mail",
    subjectPlaceholder: "Quel est le sujet de votre message?",
    messagePlaceholder: "Comment pouvons-nous vous aider?",
    generalInquiry: "Renseignement général",
    coursesInquiry: "Informations sur les cours",
    technicalSupport: "Support technique",
    partnership: "Partenariat",
    other: "Autre",
    privacyText: "En soumettant ce formulaire, vous acceptez notre",
    privacyPolicy: "politique de confidentialité"
  },
  ar: {
    title: "اتصل بنا",
    subtitle: "نحن هنا لمساعدتك",
    contactInfo: "معلومات الاتصال",
    address: "العنوان",
    casablancaOffice: "مكتب الدار البيضاء",
    casablancaAddress: "123 شارع الحسن الثاني، الدار البيضاء 20000، المغرب",
    rabatOffice: "مكتب الرباط",
    rabatAddress: "45 شارع محمد الخامس، الرباط 10000، المغرب",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    openingHours: "ساعات العمل",
    weekdays: "الإثنين - الجمعة",
    weekdaysHours: "9:00 - 18:00",
    weekends: "السبت",
    weekendsHours: "9:00 - 13:00",
    closed: "الأحد: مغلق",
    followUs: "تابعنا",
    formTitle: "أرسل لنا رسالة",
    formSubtitle: "أسئلة أو تعليقات أو اقتراحات؟ لا تتردد في الاتصال بنا مباشرة باستخدام النموذج أدناه.",
    yourName: "اسمك",
    yourEmail: "بريدك الإلكتروني",
    subject: "الموضوع",
    message: "الرسالة",
    send: "إرسال",
    namePlaceholder: "أدخل اسمك الكامل",
    emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    subjectPlaceholder: "ما هو موضوع رسالتك؟",
    messagePlaceholder: "كيف يمكننا مساعدتك؟",
    generalInquiry: "استفسار عام",
    coursesInquiry: "معلومات عن الدورات",
    technicalSupport: "الدعم الفني",
    partnership: "شراكة",
    other: "آخر",
    privacyText: "بتقديم هذا النموذج، فإنك توافق على",
    privacyPolicy: "سياسة الخصوصية الخاصة بنا"
  },
  en: {
    title: "Contact Us",
    subtitle: "We're here to help",
    contactInfo: "Contact Information",
    address: "Address",
    casablancaOffice: "Casablanca Office",
    casablancaAddress: "123 Boulevard Hassan II, Casablanca 20000, Morocco",
    rabatOffice: "Rabat Office",
    rabatAddress: "45 Avenue Mohammed V, Rabat 10000, Morocco",
    phone: "Phone",
    email: "Email",
    openingHours: "Opening Hours",
    weekdays: "Monday - Friday",
    weekdaysHours: "9:00 AM - 6:00 PM",
    weekends: "Saturday",
    weekendsHours: "9:00 AM - 1:00 PM",
    closed: "Sunday: Closed",
    followUs: "Follow Us",
    formTitle: "Send Us a Message",
    formSubtitle: "Questions, comments, or suggestions? Feel free to reach out directly using the form below.",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    message: "Message",
    send: "Send",
    namePlaceholder: "Enter your full name",
    emailPlaceholder: "Enter your email address",
    subjectPlaceholder: "What is your message about?",
    messagePlaceholder: "How can we help you?",
    generalInquiry: "General Inquiry",
    coursesInquiry: "Courses Information",
    technicalSupport: "Technical Support",
    partnership: "Partnership",
    other: "Other",
    privacyText: "By submitting this form, you agree to our",
    privacyPolicy: "privacy policy"
  }
};

export default async function ContactPage({ params: { locale } }: ContactPageProps) {
  const translations = await getTranslations(locale);
  const content = contactContent[locale as keyof typeof contactContent] || contactContent.en;
  
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Contact information
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6 text-primary" />,
      title: locale === 'fr' ? 'Adresse' : locale === 'ar' ? 'العنوان' : 'Address',
      details: locale === 'fr' 
        ? '123 Boulevard Mohammed V, Casablanca, Maroc' 
        : locale === 'ar' 
        ? '123 شارع محمد الخامس، الدار البيضاء، المغرب' 
        : '123 Mohammed V Boulevard, Casablanca, Morocco'
    },
    {
      icon: <FaPhone className="w-6 h-6 text-primary" />,
      title: locale === 'fr' ? 'Téléphone' : locale === 'ar' ? 'الهاتف' : 'Phone',
      details: '+212 522 123 456'
    },
    {
      icon: <FaEnvelope className="w-6 h-6 text-primary" />,
      title: locale === 'fr' ? 'Email' : locale === 'ar' ? 'البريد الإلكتروني' : 'Email',
      details: 'contact@miracademy.edu'
    },
    {
      icon: <FaClock className="w-6 h-6 text-primary" />,
      title: locale === 'fr' ? 'Heures d\'ouverture' : locale === 'ar' ? 'ساعات العمل' : 'Opening Hours',
      details: locale === 'fr' 
        ? 'Lundi - Vendredi: 8h30 - 18h30' 
        : locale === 'ar' 
        ? 'الاثنين - الجمعة: 8:30 - 18:30' 
        : 'Monday - Friday: 8:30am - 6:30pm'
    }
  ];
  
  // Social media links
  const socialLinks = [
    {
      icon: <FaFacebookF className="w-5 h-5" />,
      url: 'https://facebook.com/miracademy',
      label: 'Facebook'
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      url: 'https://twitter.com/miracademy',
      label: 'Twitter'
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: 'https://instagram.com/miracademy',
      label: 'Instagram'
    },
    {
      icon: <FaLinkedinIn className="w-5 h-5" />,
      url: 'https://linkedin.com/company/miracademy',
      label: 'LinkedIn'
    }
  ];
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations} />
      
      <main className="flex-grow bg-gray-50">
        {/* Contact Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-xl max-w-2xl mx-auto">{content.subtitle}</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{content.contactInfo}</h2>
                
                {/* Address */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">{content.address}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <FaMapMarkerAlt className="text-primary text-xl" />
                      </div>
                      <div>
                        <p className="font-medium">{content.casablancaOffice}</p>
                        <p className="text-gray-600">{content.casablancaAddress}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <FaMapMarkerAlt className="text-primary text-xl" />
                      </div>
                      <div>
                        <p className="font-medium">{content.rabatOffice}</p>
                        <p className="text-gray-600">{content.rabatAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phone & Email */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <FaPhone className="text-primary mr-4" />
                    <div>
                      <p className="font-medium">{content.phone}</p>
                      <p className="text-gray-600">+212 522 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaEnvelope className="text-primary mr-4" />
                    <div>
                      <p className="font-medium">{content.email}</p>
                      <p className="text-gray-600">contact@miracademy.ma</p>
                    </div>
                  </div>
                </div>
                
                {/* Opening Hours */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">{content.openingHours}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FaClock className="text-primary mr-4" />
                      <div>
                        <p className="font-medium">{content.weekdays}</p>
                        <p className="text-gray-600">{content.weekdaysHours}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FaClock className="text-primary mr-4 opacity-0" />
                      <div>
                        <p className="font-medium">{content.weekends}</p>
                        <p className="text-gray-600">{content.weekendsHours}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FaClock className="text-primary mr-4 opacity-0" />
                      <p className="text-gray-600">{content.closed}</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">{content.followUs}</h3>
                  
                  <div className="flex space-x-4">
                    <Link href="#" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                      <FaFacebookF />
                    </Link>
                    
                    <Link href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                      <FaTwitter />
                    </Link>
                    
                    <Link href="#" className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                      <FaInstagram />
                    </Link>
                    
                    <Link href="#" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                      <FaLinkedinIn />
                    </Link>
                    
                    <Link href="#" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                      <FaYoutube />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{content.formTitle}</h2>
                <p className="text-gray-600 mb-6">{content.formSubtitle}</p>
                
                <ContactForm locale={locale} translations={translations} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="w-full h-96 bg-gray-300 flex items-center justify-center text-gray-600">
          {/* This would be replaced with an actual map component */}
          <div className="text-center">
            <FaMapMarkerAlt className="text-6xl mb-4 mx-auto" />
            <p className="text-xl font-medium">Interactive Map Would Go Here</p>
          </div>
        </div>
      </main>
      
      <Footer locale={locale} translations={translations} />
    </div>
  );
} 