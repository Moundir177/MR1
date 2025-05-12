import { Locale } from '../../../../i18n/settings';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FaRegPlayCircle, FaRegClock, FaCheck, FaLock, FaRegFileAlt, FaRegFilePdf, FaRegFileVideo, FaRegQuestionCircle, FaArrowLeft, FaDownload, FaRegBookmark, FaRegStar, FaStar } from 'react-icons/fa';

interface CoursePageProps {
  params: {
    locale: Locale;
    courseSlug: string;
  };
}

// Define proper types for course data
interface Resource {
  title: {
    fr: string;
    ar: string;
    en: string;
  };
  type: string;
  url: string;
}

interface Lesson {
  id: string;
  title: {
    fr: string;
    ar: string;
    en: string;
  };
  type: string;
  duration: number;
  isCompleted: boolean;
  videoUrl?: string;
  resources?: Resource[];
  transcript?: {
    fr: string;
    ar: string;
    en: string;
  };
}

interface Module {
  id: string;
  title: {
    fr: string;
    ar: string;
    en: string;
  };
  isCompleted: boolean;
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  title: {
    fr: string;
    ar: string;
    en: string;
  };
  progress: number;
  currentLessonId: string;
  totalLessons: number;
  completedLessons: number;
  totalDuration: number;
  lastUpdated: string;
  instructor: {
    name: string;
    avatar: string;
  };
  modules: Module[];
}

