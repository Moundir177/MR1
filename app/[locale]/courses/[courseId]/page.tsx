import React from 'react';
import { Locale } from '@/app/i18n/settings';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FaCalendarAlt, FaClock, FaUserGraduate, FaChalkboardTeacher, FaStar, FaUsers, FaBook, FaPlayCircle, FaDownload, FaCheck } from 'react-icons/fa';

interface CoursePageProps {
  params: {
    locale: Locale;
    courseId: string;
  };
}

interface CourseModule {
  title: string;
  lessons: string[];
}

interface CourseData {
  title: string;
  subtitle: string;
  description: string;
  instructor: string;
  instructorTitle: string;
  instructorBio: string;
  price: string;
  currency: string;
  duration: string;
  level: string;
  students: string;
  rating: string;
  reviews: string;
  language: string;
  lastUpdated: string;
  enrollButton: string;
  requirements: string[];
  whatYouWillLearn: string[];
  curriculum: CourseModule[];
}

interface CourseByLanguage {
  fr: CourseData;
  ar: CourseData;
  en: CourseData;
}

interface CourseDatabase {
  [key: string]: CourseByLanguage;
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

// Mock data for course details
// In a real application, this would come from an API or database
const getCourseDetails = (courseId: string, locale: Locale): CourseData => {
  // Sample course data in different languages
  const courses: CourseDatabase = {
    '1': {
      fr: {
        title: "Développement Web Fullstack",
        subtitle: "Maîtrisez HTML, CSS, JavaScript, React et Node.js",
        description: "Ce cours complet vous apprendra à créer des applications web modernes de A à Z. De la conception frontend avec React jusqu'au développement backend avec Node.js, vous acquerrez toutes les compétences nécessaires pour devenir un développeur fullstack.",
        instructor: "Jean Dupont",
        instructorTitle: "Expert en Développement Web",
        instructorBio: "Plus de 10 ans d'expérience dans le développement web et l'enseignement. A travaillé pour des entreprises comme Google et Facebook.",
        price: "12500",
        currency: "MAD",
        duration: "6 mois",
        level: "Débutant à Intermédiaire",
        students: "324",
        rating: "4.8",
        reviews: "156",
        language: "Français",
        lastUpdated: "15/04/2023",
        enrollButton: "S'inscrire maintenant",
        requirements: [
          "Connaissance de base en informatique",
          "Ordinateur personnel avec accès à Internet",
          "Aucune expérience préalable en programmation n'est nécessaire"
        ],
        whatYouWillLearn: [
          "Créer des sites web réactifs avec HTML5 et CSS3",
          "Programmer en JavaScript moderne (ES6+)",
          "Développer des applications frontend avec React",
          "Créer des API RESTful avec Node.js et Express",
          "Connecter votre application à une base de données MongoDB",
          "Déployer vos applications sur le web"
        ],
        curriculum: [
          {
            title: "Introduction au développement web",
            lessons: ["HTML5 fondamentaux", "CSS3 et design responsive", "Introduction à JavaScript"]
          },
          {
            title: "JavaScript avancé",
            lessons: ["ES6+ et fonctionnalités modernes", "Manipulation du DOM", "Asynchrone avec Promises et Async/Await"]
          },
          {
            title: "Frontend avec React",
            lessons: ["Introduction à React", "État et props", "Hooks", "Routing avec React Router"]
          },
          {
            title: "Backend avec Node.js",
            lessons: ["Introduction à Node.js", "Express.js", "API RESTful", "Authentification et autorisation"]
          },
          {
            title: "Base de données",
            lessons: ["MongoDB", "Mongoose", "CRUD operations"]
          },
          {
            title: "Projet final",
            lessons: ["Conception d'application", "Implémentation", "Déploiement"]
          }
        ]
      },
      ar: {
        title: "تطوير الويب الشامل",
        subtitle: "أتقن HTML و CSS و JavaScript و React و Node.js",
        description: "ستعلمك هذه الدورة الشاملة كيفية إنشاء تطبيقات ويب حديثة من الألف إلى الياء. من تصميم الواجهة الأمامية باستخدام React إلى تطوير الخلفية باستخدام Node.js، ستكتسب جميع المهارات اللازمة لتصبح مطور ويب شامل.",
        instructor: "عادل حكيم",
        instructorTitle: "خبير في تطوير الويب",
        instructorBio: "أكثر من 10 سنوات من الخبرة في تطوير الويب والتدريس. عمل لدى شركات مثل جوجل وفيسبوك.",
        price: "12500",
        currency: "درهم",
        duration: "6 أشهر",
        level: "مبتدئ إلى متوسط",
        students: "324",
        rating: "4.8",
        reviews: "156",
        language: "العربية",
        lastUpdated: "15/04/2023",
        enrollButton: "سجل الآن",
        requirements: [
          "معرفة أساسية بالكمبيوتر",
          "كمبيوتر شخصي مع إمكانية الوصول إلى الإنترنت",
          "لا تلزم خبرة سابقة في البرمجة"
        ],
        whatYouWillLearn: [
          "إنشاء مواقع ويب متجاوبة باستخدام HTML5 و CSS3",
          "البرمجة بلغة JavaScript الحديثة (ES6+)",
          "تطوير تطبيقات الواجهة الأمامية باستخدام React",
          "إنشاء واجهات برمجة تطبيقات RESTful باستخدام Node.js و Express",
          "ربط تطبيقك بقاعدة بيانات MongoDB",
          "نشر تطبيقاتك على الويب"
        ],
        curriculum: [
          {
            title: "مقدمة في تطوير الويب",
            lessons: ["أساسيات HTML5", "CSS3 والتصميم المتجاوب", "مقدمة في JavaScript"]
          },
          {
            title: "JavaScript المتقدمة",
            lessons: ["ES6+ والميزات الحديثة", "التعامل مع DOM", "البرمجة غير المتزامنة مع Promises و Async/Await"]
          },
          {
            title: "الواجهة الأمامية مع React",
            lessons: ["مقدمة في React", "الحالة والخصائص", "Hooks", "التوجيه مع React Router"]
          },
          {
            title: "الخلفية مع Node.js",
            lessons: ["مقدمة في Node.js", "Express.js", "واجهة برمجة التطبيقات RESTful", "المصادقة والتفويض"]
          },
          {
            title: "قواعد البيانات",
            lessons: ["MongoDB", "Mongoose", "عمليات CRUD"]
          },
          {
            title: "المشروع النهائي",
            lessons: ["تصميم التطبيق", "التنفيذ", "النشر"]
          }
        ]
      },
      en: {
        title: "Fullstack Web Development",
        subtitle: "Master HTML, CSS, JavaScript, React and Node.js",
        description: "This comprehensive course will teach you how to create modern web applications from A to Z. From frontend design with React to backend development with Node.js, you will acquire all the skills needed to become a fullstack developer.",
        instructor: "John Smith",
        instructorTitle: "Web Development Expert",
        instructorBio: "Over 10 years of experience in web development and teaching. Has worked for companies like Google and Facebook.",
        price: "12500",
        currency: "MAD",
        duration: "6 months",
        level: "Beginner to Intermediate",
        students: "324",
        rating: "4.8",
        reviews: "156",
        language: "English",
        lastUpdated: "04/15/2023",
        enrollButton: "Enroll Now",
        requirements: [
          "Basic computer knowledge",
          "Personal computer with Internet access",
          "No prior programming experience required"
        ],
        whatYouWillLearn: [
          "Create responsive websites with HTML5 and CSS3",
          "Program in modern JavaScript (ES6+)",
          "Develop frontend applications with React",
          "Create RESTful APIs with Node.js and Express",
          "Connect your application to a MongoDB database",
          "Deploy your applications on the web"
        ],
        curriculum: [
          {
            title: "Introduction to Web Development",
            lessons: ["HTML5 fundamentals", "CSS3 and responsive design", "Introduction to JavaScript"]
          },
          {
            title: "Advanced JavaScript",
            lessons: ["ES6+ and modern features", "DOM manipulation", "Asynchronous with Promises and Async/Await"]
          },
          {
            title: "Frontend with React",
            lessons: ["Introduction to React", "State and props", "Hooks", "Routing with React Router"]
          },
          {
            title: "Backend with Node.js",
            lessons: ["Introduction to Node.js", "Express.js", "RESTful API", "Authentication and authorization"]
          },
          {
            title: "Databases",
            lessons: ["MongoDB", "Mongoose", "CRUD operations"]
          },
          {
            title: "Final Project",
            lessons: ["Application design", "Implementation", "Deployment"]
          }
        ]
      }
    },
    '2': {
      fr: {
        title: "Design UX/UI Moderne",
        subtitle: "Créez des interfaces utilisateur élégantes et intuitives",
        description: "Apprenez à concevoir des interfaces utilisateur attrayantes et fonctionnelles qui offrent une expérience utilisateur exceptionnelle. Ce cours couvre les principes de conception, les outils modernes et les meilleures pratiques de l'industrie.",
        instructor: "Sophie Martin",
        instructorTitle: "Designer UX/UI Senior",
        instructorBio: "Designer UX/UI avec plus de 8 ans d'expérience dans la création d'interfaces pour des startups et des entreprises internationales.",
        price: "9800",
        currency: "MAD",
        duration: "4 mois",
        level: "Tous niveaux",
        students: "217",
        rating: "4.7",
        reviews: "89",
        language: "Français",
        lastUpdated: "10/06/2023",
        enrollButton: "S'inscrire maintenant",
        requirements: [
          "Ordinateur avec accès Internet",
          "Idéalement, accès à Adobe XD, Figma ou Sketch",
          "Aucune expérience préalable en design n'est requise"
        ],
        whatYouWillLearn: [
          "Principes fondamentaux de l'UX Design",
          "Conception d'interfaces utilisateur modernes avec Figma",
          "Création de wireframes et de prototypes interactifs",
          "Conduite de recherches utilisateurs",
          "Mettre en œuvre des tests d'utilisabilité",
          "Créer des systèmes de design cohérents"
        ],
        curriculum: [
          {
            title: "Bases du Design UX/UI",
            lessons: ["Introduction à l'UX et UI", "Principes de design", "Psychologie des utilisateurs"]
          },
          {
            title: "Recherche Utilisateur",
            lessons: ["Techniques d'entretien", "Personas et parcours utilisateur", "Analyse de la concurrence"]
          },
          {
            title: "Wireframing et Prototypage",
            lessons: ["Créer des wireframes", "Prototypage avec Figma", "Tests d'utilisabilité"]
          },
          {
            title: "UI Design",
            lessons: ["Théorie des couleurs", "Typographie pour le web", "Systèmes de grille"]
          },
          {
            title: "Systèmes de Design",
            lessons: ["Création d'un design system", "Composants réutilisables", "Documentation"]
          },
          {
            title: "Projet Final",
            lessons: ["Conception d'un produit numérique", "Tests et itérations", "Présentation du projet"]
          }
        ]
      },
      ar: {
        title: "تصميم تجربة المستخدم/واجهة المستخدم الحديثة",
        subtitle: "إنشاء واجهات مستخدم أنيقة وبديهية",
        description: "تعلم كيفية تصميم واجهات مستخدم جذابة وعملية توفر تجربة مستخدم استثنائية. تغطي هذه الدورة مبادئ التصميم والأدوات الحديثة وأفضل ممارسات الصناعة.",
        instructor: "سارة الأمين",
        instructorTitle: "مصممة تجربة مستخدم/واجهة مستخدم كبيرة",
        instructorBio: "مصممة تجربة مستخدم/واجهة مستخدم مع أكثر من 8 سنوات من الخبرة في إنشاء واجهات للشركات الناشئة والشركات الدولية.",
        price: "9800",
        currency: "درهم",
        duration: "4 أشهر",
        level: "جميع المستويات",
        students: "217",
        rating: "4.7",
        reviews: "89",
        language: "العربية",
        lastUpdated: "10/06/2023",
        enrollButton: "سجل الآن",
        requirements: [
          "كمبيوتر متصل بالإنترنت",
          "يُفضل الوصول إلى Adobe XD أو Figma أو Sketch",
          "لا تلزم خبرة سابقة في التصميم"
        ],
        whatYouWillLearn: [
          "مبادئ تصميم تجربة المستخدم الأساسية",
          "تصميم واجهات مستخدم حديثة باستخدام Figma",
          "إنشاء نماذج أولية وتفاعلية",
          "إجراء أبحاث المستخدمين",
          "تنفيذ اختبارات قابلية الاستخدام",
          "إنشاء أنظمة تصميم متناسقة"
        ],
        curriculum: [
          {
            title: "أساسيات تصميم تجربة المستخدم/واجهة المستخدم",
            lessons: ["مقدمة في تجربة المستخدم وواجهة المستخدم", "مبادئ التصميم", "سيكولوجية المستخدمين"]
          },
          {
            title: "أبحاث المستخدمين",
            lessons: ["تقنيات المقابلة", "شخصيات ورحلات المستخدم", "تحليل المنافسين"]
          },
          {
            title: "الرسم التخطيطي والنماذج الأولية",
            lessons: ["إنشاء الرسوم التخطيطية", "النماذج الأولية باستخدام Figma", "اختبارات قابلية الاستخدام"]
          },
          {
            title: "تصميم واجهة المستخدم",
            lessons: ["نظرية الألوان", "الطباعة للويب", "أنظمة الشبكة"]
          },
          {
            title: "أنظمة التصميم",
            lessons: ["إنشاء نظام تصميم", "مكونات قابلة لإعادة الاستخدام", "التوثيق"]
          },
          {
            title: "المشروع النهائي",
            lessons: ["تصميم منتج رقمي", "الاختبارات والتكرارات", "عرض المشروع"]
          }
        ]
      },
      en: {
        title: "Modern UX/UI Design",
        subtitle: "Create elegant and intuitive user interfaces",
        description: "Learn to design attractive and functional user interfaces that deliver an exceptional user experience. This course covers design principles, modern tools, and industry best practices.",
        instructor: "Emily Johnson",
        instructorTitle: "Senior UX/UI Designer",
        instructorBio: "UX/UI designer with over 8 years of experience creating interfaces for startups and international companies.",
        price: "9800",
        currency: "MAD",
        duration: "4 months",
        level: "All levels",
        students: "217",
        rating: "4.7",
        reviews: "89",
        language: "English",
        lastUpdated: "06/10/2023",
        enrollButton: "Enroll Now",
        requirements: [
          "Computer with Internet access",
          "Ideally, access to Adobe XD, Figma, or Sketch",
          "No prior design experience required"
        ],
        whatYouWillLearn: [
          "Fundamental principles of UX Design",
          "Design modern user interfaces with Figma",
          "Create wireframes and interactive prototypes",
          "Conduct user research",
          "Implement usability testing",
          "Create consistent design systems"
        ],
        curriculum: [
          {
            title: "UX/UI Design Basics",
            lessons: ["Introduction to UX and UI", "Design principles", "User psychology"]
          },
          {
            title: "User Research",
            lessons: ["Interview techniques", "Personas and user journeys", "Competitive analysis"]
          },
          {
            title: "Wireframing and Prototyping",
            lessons: ["Creating wireframes", "Prototyping with Figma", "Usability testing"]
          },
          {
            title: "UI Design",
            lessons: ["Color theory", "Typography for web", "Grid systems"]
          },
          {
            title: "Design Systems",
            lessons: ["Creating a design system", "Reusable components", "Documentation"]
          },
          {
            title: "Final Project",
            lessons: ["Designing a digital product", "Testing and iterations", "Project presentation"]
          }
        ]
      }
    }
  };

  // Return course data or a default if not found
  return courses[courseId]?.[locale] || courses['1'].en;
};

export default async function CoursePage({ params: { locale, courseId } }: CoursePageProps) {
  const translations = await getTranslations(locale);
  const courseData = getCourseDetails(courseId, locale);
  
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations} />
      
