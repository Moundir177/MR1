"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaEnvelope, FaPlus, FaTimes } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface TeamMembersProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      faculty: string;
      staff: string;
      administration: string;
    };
    viewProfile: string;
    contactMember: string;
    closeProfile: string;
  };
}

// Mock team data - in a real app, this would come from a CMS or database
const teamMembers = [
  {
    id: 1,
    name: {
      en: "Dr. Ahmed Benali",
      fr: "Dr. Ahmed Benali",
      ar: "د. أحمد بن علي"
    },
    role: {
      en: "Director & Head of Web Development",
      fr: "Directeur & Chef du Développement Web",
      ar: "المدير ورئيس تطوير الويب"
    },
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256",
    category: "administration",
    bio: {
      en: "Dr. Ahmed Benali has over 15 years of experience in web development and computer science education. He holds a PhD in Computer Science from MIT and has published numerous papers on educational technology.",
      fr: "Dr. Ahmed Benali possède plus de 15 ans d'expérience dans le développement web et l'enseignement de l'informatique. Il est titulaire d'un doctorat en informatique du MIT et a publié de nombreux articles sur la technologie éducative.",
      ar: "د. أحمد بن علي لديه أكثر من 15 عامًا من الخبرة في تطوير الويب وتعليم علوم الكمبيوتر. حصل على درجة الدكتوراه في علوم الكمبيوتر من معهد ماساتشوستس للتكنولوجيا ونشر العديد من الأبحاث حول تكنولوجيا التعليم."
    },
    email: "ahmed.benali@miracademy.com",
    linkedin: "https://linkedin.com/in/ahmedbenali",
    twitter: "https://twitter.com/ahmedbenali",
    specialties: {
      en: ["Web Development", "Educational Technology", "Leadership"],
      fr: ["Développement Web", "Technologie Éducative", "Leadership"],
      ar: ["تطوير الويب", "تكنولوجيا التعليم", "القيادة"]
    }
  },
  {
    id: 2,
    name: {
      en: "Fatima Zahra",
      fr: "Fatima Zahra",
      ar: "فاطمة الزهراء"
    },
    role: {
      en: "Head of UX/UI Design",
      fr: "Responsable du Design UX/UI",
      ar: "رئيسة تصميم تجربة وواجهة المستخدم"
    },
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256",
    category: "faculty",
    bio: {
      en: "Fatima is an award-winning designer with expertise in creating user-centered experiences. She previously worked at Google and Adobe before joining MIRA ACADEMY to lead the UX/UI Design department.",
      fr: "Fatima est une designer primée, experte dans la création d'expériences centrées sur l'utilisateur. Elle a travaillé chez Google et Adobe avant de rejoindre MIRA ACADEMY pour diriger le département de Design UX/UI.",
      ar: "فاطمة مصممة حائزة على جوائز ولديها خبرة في إنشاء تجارب تركز على المستخدم. عملت سابقًا في Google و Adobe قبل الانضمام إلى أكاديمية ميرا لتقود قسم تصميم تجربة وواجهة المستخدم."
    },
    email: "fatima.zahra@miracademy.com",
    linkedin: "https://linkedin.com/in/fatimazahra",
    twitter: "https://twitter.com/fatimazahra",
    specialties: {
      en: ["UX/UI Design", "User Research", "Design Systems"],
      fr: ["Design UX/UI", "Recherche Utilisateur", "Systèmes de Design"],
      ar: ["تصميم تجربة وواجهة المستخدم", "أبحاث المستخدم", "أنظمة التصميم"]
    }
  },
  {
    id: 3,
    name: {
      en: "Karim Mansouri",
      fr: "Karim Mansouri",
      ar: "كريم منصوري"
    },
    role: {
      en: "Lead Instructor, Data Science",
      fr: "Instructeur Principal, Science des Données",
      ar: "المدرب الرئيسي، علوم البيانات"
    },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256",
    category: "faculty",
    bio: {
      en: "Karim specializes in data science and machine learning. He has worked on major AI projects for international companies and brings his practical experience into the classroom. He holds a Master's degree in Applied Mathematics.",
      fr: "Karim est spécialisé dans la science des données et l'apprentissage automatique. Il a travaillé sur d'importants projets d'IA pour des entreprises internationales et apporte son expérience pratique en classe. Il est titulaire d'un Master en Mathématiques Appliquées.",
      ar: "كريم متخصص في علوم البيانات والتعلم الآلي. عمل في مشاريع ذكاء اصطناعي كبرى لشركات دولية ويقدم خبرته العملية في الفصل الدراسي. حاصل على درجة الماجستير في الرياضيات التطبيقية."
    },
    email: "karim.mansouri@miracademy.com",
    linkedin: "https://linkedin.com/in/karimmansouri",
    twitter: "https://twitter.com/karimmansouri",
    specialties: {
      en: ["Data Science", "Machine Learning", "Python", "Statistical Analysis"],
      fr: ["Science des Données", "Apprentissage Automatique", "Python", "Analyse Statistique"],
      ar: ["علوم البيانات", "التعلم الآلي", "بايثون", "التحليل الإحصائي"]
    }
  },
  {
    id: 4,
    name: {
      en: "Sarah Lahlou",
      fr: "Sarah Lahlou",
      ar: "سارة لحلو"
    },
    role: {
      en: "Student Affairs Coordinator",
      fr: "Coordinatrice des Affaires Étudiantes",
      ar: "منسقة شؤون الطلاب"
    },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256",
    category: "staff",
    bio: {
      en: "Sarah manages student support services and ensures a positive experience for all MIRA ACADEMY students. She has a background in psychology and education management.",
      fr: "Sarah gère les services de soutien aux étudiants et assure une expérience positive pour tous les étudiants de MIRA ACADEMY. Elle a une formation en psychologie et en gestion de l'éducation.",
      ar: "تدير سارة خدمات دعم الطلاب وتضمن تجربة إيجابية لجميع طلاب أكاديمية ميرا. لديها خلفية في علم النفس وإدارة التعليم."
    },
    email: "sarah.lahlou@miracademy.com",
    linkedin: "https://linkedin.com/in/sarahlahlou",
    twitter: null,
    specialties: {
      en: ["Student Counseling", "Event Organization", "Community Building"],
      fr: ["Conseil aux Étudiants", "Organisation d'Événements", "Construction Communautaire"],
      ar: ["إرشاد الطلاب", "تنظيم الفعاليات", "بناء المجتمع"]
    }
  },
  {
    id: 5,
    name: {
      en: "Youssef Alami",
      fr: "Youssef Alami",
      ar: "يوسف علمي"
    },
    role: {
      en: "Lead Instructor, Digital Marketing",
      fr: "Instructeur Principal, Marketing Digital",
      ar: "المدرب الرئيسي، التسويق الرقمي"
    },
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=256",
    category: "faculty",
    bio: {
      en: "Youssef is a digital marketing expert with 10+ years of experience working with major brands. He specializes in SEO, social media strategy, and content marketing. He's passionate about teaching the next generation of marketers.",
      fr: "Youssef est un expert en marketing digital avec plus de 10 ans d'expérience auprès de grandes marques. Il est spécialisé dans le SEO, la stratégie de médias sociaux et le marketing de contenu. Il est passionné par l'enseignement de la prochaine génération de marketeurs.",
      ar: "يوسف خبير في التسويق الرقمي مع أكثر من 10 سنوات من الخبرة في العمل مع العلامات التجارية الكبرى. متخصص في تحسين محركات البحث واستراتيجية وسائل التواصل الاجتماعي والتسويق بالمحتوى. لديه شغف بتعليم الجيل القادم من المسوقين."
    },
    email: "youssef.alami@miracademy.com",
    linkedin: "https://linkedin.com/in/youssefcalami",
    twitter: "https://twitter.com/youssefcalami",
    specialties: {
      en: ["Digital Marketing", "SEO", "Social Media Strategy", "Content Marketing"],
      fr: ["Marketing Digital", "SEO", "Stratégie de Médias Sociaux", "Marketing de Contenu"],
      ar: ["التسويق الرقمي", "تحسين محركات البحث", "استراتيجية وسائل التواصل الاجتماعي", "التسويق بالمحتوى"]
    }
  },
  {
    id: 6,
    name: {
      en: "Leila Benmoussa",
      fr: "Leila Benmoussa",
      ar: "ليلى بن موسى"
    },
    role: {
      en: "Administrative Assistant",
      fr: "Assistante Administrative",
      ar: "مساعدة إدارية"
    },
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=256",
    category: "staff",
    bio: {
      en: "Leila manages daily operations including scheduling, correspondence, and administrative support. Her efficient organizational skills keep MIRA ACADEMY running smoothly.",
      fr: "Leila gère les opérations quotidiennes, notamment la planification, la correspondance et le soutien administratif. Ses compétences organisationnelles efficaces permettent à MIRA ACADEMY de fonctionner sans heurts.",
      ar: "تدير ليلى العمليات اليومية بما في ذلك الجدولة والمراسلات والدعم الإداري. مهاراتها التنظيمية الفعالة تحافظ على سير عمل أكاديمية ميرا بسلاسة."
    },
    email: "leila.benmoussa@miracademy.com",
    linkedin: "https://linkedin.com/in/leilabenmoussa",
    twitter: null,
    specialties: {
      en: ["Administrative Support", "Scheduling", "Office Management"],
      fr: ["Soutien Administratif", "Planification", "Gestion de Bureau"],
      ar: ["الدعم الإداري", "الجدولة", "إدارة المكتب"]
    }
  },
  {
    id: 7,
    name: {
      en: "Mohammed Chaoui",
      fr: "Mohammed Chaoui",
      ar: "محمد شاوي"
    },
    role: {
      en: "Finance Manager",
      fr: "Responsable Financier",
      ar: "مدير الشؤون المالية"
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256",
    category: "administration",
    bio: {
      en: "Mohammed oversees all financial operations at MIRA ACADEMY, including budgeting, financial planning, and accounting. He has an MBA in Finance and 12 years of experience in the education sector.",
      fr: "Mohammed supervise toutes les opérations financières de MIRA ACADEMY, y compris la budgétisation, la planification financière et la comptabilité. Il possède un MBA en Finance et 12 ans d'expérience dans le secteur de l'éducation.",
      ar: "يشرف محمد على جميع العمليات المالية في أكاديمية ميرا، بما في ذلك وضع الميزانية والتخطيط المالي والمحاسبة. حاصل على ماجستير في إدارة الأعمال تخصص مالية ولديه 12 عامًا من الخبرة في قطاع التعليم."
    },
    email: "mohammed.chaoui@miracademy.com",
    linkedin: "https://linkedin.com/in/mohammedchaoui",
    twitter: null,
    specialties: {
      en: ["Financial Management", "Budgeting", "Strategic Planning"],
      fr: ["Gestion Financière", "Budgétisation", "Planification Stratégique"],
      ar: ["الإدارة المالية", "وضع الميزانية", "التخطيط الاستراتيجي"]
    }
  },
  {
    id: 8,
    name: {
      en: "Nadia Touzani",
      fr: "Nadia Touzani",
      ar: "نادية توزاني"
    },
    role: {
      en: "Lead Instructor, Graphic Design",
      fr: "Instructrice Principale, Design Graphique",
      ar: "المدربة الرئيسية، التصميم الجرافيكي"
    },
    image: "https://images.unsplash.com/photo-1592621385612-4d7129426394?auto=format&fit=crop&q=80&w=256",
    category: "faculty",
    bio: {
      en: "Nadia brings creativity and industry knowledge to her graphic design courses. With a background in advertising and branding, she helps students develop professional portfolios ready for the job market.",
      fr: "Nadia apporte créativité et connaissance de l'industrie à ses cours de design graphique. Avec une expérience en publicité et en branding, elle aide les étudiants à développer des portfolios professionnels prêts pour le marché du travail.",
      ar: "تجلب نادية الإبداع ومعرفة الصناعة إلى دورات التصميم الجرافيكي. بخلفية في الإعلان والعلامات التجارية، تساعد الطلاب على تطوير ملفات أعمال احترافية جاهزة لسوق العمل."
    },
    email: "nadia.touzani@miracademy.com",
    linkedin: "https://linkedin.com/in/nadiatouzani",
    twitter: "https://twitter.com/nadiatouzani",
    specialties: {
      en: ["Graphic Design", "Brand Identity", "Typography", "Adobe Creative Suite"],
      fr: ["Design Graphique", "Identité de Marque", "Typographie", "Adobe Creative Suite"],
      ar: ["التصميم الجرافيكي", "هوية العلامة التجارية", "الطباعة", "مجموعة أدوبي الإبداعية"]
    }
  }
];

export default function TeamMembers({ locale, translations }: TeamMembersProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<null | typeof teamMembers[0]>(null);
  const isRTL = locale === 'ar';
  
  const filteredMembers = activeFilter === 'all'
    ? teamMembers
    : teamMembers.filter(member => member.category === activeFilter);
  
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
            className="text-neutral max-w-2xl mx-auto"
          >
            {translations.subtitle}
          </motion.p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.categories.all}
          </button>
          <button
            onClick={() => setActiveFilter('faculty')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'faculty'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.categories.faculty}
          </button>
          <button
            onClick={() => setActiveFilter('administration')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'administration'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.categories.administration}
          </button>
          <button
            onClick={() => setActiveFilter('staff')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'staff'
                ? 'bg-primary text-white'
                : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
            }`}
          >
            {translations.categories.staff}
          </button>
        </div>
        
        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/10">
                  <img 
                    src={member.image} 
                    alt={member.name[locale]} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-neutral-dark mb-1">
                  {member.name[locale]}
                </h3>
                <p className="text-primary mb-4 text-sm">
                  {member.role[locale]}
                </p>
                
                <button
                  onClick={() => setSelectedMember(member)}
                  className="inline-flex items-center justify-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  <span className="mr-1">{translations.viewProfile}</span>
                  <FaPlus size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Member Profile Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 md:p-6" onClick={() => setSelectedMember(null)}>
            <div 
              className={`bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto ${isRTL ? 'font-arabic' : 'font-sans'}`}
              onClick={(e) => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div className="relative">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-neutral-dark hover:text-primary transition-colors z-10"
                  aria-label={translations.closeProfile}
                >
                  <FaTimes />
                </button>
                
                <div className="md:flex">
                  <div className="md:w-2/5 bg-primary/5 p-8 text-center">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/10">
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name[locale]} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-dark mb-1">
                      {selectedMember.name[locale]}
                    </h3>
                    <p className="text-primary mb-6 font-medium">
                      {selectedMember.role[locale]}
                    </p>
                    
                    <div className="flex justify-center gap-3 mb-6">
                      <a 
                        href={`mailto:${selectedMember.email}`}
                        className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors"
                        aria-label={`Email ${selectedMember.name[locale]}`}
                      >
                        <FaEnvelope />
                      </a>
                      {selectedMember.linkedin && (
                        <a 
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors"
                          aria-label={`LinkedIn profile for ${selectedMember.name[locale]}`}
                        >
                          <FaLinkedinIn />
                        </a>
                      )}
                      {selectedMember.twitter && (
                        <a 
                          href={selectedMember.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors"
                          aria-label={`Twitter profile for ${selectedMember.name[locale]}`}
                        >
                          <FaTwitter />
                        </a>
                      )}
                    </div>
                    
                    <div className="text-left">
                      <h4 className="font-bold text-neutral-dark mb-2 text-sm uppercase tracking-wider">
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.specialties[locale].map((specialty, index) => (
                          <span 
                            key={index}
                            className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 p-8">
                    <h4 className="text-xl font-bold text-neutral-dark mb-4 border-b border-gray-200 pb-2">
                      Biography
                    </h4>
                    <p className="text-neutral mb-6">
                      {selectedMember.bio[locale]}
                    </p>
                    
                    <div className="text-center mt-8">
                      <a 
                        href={`mailto:${selectedMember.email}`}
                        className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg transition-colors"
                      >
                        <FaEnvelope className="mr-2" />
                        {translations.contactMember}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 