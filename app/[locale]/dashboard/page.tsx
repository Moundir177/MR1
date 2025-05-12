import { Locale } from '@/app/i18n/settings';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaClock, 
  FaChartLine, 
  FaUser, 
  FaBook, 
  FaCertificate, 
  FaBell, 
  FaCog,
  FaPlayCircle,
  FaCheckCircle,
  FaLock,
  FaHeart,
  FaStar
} from 'react-icons/fa';

interface DashboardPageProps {
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

// Dashboard content in all three languages
const dashboardContent = {
  fr: {
    title: "Tableau de bord",
    greeting: "Bonjour, ",
    summary: "Résumé",
    enrolledCourses: "Cours inscrits",
    coursesCompleted: "Cours terminés",
    totalHoursLearned: "Heures totales d'apprentissage",
    certificatesEarned: "Certificats obtenus",
    myCourses: "Mes cours",
    inProgress: "En cours",
    completed: "Terminés",
    upcomingEvents: "Évènements à venir",
    today: "Aujourd'hui",
    viewAll: "Voir tout",
    continueButton: "Continuer",
    myCertificates: "Mes certificats",
    noCertificates: "Vous n'avez pas encore obtenu de certificats. Terminez vos cours pour recevoir vos certificats.",
    myAccount: "Mon compte",
    profileSettings: "Paramètres du profil",
    notifications: "Notifications",
    favorites: "Favoris",
    logout: "Déconnexion",
    recommendedCourses: "Cours recommandés",
    progressStats: "Statistiques de progression",
    thisWeek: "Cette semaine",
    totalProgress: "Progression totale",
    achievements: "Réalisations",
    nextLesson: "Prochaine leçon",
    deadline: "Date limite",
    noUpcomingEvents: "Vous n'avez pas d'événements à venir",
    studyTime: "Temps d'étude",
    quizScore: "Score aux quiz"
  },
  ar: {
    title: "لوحة التحكم",
    greeting: "مرحباً، ",
    summary: "ملخص",
    enrolledCourses: "الدورات المسجلة",
    coursesCompleted: "الدورات المكتملة",
    totalHoursLearned: "إجمالي ساعات التعلم",
    certificatesEarned: "الشهادات المكتسبة",
    myCourses: "دوراتي",
    inProgress: "قيد التقدم",
    completed: "مكتملة",
    upcomingEvents: "الأحداث القادمة",
    today: "اليوم",
    viewAll: "عرض الكل",
    continueButton: "استمرار",
    myCertificates: "شهاداتي",
    noCertificates: "لم تحصل على أي شهادات بعد. أكمل دوراتك للحصول على شهاداتك.",
    myAccount: "حسابي",
    profileSettings: "إعدادات الملف الشخصي",
    notifications: "الإشعارات",
    favorites: "المفضلة",
    logout: "تسجيل الخروج",
    recommendedCourses: "الدورات الموصى بها",
    progressStats: "إحصائيات التقدم",
    thisWeek: "هذا الأسبوع",
    totalProgress: "التقدم الإجمالي",
    achievements: "الإنجازات",
    nextLesson: "الدرس التالي",
    deadline: "الموعد النهائي",
    noUpcomingEvents: "ليس لديك أحداث قادمة",
    studyTime: "وقت الدراسة",
    quizScore: "نتيجة الاختبار"
  },
  en: {
    title: "Dashboard",
    greeting: "Hello, ",
    summary: "Summary",
    enrolledCourses: "Enrolled Courses",
    coursesCompleted: "Courses Completed",
    totalHoursLearned: "Total Hours Learned",
    certificatesEarned: "Certificates Earned",
    myCourses: "My Courses",
    inProgress: "In Progress",
    completed: "Completed",
    upcomingEvents: "Upcoming Events",
    today: "Today",
    viewAll: "View All",
    continueButton: "Continue",
    myCertificates: "My Certificates",
    noCertificates: "You haven't earned any certificates yet. Complete your courses to receive your certificates.",
    myAccount: "My Account",
    profileSettings: "Profile Settings",
    notifications: "Notifications",
    favorites: "Favorites",
    logout: "Logout",
    recommendedCourses: "Recommended Courses",
    progressStats: "Progress Statistics",
    thisWeek: "This Week",
    totalProgress: "Total Progress",
    achievements: "Achievements",
    nextLesson: "Next Lesson",
    deadline: "Deadline",
    noUpcomingEvents: "You have no upcoming events",
    studyTime: "Study Time",
    quizScore: "Quiz Score"
  }
};

// Mock data for user's enrolled courses
const mockEnrolledCourses = {
  fr: [
    {
      id: "1",
      title: "Développement Web Fullstack",
      progress: 65,
      image: "/images/courses/web-dev.jpg",
      nextLesson: "API RESTful avec Express.js",
      totalLessons: 42,
      completedLessons: 27,
      lastAccessed: "2023-10-15"
    },
    {
      id: "2",
      title: "UX/UI Design Fondamentaux",
      progress: 30,
      image: "/images/courses/ux-ui.jpg",
      nextLesson: "Wireframing et Prototypage",
      totalLessons: 36,
      completedLessons: 11,
      lastAccessed: "2023-10-10"
    },
    {
      id: "3",
      title: "Introduction au Marketing Digital",
      progress: 100,
      image: "/images/courses/digital-marketing.jpg",
      nextLesson: "Cours terminé",
      totalLessons: 24,
      completedLessons: 24,
      lastAccessed: "2023-09-28",
      completed: true
    }
  ],
  ar: [
    {
      id: "1",
      title: "تطوير الويب الشامل",
      progress: 65,
      image: "/images/courses/web-dev.jpg",
      nextLesson: "واجهة برمجة تطبيقات RESTful مع Express.js",
      totalLessons: 42,
      completedLessons: 27,
      lastAccessed: "2023-10-15"
    },
    {
      id: "2",
      title: "أساسيات تصميم UX/UI",
      progress: 30,
      image: "/images/courses/ux-ui.jpg",
      nextLesson: "التخطيط والنماذج الأولية",
      totalLessons: 36,
      completedLessons: 11,
      lastAccessed: "2023-10-10"
    },
    {
      id: "3",
      title: "مقدمة في التسويق الرقمي",
      progress: 100,
      image: "/images/courses/digital-marketing.jpg",
      nextLesson: "الدورة مكتملة",
      totalLessons: 24,
      completedLessons: 24,
      lastAccessed: "2023-09-28",
      completed: true
    }
  ],
  en: [
    {
      id: "1",
      title: "Fullstack Web Development",
      progress: 65,
      image: "/images/courses/web-dev.jpg",
      nextLesson: "RESTful APIs with Express.js",
      totalLessons: 42,
      completedLessons: 27,
      lastAccessed: "2023-10-15"
    },
    {
      id: "2",
      title: "UX/UI Design Fundamentals",
      progress: 30,
      image: "/images/courses/ux-ui.jpg",
      nextLesson: "Wireframing and Prototyping",
      totalLessons: 36,
      completedLessons: 11,
      lastAccessed: "2023-10-10"
    },
    {
      id: "3",
      title: "Introduction to Digital Marketing",
      progress: 100,
      image: "/images/courses/digital-marketing.jpg",
      nextLesson: "Course completed",
      totalLessons: 24,
      completedLessons: 24,
      lastAccessed: "2023-09-28",
      completed: true
    }
  ]
};

// Mock data for upcoming events
const mockUpcomingEvents = {
  fr: [
    {
      title: "Webinaire: Tendances du développement web en 2023",
      date: "2023-10-20",
      time: "14:00",
      duration: "1h",
      type: "webinar"
    },
    {
      title: "Date limite: Projet de conception d'interface utilisateur",
      date: "2023-10-25",
      type: "deadline"
    },
    {
      title: "Session de mentorat: Carrières dans le développement web",
      date: "2023-10-27",
      time: "16:30",
      duration: "45min",
      type: "mentoring"
    }
  ],
  ar: [
    {
      title: "ندوة عبر الإنترنت: اتجاهات تطوير الويب في 2023",
      date: "2023-10-20",
      time: "14:00",
      duration: "1 ساعة",
      type: "webinar"
    },
    {
      title: "الموعد النهائي: مشروع تصميم واجهة المستخدم",
      date: "2023-10-25",
      type: "deadline"
    },
    {
      title: "جلسة إرشاد: الوظائف في مجال تطوير الويب",
      date: "2023-10-27",
      time: "16:30",
      duration: "45 دقيقة",
      type: "mentoring"
    }
  ],
  en: [
    {
      title: "Webinar: Web Development Trends in 2023",
      date: "2023-10-20",
      time: "14:00",
      duration: "1h",
      type: "webinar"
    },
    {
      title: "Deadline: User Interface Design Project",
      date: "2023-10-25",
      type: "deadline"
    },
    {
      title: "Mentoring Session: Careers in Web Development",
      date: "2023-10-27",
      time: "16:30",
      duration: "45min",
      type: "mentoring"
    }
  ]
};

// Mock data for recommended courses
const mockRecommendedCourses = {
  fr: [
    {
      id: "4",
      title: "Développement d'Applications Mobiles avec React Native",
      rating: 4.9,
      students: 1823,
      image: "/images/courses/react-native.jpg"
    },
    {
      id: "5",
      title: "Intelligence Artificielle et Machine Learning: Fondamentaux",
      rating: 4.7,
      students: 2145,
      image: "/images/courses/ai-ml.jpg"
    }
  ],
  ar: [
    {
      id: "4",
      title: "تطوير تطبيقات الجوال باستخدام React Native",
      rating: 4.9,
      students: 1823,
      image: "/images/courses/react-native.jpg"
    },
    {
      id: "5",
      title: "الذكاء الاصطناعي وتعلم الآلة: الأساسيات",
      rating: 4.7,
      students: 2145,
      image: "/images/courses/ai-ml.jpg"
    }
  ],
  en: [
    {
      id: "4",
      title: "Mobile App Development with React Native",
      rating: 4.9,
      students: 1823,
      image: "/images/courses/react-native.jpg"
    },
    {
      id: "5",
      title: "Artificial Intelligence and Machine Learning: Fundamentals",
      rating: 4.7,
      students: 2145,
      image: "/images/courses/ai-ml.jpg"
    }
  ]
};

// Mock user data
const mockUserData = {
  fr: {
    name: "Thomas Dupont",
    enrolledCourses: 3,
    completedCourses: 1,
    totalHours: 64,
    certificates: 1
  },
  ar: {
    name: "توماس دوبونت",
    enrolledCourses: 3,
    completedCourses: 1,
    totalHours: 64,
    certificates: 1
  },
  en: {
    name: "Thomas Dupont",
    enrolledCourses: 3,
    completedCourses: 1,
    totalHours: 64,
    certificates: 1
  }
};

export default async function DashboardPage({ params: { locale } }: DashboardPageProps) {
  const translations = await getTranslations(locale);
  const content = dashboardContent[locale as keyof typeof dashboardContent] || dashboardContent.en;
  const userData = mockUserData[locale as keyof typeof mockUserData] || mockUserData.en;
  const enrolledCourses = mockEnrolledCourses[locale as keyof typeof mockEnrolledCourses] || mockEnrolledCourses.en;
  const upcomingEvents = mockUpcomingEvents[locale as keyof typeof mockUpcomingEvents] || mockUpcomingEvents.en;
  const recommendedCourses = mockRecommendedCourses[locale as keyof typeof mockRecommendedCourses] || mockRecommendedCourses.en;
  
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Calculate summary statistics
  const inProgressCourses = enrolledCourses.filter(course => !course.completed);
  const completedCourses = enrolledCourses.filter(course => course.completed);
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations} />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
            <p className="text-lg text-gray-600">{content.greeting}{userData.name}</p>
          </div>
          
          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-primary-light p-3 mr-4">
                  <FaGraduationCap className="text-primary text-xl" />
                </div>
                <span className="text-gray-500">{content.enrolledCourses}</span>
              </div>
              <p className="text-3xl font-bold">{userData.enrolledCourses}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <span className="text-gray-500">{content.coursesCompleted}</span>
              </div>
              <p className="text-3xl font-bold">{userData.completedCourses}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <FaClock className="text-blue-600 text-xl" />
                </div>
                <span className="text-gray-500">{content.totalHoursLearned}</span>
              </div>
              <p className="text-3xl font-bold">{userData.totalHours}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-yellow-100 p-3 mr-4">
                  <FaCertificate className="text-yellow-600 text-xl" />
                </div>
                <span className="text-gray-500">{content.certificatesEarned}</span>
              </div>
              <p className="text-3xl font-bold">{userData.certificates}</p>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - My Courses */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">{content.myCourses}</h2>
                    <div className="flex space-x-4">
                      <button className="text-primary font-medium">{content.inProgress} ({inProgressCourses.length})</button>
                      <button className="text-gray-500 font-medium">{content.completed} ({completedCourses.length})</button>
                    </div>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {inProgressCourses.map((course, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4 bg-gray-200 rounded-md h-24 flex items-center justify-center">
                          {/* Placeholder for course image */}
                          <FaBook className="text-4xl text-gray-400" />
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <FaPlayCircle className="mr-2" />
                            <span>{content.nextLesson}: {course.nextLesson}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm">
                              <span className="font-medium">{course.completedLessons}</span> / {course.totalLessons} {locale === 'fr' ? 'leçons' : locale === 'ar' ? 'دروس' : 'lessons'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {Math.round(course.progress)}% {locale === 'fr' ? 'terminé' : locale === 'ar' ? 'مكتمل' : 'complete'}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <div className="mt-4">
                            <Link
                              href={`/${locale}/courses/${course.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                            >
                              {content.continueButton}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Progress Statistics */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">{content.progressStats}</h2>
                    <span className="text-sm font-medium text-gray-500">{content.thisWeek}</span>
                  </div>
                </div>
                <div className="p-6">
                  {/* Study Time Stats */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{content.studyTime}</h3>
                      <span className="text-sm text-gray-500">12 {locale === 'fr' ? 'heures' : locale === 'ar' ? 'ساعة' : 'hours'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  {/* Quiz Score Stats */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{content.quizScore}</h3>
                      <span className="text-sm text-gray-500">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  {/* Total Progress Stats */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{content.totalProgress}</h3>
                      <span className="text-sm text-gray-500">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recommended Courses */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">{content.recommendedCourses}</h2>
                    <Link href={`/${locale}/courses`} className="text-sm font-medium text-primary">
                      {content.viewAll}
                    </Link>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedCourses.map((course, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-gray-200 h-36 flex items-center justify-center">
                        {/* Placeholder for course image */}
                        <FaBook className="text-4xl text-gray-400" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{course.title}</h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="text-sm">{course.rating}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            <FaUser className="inline mr-1" />
                            {course.students} {locale === 'fr' ? 'étudiants' : locale === 'ar' ? 'طالب' : 'students'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">{content.upcomingEvents}</h2>
                    <span className="text-sm font-medium text-gray-500">{content.today}</span>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className={`rounded-full p-2 mr-3 ${
                            event.type === 'webinar' ? 'bg-blue-100 text-blue-600' :
                            event.type === 'deadline' ? 'bg-red-100 text-red-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {event.type === 'webinar' ? <FaPlayCircle /> :
                             event.type === 'deadline' ? <FaClock /> :
                             <FaUser />}
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">{event.title}</h3>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              <span>
                                {new Date(event.date).toLocaleDateString(
                                  locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-SA' : 'en-US',
                                  { year: 'numeric', month: 'short', day: 'numeric' }
                                )}
                                {event.time && ` • ${event.time}`}
                                {event.duration && ` • ${event.duration}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      {content.noUpcomingEvents}
                    </div>
                  )}
                </div>
              </div>
              
              {/* My Certificates */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">{content.myCertificates}</h2>
                </div>
                
                {userData.certificates > 0 ? (
                  <div className="p-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="rounded-full bg-yellow-100 p-3 mr-3">
                          <FaCertificate className="text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{locale === 'fr' ? 'Introduction au Marketing Digital' : locale === 'ar' ? 'مقدمة في التسويق الرقمي' : 'Introduction to Digital Marketing'}</h3>
                          <p className="text-sm text-gray-500">
                            {locale === 'fr' ? 'Délivré le' : locale === 'ar' ? 'صدر في' : 'Issued on'} {" "}
                            {new Date('2023-09-28').toLocaleDateString(
                              locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-SA' : 'en-US',
                              { year: 'numeric', month: 'short', day: 'numeric' }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    {content.noCertificates}
                  </div>
                )}
              </div>
              
              {/* My Account */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">{content.myAccount}</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  <Link href={`/${locale}/profile`} className="flex items-center p-4 hover:bg-gray-50">
                    <FaUser className="text-gray-600 mr-3" />
                    <span>{content.profileSettings}</span>
                  </Link>
                  
                  <Link href={`/${locale}/notifications`} className="flex items-center p-4 hover:bg-gray-50">
                    <FaBell className="text-gray-600 mr-3" />
                    <span>{content.notifications}</span>
                  </Link>
                  
                  <Link href={`/${locale}/favorites`} className="flex items-center p-4 hover:bg-gray-50">
                    <FaHeart className="text-gray-600 mr-3" />
                    <span>{content.favorites}</span>
                  </Link>
                  
                  <Link href={`/${locale}/logout`} className="flex items-center p-4 hover:bg-gray-50 text-red-600">
                    <FaCog className="mr-3" />
                    <span>{content.logout}</span>
                  </Link>
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