type CourseDataMap = {
  [key: string]: CourseData | {
    id: string;
    title: {
      fr: string;
      ar: string;
      en: string;
    };
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

// Course learning page content in all three languages
const courseLearningContent = {
  fr: {
    backToDashboard: "Retour au tableau de bord",
    overview: "Aperçu du cours",
    curriculum: "Programme",
    courseInfo: "Informations sur le cours",
    resources: "Ressources",
    discussions: "Discussions",
    notes: "Notes",
    reviews: "Avis",
    yourProgress: "Votre progression",
    completed: "Terminé",
    inProgress: "En cours",
    notStarted: "Non commencé",
    nextLesson: "Leçon suivante",
    previousLesson: "Leçon précédente",
    markAsComplete: "Marquer comme terminé",
    courseContents: "Contenu du cours",
    module: "Module",
    lesson: "Leçon",
    quiz: "Quiz",
    assignment: "Devoir",
    downloadResources: "Télécharger les ressources",
    courseNotes: "Notes de cours",
    addNote: "Ajouter une note",
    minutes: "minutes",
    locked: "Verrouillé",
    lectureNotes: "Notes de cours",
    transcript: "Transcription",
    attachments: "Pièces jointes",
    askQuestion: "Poser une question",
    saveForLater: "Sauvegarder pour plus tard",
    rateCourse: "Évaluer ce cours",
    fullscreen: "Plein écran",
    leaveReview: "Laisser un avis",
    downloadableResources: "Ressources téléchargeables",
    totalLessons: "Total des leçons",
    totalTime: "Temps total",
    lastUpdated: "Dernière mise à jour",
    completeAndContinue: "Terminer et continuer",
    videoSpeed: "Vitesse de lecture",
    courseProgress: "Progression du cours",
    congratulations: "Félicitations !",
    completedCourse: "Vous avez terminé ce cours",
    video: "Vidéo",
    quiz: "Quiz",
    assignment: "Devoir"
  },
  ar: {
    backToDashboard: "العودة إلى لوحة التحكم",
    overview: "نظرة عامة على الدورة",
    curriculum: "المنهج",
    courseInfo: "معلومات الدورة",
    resources: "الموارد",
    discussions: "المناقشات",
    notes: "الملاحظات",
    reviews: "التقييمات",
    yourProgress: "تقدمك",
    completed: "مكتمل",
    inProgress: "قيد التقدم",
    notStarted: "لم يبدأ",
    nextLesson: "الدرس التالي",
    previousLesson: "الدرس السابق",
    markAsComplete: "وضع علامة مكتمل",
    courseContents: "محتويات الدورة",
    module: "وحدة",
    lesson: "درس",
    quiz: "اختبار",
    assignment: "مهمة",
    downloadResources: "تنزيل الموارد",
    courseNotes: "ملاحظات الدورة",
    addNote: "إضافة ملاحظة",
    minutes: "دقائق",
    locked: "مغلق",
    lectureNotes: "ملاحظات المحاضرة",
    transcript: "النص",
    attachments: "المرفقات",
    askQuestion: "طرح سؤال",
    saveForLater: "حفظ للمشاهدة لاحقًا",
    rateCourse: "تقييم هذه الدورة",
    fullscreen: "ملء الشاشة",
    leaveReview: "ترك تقييم",
    downloadableResources: "الموارد القابلة للتنزيل",
    totalLessons: "إجمالي الدروس",
    totalTime: "إجمالي الوقت",
    lastUpdated: "آخر تحديث",
    completeAndContinue: "إكمال والمتابعة",
    videoSpeed: "سرعة الفيديو",
    courseProgress: "تقدم الدورة",
    congratulations: "تهانينا!",
    completedCourse: "لقد أكملت هذه الدورة",
    video: "فيديو",
    quiz: "اختبار",
    assignment: "مهمة"
  },
  en: {
    backToDashboard: "Back to Dashboard",
    overview: "Course Overview",
    curriculum: "Curriculum",
    courseInfo: "Course Info",
    resources: "Resources",
    discussions: "Discussions",
    notes: "Notes",
    reviews: "Reviews",
    yourProgress: "Your Progress",
    completed: "Completed",
    inProgress: "In Progress",
    notStarted: "Not Started",
    nextLesson: "Next Lesson",
    previousLesson: "Previous Lesson",
    markAsComplete: "Mark as Complete",
    courseContents: "Course Contents",
    module: "Module",
    lesson: "Lesson",
    quiz: "Quiz",
    assignment: "Assignment",
    downloadResources: "Download Resources",
    courseNotes: "Course Notes",
    addNote: "Add Note",
    minutes: "minutes",
    locked: "Locked",
    lectureNotes: "Lecture Notes",
    transcript: "Transcript",
    attachments: "Attachments",
    askQuestion: "Ask a Question",
    saveForLater: "Save for Later",
    rateCourse: "Rate This Course",
    fullscreen: "Fullscreen",
    leaveReview: "Leave a Review",
    downloadableResources: "Downloadable Resources",
    totalLessons: "Total Lessons",
    totalTime: "Total Time",
    lastUpdated: "Last Updated",
    completeAndContinue: "Complete & Continue",
    videoSpeed: "Video Speed",
    courseProgress: "Course Progress",
    congratulations: "Congratulations!",
    completedCourse: "You have completed this course",
    video: "Video",
    quiz: "Quiz",
    assignment: "Assignment"
  }
};

// Mock data for the web development course with curriculum
const mockCourseData: CourseDataMap = {
  "web-development-fundamentals": {
    id: "web-development-fundamentals",
    title: {
      fr: "Fondamentaux du développement web",
      ar: "أساسيات تطوير الويب",
      en: "Web Development Fundamentals"
    },
    progress: 68,
    currentLessonId: "js-intro",
    totalLessons: 42,
    completedLessons: 28,
    totalDuration: 3150, // in minutes
    lastUpdated: "2023-11-15",
    instructor: {
      name: "Jean Dupont",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    modules: [
      {
        id: "html-basics",
        title: {
          fr: "Bases du HTML",
          ar: "أساسيات HTML",
          en: "HTML Basics"
        },
        isCompleted: true,
        lessons: [
          {
            id: "intro-to-html",
            title: {
              fr: "Introduction au HTML",
              ar: "مقدمة في HTML",
              en: "Introduction to HTML"
            },
            type: "video",
            duration: 20,
            isCompleted: true
          },
          {
            id: "html-structure",
            title: {
              fr: "Structure HTML",
              ar: "هيكل HTML",
              en: "HTML Structure"
            },
            type: "video",
            duration: 25,
            isCompleted: true
          },
          {
            id: "text-elements",
            title: {
              fr: "Éléments de texte",
              ar: "عناصر النص",
              en: "Text Elements"
            },
            type: "video",
            duration: 30,
            isCompleted: true
          },
          {
            id: "html-quiz",
            title: {
              fr: "Quiz HTML",
              ar: "اختبار HTML",
              en: "HTML Quiz"
            },
            type: "quiz",
            duration: 15,
            isCompleted: true
          }
        ]
      },
      {
        id: "css-fundamentals",
        title: {
          fr: "Fondamentaux CSS",
          ar: "أساسيات CSS",
          en: "CSS Fundamentals"
        },
        isCompleted: true,
        lessons: [
          {
            id: "intro-to-css",
            title: {
              fr: "Introduction au CSS",
              ar: "مقدمة في CSS",
              en: "Introduction to CSS"
            },
            type: "video",
            duration: 25,
            isCompleted: true
          },
          {
            id: "selectors",
            title: {
              fr: "Sélecteurs CSS",
              ar: "محددات CSS",
              en: "CSS Selectors"
            },
            type: "video",
            duration: 35,
            isCompleted: true
          },
          {
            id: "box-model",
            title: {
              fr: "Modèle de boîte",
              ar: "نموذج الصندوق",
              en: "Box Model"
            },
            type: "video",
            duration: 30,
            isCompleted: true
          },
          {
            id: "layout-basics",
            title: {
              fr: "Bases de mise en page",
              ar: "أساسيات التخطيط",
              en: "Layout Basics"
            },
            type: "video",
            duration: 40,
            isCompleted: true
          },
          {
            id: "css-assignment",
            title: {
              fr: "Projet CSS",
              ar: "مشروع CSS",
              en: "CSS Project"
            },
            type: "assignment",
            duration: 60,
            isCompleted: true
          }
        ]
      },
      {
        id: "javascript-basics",
        title: {
          fr: "Bases de JavaScript",
          ar: "أساسيات JavaScript",
          en: "JavaScript Basics"
        },
        isCompleted: false,
        lessons: [
          {
            id: "js-intro",
            title: {
              fr: "Introduction à JavaScript",
              ar: "مقدمة في JavaScript",
              en: "Introduction to JavaScript"
            },
            type: "video",
            duration: 45,
            isCompleted: false,
            videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
            resources: [
              {
                title: {
                  fr: "Guide débutant JavaScript",
                  ar: "دليل مبتدئي JavaScript",
                  en: "JavaScript Beginner's Guide"
                },
                type: "pdf",
                url: "#"
              },
              {
                title: {
                  fr: "Exemples de code JavaScript",
                  ar: "أمثلة على كود JavaScript",
                  en: "JavaScript Code Examples"
                },
                type: "code",
                url: "#"
              }
            ],
            transcript: {
              fr: "Dans cette leçon, nous allons explorer les bases de JavaScript...",
              ar: "في هذا الدرس، سنستكشف أساسيات JavaScript...",
              en: "In this lesson, we'll explore the basics of JavaScript..."
            }
          },
          {
            id: "variables",
            title: {
              fr: "Variables et types de données",
              ar: "المتغيرات وأنواع البيانات",
              en: "Variables and Data Types"
            },
            type: "video",
            duration: 35,
            isCompleted: false
          },
          {
            id: "functions",
            title: {
              fr: "Fonctions",
              ar: "الدوال",
              en: "Functions"
            },
            type: "video",
            duration: 40,
            isCompleted: false
          },
          {
            id: "arrays-objects",
            title: {
              fr: "Tableaux et objets",
              ar: "المصفوفات والكائنات",
              en: "Arrays and Objects"
            },
            type: "video",
            duration: 50,
            isCompleted: false
          },
          {
            id: "dom-manipulation",
            title: {
              fr: "Manipulation du DOM",
              ar: "التلاعب بالـ DOM",
              en: "DOM Manipulation"
            },
            type: "video",
            duration: 55,
            isCompleted: false
          },
          {
            id: "js-quiz",
            title: {
              fr: "Quiz JavaScript",
              ar: "اختبار JavaScript",
              en: "JavaScript Quiz"
            },
            type: "quiz",
            duration: 20,
            isCompleted: false
          },
          {
            id: "js-project",
            title: {
              fr: "Projet JavaScript",
              ar: "مشروع JavaScript",
              en: "JavaScript Project"
            },
            type: "assignment",
            duration: 120,
            isCompleted: false
          }
        ]
      },
      {
        id: "responsive-design",
        title: {
          fr: "Design responsive",
          ar: "التصميم المتجاوب",
          en: "Responsive Design"
        },
        isCompleted: false,
        lessons: [
          {
            id: "media-queries",
            title: {
              fr: "Media Queries",
              ar: "استعلامات الوسائط",
              en: "Media Queries"
            },
            type: "video",
            duration: 30,
            isCompleted: false
          },
          {
            id: "flexbox",
            title: {
              fr: "Flexbox",
              ar: "فليكسبوكس",
              en: "Flexbox"
            },
            type: "video",
            duration: 45,
            isCompleted: false
          },
          {
            id: "css-grid",
            title: {
              fr: "CSS Grid",
              ar: "شبكة CSS",
              en: "CSS Grid"
            },
            type: "video",
            duration: 50,
            isCompleted: false
          },
          {
            id: "responsive-project",
            title: {
              fr: "Projet responsive",
              ar: "مشروع متجاوب",
              en: "Responsive Project"
            },
            type: "assignment",
            duration: 90,
            isCompleted: false
          }
        ]
      }
    ]
  },
  "ux-design-principles": {
    id: "ux-design-principles",
    title: {
      fr: "Principes de design UX",
      ar: "مبادئ تصميم تجربة المستخدم",
      en: "UX Design Principles"
    }
    // Additional course data would be here
  }
};

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <FaRegFileVideo className="text-blue-500" />;
    case 'quiz':
      return <FaRegQuestionCircle className="text-orange-500" />;
    case 'assignment':
      return <FaRegFileAlt className="text-green-500" />;
    default:
      return <FaRegFileAlt className="text-gray-500" />;
  }
};

const getLessonStatusIcon = (isCompleted: boolean, isLocked: boolean) => {
  if (isLocked) {
    return <FaLock className="text-gray-400" />;
  }
  if (isCompleted) {
    return <FaCheck className="text-green-500" />;
  }
  return <FaRegPlayCircle className="text-blue-500" />;
};

export default async function CourseLearningPage({ params: { locale, courseSlug } }: CoursePageProps) {
  const translations = await getTranslations(locale);
  const content = courseLearningContent[locale as keyof typeof courseLearningContent] || courseLearningContent.en;
  
  const courseData = mockCourseData[courseSlug as keyof typeof mockCourseData];
  if (!courseData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link href={`/${locale}/dashboard`} className="mt-4 text-primary hover:underline">
          {content.backToDashboard}
        </Link>
      </div>
    );
  }
  
  // Check if courseData is a full course or just a title
  const isFullCourse = 'modules' in courseData;
  if (!isFullCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Full course data not available</h1>
        <Link href={`/${locale}/dashboard`} className="mt-4 text-primary hover:underline">
          {content.backToDashboard}
        </Link>
      </div>
    );
  }
  
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Find current lesson
  let currentLesson: Lesson | undefined;
  let currentModuleIndex = -1;
  let currentLessonIndex = -1;
  
  for (let i = 0; i < courseData.modules.length; i++) {
    const moduleData = courseData.modules[i];
    const lessonIndex = moduleData.lessons.findIndex(lesson => lesson.id === courseData.currentLessonId);
    
    if (lessonIndex !== -1) {
      currentModuleIndex = i;
      currentLessonIndex = lessonIndex;
      currentLesson = moduleData.lessons[lessonIndex];
      break;
    }
  }
  
  if (!currentLesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link href={`/${locale}/dashboard`} className="mt-4 text-primary hover:underline">
          {content.backToDashboard}
        </Link>
      </div>
    );
  }
  
  // Find next and previous lessons
  let nextLesson: Lesson | null = null;
  let prevLesson: Lesson | null = null;
  
  if (currentModuleIndex !== -1 && currentLessonIndex !== -1) {
    // Check for next lesson in the same module
    if (currentLessonIndex < courseData.modules[currentModuleIndex].lessons.length - 1) {
      nextLesson = courseData.modules[currentModuleIndex].lessons[currentLessonIndex + 1];
    } else if (currentModuleIndex < courseData.modules.length - 1) {
      // Check first lesson of the next module
      nextLesson = courseData.modules[currentModuleIndex + 1].lessons[0];
    }
    
    // Check for previous lesson in the same module
    if (currentLessonIndex > 0) {
      prevLesson = courseData.modules[currentModuleIndex].lessons[currentLessonIndex - 1];
    } else if (currentModuleIndex > 0) {
      // Check last lesson of the previous module
      const prevModule = courseData.modules[currentModuleIndex - 1];
      prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
    }
  }
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations} />
      
      <main className="flex-grow bg-gray-100">
        {/* Top navigation for course */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link 
                  href={`/${locale}/dashboard`} 
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <FaArrowLeft className="mr-2" />
                  {content.backToDashboard}
                </Link>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">
                    {content.courseProgress}: {courseData.progress}%
                  </span>
                  <div className="w-48 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${courseData.progress}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <FaRegBookmark />
                </button>
                <div className="relative">
                  <button className="text-gray-600 hover:text-gray-900">
                    <FaRegStar />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course content area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - curriculum */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {courseData.title[locale as keyof typeof courseData.title] || courseData.title.en}
                </h2>
                <div className="mt-1 flex items-center text-sm text-gray-700">
                  <FaRegClock className="mr-1" />
                  <span>{courseData.totalDuration} {content.minutes}</span>
                  <span className="mx-2">•</span>
                  <span>{courseData.totalLessons} {content.totalLessons}</span>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">{content.courseContents}</h3>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {courseData.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border-b border-gray-200">
                      <div className={`p-4 flex justify-between items-center cursor-pointer ${module.isCompleted ? 'bg-green-50' : ''}`}>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {module.title[locale as keyof typeof module.title] || module.title.en}
                          </h3>
                          <p className="mt-1 text-xs text-gray-500">
                            {module.lessons.length} {module.lessons.length === 1 ? content.lesson.toLowerCase() : content.lesson.toLowerCase() + 's'}
                            {module.isCompleted && 
                              <span className="ml-2 inline-flex items-center text-xs font-medium text-green-800">
                                <FaCheck className="mr-1" /> {content.completed}
                              </span>
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const isCurrentLesson = lesson.id === courseData.currentLessonId;
                          // Calculate if lesson is locked (for demo, lock lessons after current module's current lesson)
                          const isLocked = moduleIndex > currentModuleIndex || 
                                          (moduleIndex === currentModuleIndex && lessonIndex > currentLessonIndex + 3);
                          
                          return (
                            <div 
                              key={lesson.id} 
                              className={`p-3 border-t border-gray-200 flex items-start 
                                ${isCurrentLesson ? 'bg-primary-50 border-l-4 border-l-primary' : ''}
                                ${isLocked ? 'opacity-60' : 'hover:bg-gray-100 cursor-pointer'}`}
                            >
                              <div className="flex-shrink-0 mt-1 mr-3">
                                {getLessonStatusIcon(lesson.isCompleted, isLocked)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex justify-between">
                                  <div className="text-sm font-medium text-gray-900 truncate flex items-center">
                                    {getLessonIcon(lesson.type)}
                                    <span className="ml-2">
                                      {lesson.title[locale as keyof typeof lesson.title] || lesson.title.en}
                                    </span>
                                  </div>
                                  <div className="ml-2 flex-shrink-0 flex items-center text-xs text-gray-500">
                                    <FaRegClock className="mr-1" />
                                    {lesson.duration} {content.minutes}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 capitalize">
                                  {content[lesson.type as keyof typeof content]}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - video player and content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video player */}
              <div className="bg-black rounded-lg shadow overflow-hidden aspect-video relative">
                {currentLesson && currentLesson.videoUrl ? (
                  <iframe
                    src={currentLesson.videoUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    title={currentLesson.title[locale as keyof typeof currentLesson.title] || currentLesson.title.en}
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <p className="text-white">{content.locked}</p>
                  </div>
                )}
              </div>
              
              {/* Lesson info and resources */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-medium text-gray-900">
                    {currentLesson.title[locale as keyof typeof currentLesson.title] || currentLesson.title.en}
                  </h2>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <img 
                        src={courseData.instructor.avatar} 
                        alt={courseData.instructor.name} 
                        className="w-6 h-6 rounded-full mr-2" 
                      />
                      <span>{courseData.instructor.name}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <FaRegClock className="mr-1" />
                      <span>{currentLesson.duration} {content.minutes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <ul className="flex border-b border-gray-200">
                    <li className="-mb-px mr-1">
                      <a 
                        href="#" 
                        className="inline-block px-4 py-2 font-medium text-sm rounded-t-lg border-b-2 border-primary text-primary"
                      >
                        {content.overview}
                      </a>
                    </li>
                    <li className="mr-1">
                      <a 
                        href="#" 
                        className="inline-block px-4 py-2 font-medium text-sm text-gray-600 hover:text-gray-800"
                      >
                        {content.notes}
                      </a>
                    </li>
                    <li className="mr-1">
                      <a 
                        href="#" 
                        className="inline-block px-4 py-2 font-medium text-sm text-gray-600 hover:text-gray-800"
                      >
                        {content.discussions}
                      </a>
                    </li>
                    <li className="mr-1">
                      <a 
                        href="#" 
                        className="inline-block px-4 py-2 font-medium text-sm text-gray-600 hover:text-gray-800"
                      >
                        {content.resources}
                      </a>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{content.transcript}</h3>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <p>{currentLesson.transcript && (currentLesson.transcript[locale as keyof typeof currentLesson.transcript] || currentLesson.transcript.en)}</p>
                    </div>
                    
                    {currentLesson.resources && currentLesson.resources.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">{content.downloadableResources}</h3>
                        <ul className="space-y-2">
                          {currentLesson.resources.map((resource, index) => (
                            <li key={index} className="flex items-center">
                              {resource.type === 'pdf' ? (
                                <FaRegFilePdf className="text-red-500 mr-2" />
                              ) : (
                                <FaRegFileAlt className="text-blue-500 mr-2" />
                              )}
                              <a 
                                href={resource.url} 
                                className="text-primary hover:underline"
                                download
                              >
                                {resource.title[locale as keyof typeof resource.title] || resource.title.en}
                              </a>
                              <button className="ml-2 text-gray-500 hover:text-gray-700">
                                <FaDownload className="w-4 h-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <div>
                    {prevLesson && (
                      <Link
                        href={`/${locale}/dashboard/courses/${courseSlug}?lesson=${prevLesson.id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {content.previousLesson}
                      </Link>
                    )}
                  </div>
                  
                  <div>
                    {!currentLesson.isCompleted ? (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                      >
                        <FaCheck className="mr-2 -ml-1 h-5 w-5" />
                        {content.markAsComplete}
                      </button>
                    ) : (
                      <div className="text-green-600 flex items-center">
                        <FaCheck className="mr-2" />
                        {content.completed}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    {nextLesson && (
                      <Link
                        href={`/${locale}/dashboard/courses/${courseSlug}?lesson=${nextLesson.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                      >
                        {content.nextLesson}
                        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    )}
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