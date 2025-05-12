"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaGraduationCap, FaLanguage, FaTag, FaFilter, FaTimes } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface CourseCatalogProps {
  locale: Locale;
  translations: {
    title: string;
    viewAll: string;
    enrollNow: string;
    learnMore: string;
    duration: string;
    level: string;
    language: string;
    price: string;
    webDev: string;
    graphicDesign: string;
    digitalMarketing: string;
    businessManagement: string;
  };
}

// Example courses data - in a real app, this would come from a CMS or API
const coursesData = [
  {
    id: 1,
    title: {
      en: "Comprehensive Web Development Bootcamp",
      fr: "Bootcamp Complet de Développement Web",
      ar: "معسكر تطوير الويب الشامل"
    },
    category: "webDev",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: {
      en: "12 weeks",
      fr: "12 semaines",
      ar: "12 أسبوع"
    },
    level: {
      en: "Beginner to Intermediate",
      fr: "Débutant à Intermédiaire",
      ar: "مبتدئ إلى متوسط"
    },
    language: {
      en: "English, French",
      fr: "Anglais, Français",
      ar: "الإنجليزية، الفرنسية"
    },
    price: {
      en: "$1200",
      fr: "1200 €",
      ar: "1200 دولار"
    },
    description: {
      en: "Become a full-stack web developer with this comprehensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, and more.",
      fr: "Devenez un développeur web full-stack avec ce bootcamp complet couvrant HTML, CSS, JavaScript, React, Node.js, et plus encore.",
      ar: "كن مطور ويب متكامل مع معسكر التدريب الشامل هذا الذي يغطي HTML و CSS و JavaScript و React و Node.js والمزيد."
    }
  },
  {
    id: 2,
    title: {
      en: "UI/UX Design Masterclass",
      fr: "Masterclass de Design UI/UX",
      ar: "الدورة الرئيسية لتصميم واجهة وتجربة المستخدم"
    },
    category: "graphicDesign",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: {
      en: "8 weeks",
      fr: "8 semaines",
      ar: "8 أسابيع"
    },
    level: {
      en: "Intermediate",
      fr: "Intermédiaire",
      ar: "متوسط"
    },
    language: {
      en: "English, Arabic",
      fr: "Anglais, Arabe",
      ar: "الإنجليزية، العربية"
    },
    price: {
      en: "$950",
      fr: "950 €",
      ar: "950 دولار"
    },
    description: {
      en: "Master the art of creating beautiful and functional user interfaces. Learn industry-standard tools like Figma, Adobe XD, and principles of user-centered design.",
      fr: "Maîtrisez l'art de créer des interfaces utilisateur belles et fonctionnelles. Apprenez les outils standards de l'industrie comme Figma, Adobe XD, et les principes de conception centrée sur l'utilisateur.",
      ar: "أتقن فن إنشاء واجهات مستخدم جميلة وعملية. تعلم أدوات معيارية في الصناعة مثل Figma و Adobe XD، ومبادئ التصميم المتمحور حول المستخدم."
    }
  },
  {
    id: 3,
    title: {
      en: "Digital Marketing Strategy",
      fr: "Stratégie de Marketing Digital",
      ar: "استراتيجية التسويق الرقمي"
    },
    category: "digitalMarketing",
    image: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: {
      en: "6 weeks",
      fr: "6 semaines",
      ar: "6 أسابيع"
    },
    level: {
      en: "All Levels",
      fr: "Tous Niveaux",
      ar: "جميع المستويات"
    },
    language: {
      en: "English, French, Arabic",
      fr: "Anglais, Français, Arabe",
      ar: "الإنجليزية، الفرنسية، العربية"
    },
    price: {
      en: "$800",
      fr: "800 €",
      ar: "800 دولار"
    },
    description: {
      en: "Learn how to create effective digital marketing campaigns. This course covers SEO, social media marketing, content strategy, email marketing, and analytics.",
      fr: "Apprenez à créer des campagnes de marketing digital efficaces. Ce cours couvre le référencement, le marketing sur les réseaux sociaux, la stratégie de contenu, le marketing par e-mail et l'analytique.",
      ar: "تعلم كيفية إنشاء حملات تسويقية رقمية فعالة. تغطي هذه الدورة تحسين محركات البحث، والتسويق عبر وسائل التواصل الاجتماعي، واستراتيجية المحتوى، والتسويق عبر البريد الإلكتروني، والتحليلات."
    }
  },
  {
    id: 4,
    title: {
      en: "Project Management Fundamentals",
      fr: "Fondamentaux de la Gestion de Projet",
      ar: "أساسيات إدارة المشاريع"
    },
    category: "businessManagement",
    image: "https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: {
      en: "4 weeks",
      fr: "4 semaines",
      ar: "4 أسابيع"
    },
    level: {
      en: "Beginner",
      fr: "Débutant",
      ar: "مبتدئ"
    },
    language: {
      en: "English, French",
      fr: "Anglais, Français",
      ar: "الإنجليزية، الفرنسية"
    },
    price: {
      en: "$600",
      fr: "600 €",
      ar: "600 دولار"
    },
    description: {
      en: "Develop essential project management skills. Learn methodologies like Agile, Scrum, and traditional project management techniques to deliver successful projects.",
      fr: "Développez des compétences essentielles en gestion de projet. Apprenez des méthodologies comme Agile, Scrum et les techniques traditionnelles de gestion de projet pour réaliser des projets réussis.",
      ar: "طور مهارات أساسية في إدارة المشاريع. تعلم منهجيات مثل Agile و Scrum وتقنيات إدارة المشاريع التقليدية لتنفيذ مشاريع ناجحة."
    }
  },
  {
    id: 5,
    title: {
      en: "Graphic Design for Beginners",
      fr: "Design Graphique pour Débutants",
      ar: "التصميم الجرافيكي للمبتدئين"
    },
    category: "graphicDesign",
    image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: {
      en: "8 weeks",
      fr: "8 semaines",
      ar: "8 أسابيع"
    },
    level: {
      en: "Beginner",
      fr: "Débutant",
      ar: "مبتدئ"
    },
    language: {
      en: "English, Arabic",
      fr: "Anglais, Arabe",
      ar: "الإنجليزية، العربية"
    },
    price: {
      en: "$750",
      fr: "750 €",
      ar: "750 دولار"
    },
    description: {
      en: "Start your journey in graphic design with this comprehensive course for beginners. Learn the principles of design, color theory, typography, and how to use Adobe Creative Suite.",
      fr: "Commencez votre parcours en design graphique avec ce cours complet pour débutants. Apprenez les principes du design, la théorie des couleurs, la typographie et comment utiliser Adobe Creative Suite.",
      ar: "ابدأ رحلتك في التصميم الجرافيكي مع هذه الدورة الشاملة للمبتدئين. تعلم مبادئ التصميم، ونظرية الألوان، والطباعة، وكيفية استخدام مجموعة أدوبي الإبداعية."
    }
  },
  {
    id: 6,
    title: {
      en: "Advanced JavaScript Programming",
      fr: "Programmation JavaScript Avancée",
      ar: "برمجة جافاسكريبت المتقدمة"
    },
    category: "webDev",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: {
      en: "10 weeks",
      fr: "10 semaines",
      ar: "10 أسابيع"
    },
    level: {
      en: "Advanced",
      fr: "Avancé",
      ar: "متقدم"
    },
    language: {
      en: "English",
      fr: "Anglais",
      ar: "الإنجليزية"
    },
    price: {
      en: "$1100",
      fr: "1100 €",
      ar: "1100 دولار"
    },
    description: {
      en: "Take your JavaScript skills to the next level. Master advanced concepts like closures, prototypes, async/await, functional programming, and modern frameworks.",
      fr: "Portez vos compétences JavaScript au niveau supérieur. Maîtrisez des concepts avancés comme les fermetures, les prototypes, async/await, la programmation fonctionnelle et les frameworks modernes.",
      ar: "انقل مهارات JavaScript الخاصة بك إلى المستوى التالي. أتقن المفاهيم المتقدمة مثل الإغلاقات، النماذج الأولية، async/await، البرمجة الوظيفية، والأطر الحديثة."
    }
  }
];