      <main className="flex-grow py-12 bg-gray-50">
        {/* Course Header */}
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-xl mb-6">{courseData.subtitle}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center">
                  <FaUserGraduate className="mr-2" />
                  <span>{courseData.level}</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-2" />
                  <span>{courseData.students} students</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-2" />
                  <span>{courseData.rating} ({courseData.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>Updated {courseData.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="bg-white p-6 rounded-lg shadow-soft mb-8">
                <h2 className="text-2xl font-bold mb-4">About this course</h2>
                <p className="text-gray-700">{courseData.description}</p>
              </div>
              
              {/* What you'll learn */}
              <div className="bg-white p-6 rounded-lg shadow-soft mb-8">
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseData.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex">
                      <FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Requirements */}
              <div className="bg-white p-6 rounded-lg shadow-soft mb-8">
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {courseData.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              {/* Curriculum */}
              <div className="bg-white p-6 rounded-lg shadow-soft mb-8">
                <h2 className="text-2xl font-bold mb-4">Course content</h2>
                <div className="space-y-4">
                  {courseData.curriculum.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <h3 className="font-bold">{module.title}</h3>
                        <span className="text-sm text-gray-500">{module.lessons.length} lessons</span>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="p-4 flex items-center">
                            <FaPlayCircle className="text-primary mr-3" />
                            <span className="text-gray-700">{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Instructor */}
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h2 className="text-2xl font-bold mb-4">Instructor</h2>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{courseData.instructor}</h3>
                    <p className="text-gray-600 mb-3">{courseData.instructorTitle}</p>
                    <p className="text-gray-700">{courseData.instructorBio}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-soft sticky top-24">
                <div className="text-3xl font-bold mb-6">
                  {courseData.price} {courseData.currency}
                </div>
                
                <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition duration-300 mb-6">
                  {courseData.enrollButton}
                </button>
                
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{courseData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-semibold">{courseData.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-semibold">{courseData.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-semibold">{courseData.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last updated:</span>
                    <span className="font-semibold">{courseData.lastUpdated}</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Share this course</p>
                  <div className="flex justify-center space-x-4">
                    {/* Social sharing icons would go here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer locale={locale} translations={translations} />
    </div>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'en', courseId: 'web-development' },
    { locale: 'en', courseId: 'graphic-design' },
    { locale: 'en', courseId: 'digital-marketing' },
    { locale: 'fr', courseId: 'web-development' },
    { locale: 'fr', courseId: 'graphic-design' },
    { locale: 'fr', courseId: 'digital-marketing' },
    { locale: 'ar', courseId: 'web-development' },
    { locale: 'ar', courseId: 'graphic-design' },
    { locale: 'ar', courseId: 'digital-marketing' }
  ];
} 