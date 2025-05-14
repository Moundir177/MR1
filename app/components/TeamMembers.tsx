"use client";

import { useState } from 'react';
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  
  // Filter team members based on the active category
  const filteredTeamMembers = activeFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.category === activeFilter);
  
  // Find the selected member data
  const selectedMemberData = selectedMember 
    ? teamMembers.find(member => member.id === selectedMember) 
    : null;
  
  return (
    <div className="py-16 bg-background">
      <div className="container-custom">
        {/* Category filters */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          <button 
            onClick={() => setActiveFilter('all')} 
            className={`px-6 py-2 rounded-full transition-colors ${
              activeFilter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-white text-neutral hover:bg-neutral-light/20'
            }`}
          >
            {translations.categories.all}
          </button>
          <button 
            onClick={() => setActiveFilter('faculty')} 
            className={`px-6 py-2 rounded-full transition-colors ${
              activeFilter === 'faculty' 
                ? 'bg-primary text-white' 
                : 'bg-white text-neutral hover:bg-neutral-light/20'
            }`}
          >
            {translations.categories.faculty}
          </button>
          <button 
            onClick={() => setActiveFilter('staff')} 
            className={`px-6 py-2 rounded-full transition-colors ${
              activeFilter === 'staff' 
                ? 'bg-primary text-white' 
                : 'bg-white text-neutral hover:bg-neutral-light/20'
            }`}
          >
            {translations.categories.staff}
          </button>
          <button 
            onClick={() => setActiveFilter('administration')} 
            className={`px-6 py-2 rounded-full transition-colors ${
              activeFilter === 'administration' 
                ? 'bg-primary text-white' 
                : 'bg-white text-neutral hover:bg-neutral-light/20'
            }`}
          >
            {translations.categories.administration}
          </button>
        </div>
        
        {/* Team members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTeamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name[locale as keyof typeof member.name]} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-dark mb-1">
                  {member.name[locale as keyof typeof member.name]}
                </h3>
                <p className="text-neutral-light mb-4">
                  {member.role[locale as keyof typeof member.role]}
                </p>
                <button 
                  onClick={() => setSelectedMember(member.id)}
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  <FaPlus className="mr-2" />
                  {translations.viewProfile}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal for team member details */}
        {selectedMember && selectedMemberData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 lg:p-8 relative">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-6 right-6 text-neutral-light hover:text-neutral-dark"
                >
                  <FaTimes size={24} />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="mb-6">
                      <div className="rounded-xl overflow-hidden mb-4">
                        <img 
                          src={selectedMemberData.image} 
                          alt={selectedMemberData.name[locale as keyof typeof selectedMemberData.name]} 
                          className="w-full h-auto"
                        />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-neutral-dark mb-1">
                        {selectedMemberData.name[locale as keyof typeof selectedMemberData.name]}
                      </h3>
                      <p className="text-primary font-medium mb-4">
                        {selectedMemberData.role[locale as keyof typeof selectedMemberData.role]}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-neutral-dark mb-3">
                        {translations.contactMember}
                      </h4>
                      <div className="space-y-3">
                        <a href={`mailto:${selectedMemberData.email}`} className="flex items-center text-neutral hover:text-primary transition-colors">
                          <FaEnvelope className="mr-3" />
                          <span>{selectedMemberData.email}</span>
                        </a>
                        {selectedMemberData.linkedin && (
                          <a href={selectedMemberData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-neutral hover:text-primary transition-colors">
                            <FaLinkedinIn className="mr-3" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {selectedMemberData.twitter && (
                          <a href={selectedMemberData.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center text-neutral hover:text-primary transition-colors">
                            <FaTwitter className="mr-3" />
                            <span>Twitter</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="mb-6">
                      <p className="text-neutral leading-relaxed mb-4">
                        {selectedMemberData.bio[locale as keyof typeof selectedMemberData.bio]}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-neutral-dark mb-3">
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMemberData.specialties[locale as keyof typeof selectedMemberData.specialties].map((specialty, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-neutral-light/20 text-neutral rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="px-6 py-2 bg-neutral-light/20 text-neutral-dark rounded-md hover:bg-neutral-light/30 transition-colors"
                  >
                    {translations.closeProfile}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 