export default function CourseCatalog({ locale, translations }: CourseCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const isRTL = locale === 'ar';
  
  const filteredCourses = activeCategory === 'all'
    ? coursesData
    : coursesData.filter(course => course.category === activeCategory);
  
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
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.viewAll}
          </button>
          <button 
            onClick={() => setActiveCategory('webDev')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'webDev'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.webDev}
          </button>
          <button 
            onClick={() => setActiveCategory('graphicDesign')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'graphicDesign'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.graphicDesign}
          </button>
          <button 
            onClick={() => setActiveCategory('digitalMarketing')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'digitalMarketing'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.digitalMarketing}
          </button>
          <button 
            onClick={() => setActiveCategory('businessManagement')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'businessManagement'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.businessManagement}
          </button>
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title[locale]} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-dark mb-2">
                  {course.title[locale]}
                </h3>
                <p className="text-neutral text-sm mb-4">
                  {course.description[locale]}
                </p>
                
                {/* Course Details */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center text-sm text-neutral">
                    <FaClock className="mr-2 text-primary/70" />
                    <span>{translations.duration}: {course.duration[locale]}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral">
                    <FaGraduationCap className="mr-2 text-primary/70" />
                    <span>{translations.level}: {course.level[locale]}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral">
                    <FaLanguage className="mr-2 text-primary/70" />
                    <span>{translations.language}: {course.language[locale]}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral">
                    <FaTag className="mr-2 text-primary/70" />
                    <span>{translations.price}: {course.price[locale]}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition-colors text-sm font-medium">
                    {translations.enrollNow}
                  </button>
                  <button className="flex-1 bg-neutral-light hover:bg-neutral-light/80 text-neutral-dark py-2 rounded-lg transition-colors text-sm font-medium">
                    {translations.learnMore}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 