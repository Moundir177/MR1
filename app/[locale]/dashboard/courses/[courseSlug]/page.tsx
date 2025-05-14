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
      }
    ]
  }
};

// Helper function to get the correct icon for lesson type
const getLessonIcon = (type: string) => {
  switch(type) {
    case 'video':
      return <FaRegFileVideo className="text-primary" />;
    case 'quiz':
      return <FaRegQuestionCircle className="text-secondary" />;
    case 'assignment':
      return <FaRegFileAlt className="text-accent" />;
    default:
      return <FaRegFileVideo className="text-primary" />;
  }
};

// Helper function to show completion status or lock
const getLessonStatusIcon = (isCompleted: boolean, isLocked: boolean) => {
  if (isLocked) {
    return <FaLock className="text-neutral-light" />;
  }
  return isCompleted ? 
    <FaCheck className="text-green-500" /> : 
    <div className="w-4 h-4 rounded-full border border-neutral-light"></div>;
};

export default async function CourseLearningPage({ params: { locale, courseSlug } }: CoursePageProps) {
  const translations = await getTranslations(locale);
  
  // Get the course data
  const course = mockCourseData[courseSlug] as CourseData;
  if (!course) {
    // Handle course not found
    return <div>Course not found</div>;
  }
  
  // Get the translations for the page
  const t = courseLearningContent[locale as keyof typeof courseLearningContent] || courseLearningContent.en;
  
  // Get the current lesson
  const currentModule = course.modules.find(module => 
    module.lessons.some(lesson => lesson.id === course.currentLessonId)
  );
  
  const currentLesson = currentModule?.lessons.find(lesson => lesson.id === course.currentLessonId);
  
  // Format time display (convert minutes to hours and minutes)
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };
  
  // Handle RTL for Arabic
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <main className={`min-h-screen ${isRTL ? 'font-arabic' : 'font-sans'} bg-background`} dir={dir}>
      <Navigation locale={locale} translations={translations.nav} />
      
      <div className="container-custom py-8">
        {/* Top navigation */}
        <div className="mb-8">
          <Link href={`/${locale}/dashboard`} className="inline-flex items-center text-neutral-light hover:text-primary transition-colors">
            <FaArrowLeft className="mr-2" />
            {t.backToDashboard}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            {/* Course title */}
            <h1 className="text-3xl font-bold text-neutral-dark mb-6">
              {course.title[locale as keyof typeof course.title] || course.title.en}
            </h1>
            
            {/* Video player or content display */}
            {currentLesson && (
              <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                {currentLesson.type === 'video' && currentLesson.videoUrl ? (
                  <div className="aspect-video">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={currentLesson.videoUrl} 
                      title={currentLesson.title[locale as keyof typeof currentLesson.title] || currentLesson.title.en}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video bg-neutral-dark flex items-center justify-center">
                    <div className="text-white text-center">
                      <FaRegPlayCircle className="text-6xl mx-auto mb-4" />
                      <p>{currentLesson.type === 'quiz' ? t.quiz : t.assignment}</p>
                    </div>
                  </div>
                )}
                
                {/* Lesson details and controls */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                    {currentLesson.title[locale as keyof typeof currentLesson.title] || currentLesson.title.en}
                  </h2>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center text-sm text-neutral-light">
                      <FaRegClock className="mr-2" />
                      <span>{currentLesson.duration} {t.minutes}</span>
                    </div>
                    
                    <button className="btn btn-primary">
                      {t.markAsComplete}
                    </button>
                  </div>
                  
                  {/* Tabs for different content types */}
                  <div>
                    <div className="border-b border-gray-200 mb-6">
                      <ul className="flex flex-wrap -mb-px">
                        <li className="mr-4">
                          <button className="inline-block p-4 border-b-2 border-primary text-primary font-medium">
                            {t.transcript}
                          </button>
                        </li>
                        <li className="mr-4">
                          <button className="inline-block p-4 text-neutral-light hover:text-neutral-dark font-medium">
                            {t.notes}
                          </button>
                        </li>
                        <li className="mr-4">
                          <button className="inline-block p-4 text-neutral-light hover:text-neutral-dark font-medium">
                            {t.resources}
                          </button>
                        </li>
                        <li>
                          <button className="inline-block p-4 text-neutral-light hover:text-neutral-dark font-medium">
                            {t.discussions}
                          </button>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Transcript content */}
                    {currentLesson.transcript && (
                      <div className="prose max-w-none text-neutral-dark">
                        <p>{currentLesson.transcript[locale as keyof typeof currentLesson.transcript] || currentLesson.transcript.en}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Resources section */}
            {currentLesson?.resources && currentLesson.resources.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-neutral-dark mb-4">{t.downloadableResources}</h3>
                <ul className="space-y-4">
                  {currentLesson.resources.map((resource, idx) => (
                    <li key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        {resource.type === 'pdf' ? <FaRegFilePdf className="text-red-500 mr-3" /> : <FaRegFileAlt className="text-blue-500 mr-3" />}
                        <span>{resource.title[locale as keyof typeof resource.title] || resource.title.en}</span>
                      </div>
                      <a href={resource.url} className="text-primary hover:text-primary-dark">
                        <FaDownload />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button className="btn btn-outline">
                {t.previousLesson}
              </button>
              <button className="btn btn-primary">
                {t.nextLesson}
              </button>
            </div>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="lg:col-span-1">
            {/* Course progress card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-neutral-dark mb-4">{t.courseProgress}</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-primary h-4 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-neutral-light">
                {course.completedLessons} / {course.totalLessons} {t.completed}
              </div>
            </div>
            
            {/* Course contents */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-neutral-dark mb-4">{t.courseContents}</h3>
              
              <div className="space-y-4">
                {course.modules.map((module, moduleIdx) => (
                  <div key={moduleIdx} className="border border-gray-100 rounded-lg overflow-hidden">
                    {/* Module header */}
                    <div className={`p-4 flex items-center justify-between ${module.isCompleted ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="flex items-center">
                        {module.isCompleted && <FaCheck className="text-green-500 mr-2" />}
                        <h4 className="font-medium">
                          {t.module} {moduleIdx + 1}: {module.title[locale as keyof typeof module.title] || module.title.en}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Module lessons */}
                    <ul className="divide-y divide-gray-100">
                      {module.lessons.map((lesson, lessonIdx) => {
                        const isCurrentLesson = lesson.id === course.currentLessonId;
                        const isLocked = !lesson.isCompleted && lesson.id !== course.currentLessonId;
                        
                        return (
                          <li 
                            key={lessonIdx} 
                            className={`p-4 flex items-center justify-between ${isCurrentLesson ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-center space-x-3">
                              <div>
                                {getLessonStatusIcon(lesson.isCompleted, isLocked)}
                              </div>
                              <div>
                                {getLessonIcon(lesson.type)}
                              </div>
                              <div className={`text-sm ${isLocked ? 'text-neutral-light' : 'text-neutral-dark'}`}>
                                {lesson.title[locale as keyof typeof lesson.title] || lesson.title.en}
                                <div className="text-xs text-neutral-light mt-1">
                                  {formatTime(lesson.duration)}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Course info */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-neutral-dark mb-4">{t.courseInfo}</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-neutral-light">{t.totalLessons}:</span>
                    <span className="font-medium">{course.totalLessons}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-neutral-light">{t.totalTime}:</span>
                    <span className="font-medium">{formatTime(course.totalDuration)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-neutral-light">{t.lastUpdated}:</span>
                    <span className="font-medium">{new Date(course.lastUpdated).toLocaleDateString(locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-SA' : 'en-US')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer locale={locale} translations={translations.footer} />
    </main>
  );
} 