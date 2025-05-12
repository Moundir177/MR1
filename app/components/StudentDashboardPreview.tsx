"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaBookOpen, FaChartLine, FaClipboardCheck, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaChevronDown, FaSearch, FaClock, FaTrophy, FaVideo } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface StudentDashboardPreviewProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
  };
}

export default function StudentDashboardPreview({ locale, translations }: StudentDashboardPreviewProps) {
  const [activeTab, setActiveTab] = useState('courses');
  const isRTL = locale === 'ar';
  
  // Mock student data
  const studentName = locale === 'fr' ? 'Ahmed Benali' : locale === 'ar' ? 'أحمد بن علي' : 'Ahmed Benali';
  
  // Mock courses data
  const courses = [
    {
      id: 1,
      title: locale === 'fr' ? 'Développement Web Avancé' : locale === 'ar' ? 'تطوير الويب المتقدم' : 'Advanced Web Development',
      progress: 75,
      nextLesson: locale === 'fr' ? "APIs RESTful" : locale === 'ar' ? "واجهات برمجة التطبيقات RESTful" : "RESTful APIs",
      instructorName: locale === 'fr' ? 'Prof. Sarah Morel' : locale === 'ar' ? 'أ. سارة موريل' : 'Prof. Sarah Morel',
      nextLessonTime: '14:00',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: locale === 'fr' ? 'Design UX/UI' : locale === 'ar' ? 'تصميم تجربة وواجهة المستخدم' : 'UX/UI Design',
      progress: 45,
      nextLesson: locale === 'fr' ? "Wireframing Avancé" : locale === 'ar' ? "التخطيط السلكي المتقدم" : "Advanced Wireframing",
      instructorName: locale === 'fr' ? 'Dr. Mohammed Alaoui' : locale === 'ar' ? 'د. محمد العلوي' : 'Dr. Mohammed Alaoui',
      nextLessonTime: '16:30',
      image: 'https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
  
  // Mock upcoming events
  const upcomingEvents = [
    {
      title: locale === 'fr' ? 'Atelier JavaScript' : locale === 'ar' ? 'ورشة عمل جافا سكريبت' : 'JavaScript Workshop',
      date: locale === 'fr' ? '15 Novembre' : locale === 'ar' ? '15 نوفمبر' : 'November 15',
      time: '10:00 - 12:00'
    },
    {
      title: locale === 'fr' ? 'Séance de mentorat' : locale === 'ar' ? 'جلسة إرشادية' : 'Mentorship Session',
      date: locale === 'fr' ? '18 Novembre' : locale === 'ar' ? '18 نوفمبر' : 'November 18',
      time: '14:00 - 15:00'
    }
  ];
  
  // Mock assignments
  const assignments = [
    {
      title: locale === 'fr' ? 'Projet d\'application React' : locale === 'ar' ? 'مشروع تطبيق رياكت' : 'React App Project',
      course: locale === 'fr' ? 'Développement Web Avancé' : locale === 'ar' ? 'تطوير الويب المتقدم' : 'Advanced Web Development',
      dueDate: locale === 'fr' ? '20 Novembre' : locale === 'ar' ? '20 نوفمبر' : 'November 20',
      status: 'in-progress'
    },
    {
      title: locale === 'fr' ? 'Maquettes d\'application mobile' : locale === 'ar' ? 'نماذج تطبيق الجوال' : 'Mobile App Mockups',
      course: locale === 'fr' ? 'Design UX/UI' : locale === 'ar' ? 'تصميم تجربة وواجهة المستخدم' : 'UX/UI Design',
      dueDate: locale === 'fr' ? '25 Novembre' : locale === 'ar' ? '25 نوفمبر' : 'November 25',
      status: 'not-started'
    }
  ];
  
  const dashboardTabs = [
    {
      id: 'courses',
      label: locale === 'fr' ? 'Mes Cours' : locale === 'ar' ? 'دوراتي' : 'My Courses',
      icon: <FaBookOpen />
    },
    {
      id: 'progress',
      label: locale === 'fr' ? 'Progrès' : locale === 'ar' ? 'التقدم' : 'Progress',
      icon: <FaChartLine />
    },
    {
      id: 'assignments',
      label: locale === 'fr' ? 'Devoirs' : locale === 'ar' ? 'الواجبات' : 'Assignments',
      icon: <FaClipboardCheck />
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    if (locale === 'fr') {
      switch (status) {
        case 'completed':
          return 'Terminé';
        case 'in-progress':
          return 'En cours';
        case 'not-started':
          return 'Non commencé';
        default:
          return 'Non commencé';
      }
    } else if (locale === 'ar') {
      switch (status) {
        case 'completed':
          return 'مكتمل';
        case 'in-progress':
          return 'قيد التقدم';
        case 'not-started':
          return 'لم يبدأ';
        default:
          return 'لم يبدأ';
      }
    } else {
      switch (status) {
        case 'completed':
          return 'Completed';
        case 'in-progress':
          return 'In Progress';
        case 'not-started':
          return 'Not Started';
        default:
          return 'Not Started';
      }
    }
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
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-w-6xl mx-auto"
        >
          {/* Dashboard Header */}
          <div className="bg-primary text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaGraduationCap className="text-2xl mr-2" />
                <span className="text-xl font-bold">
                  {locale === 'fr' ? 'Tableau de Bord Étudiant' : locale === 'ar' ? 'لوحة تحكم الطالب' : 'Student Dashboard'}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <FaBell />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <FaCog />
                </button>
                <div className="flex items-center">
                  <FaUserCircle className="text-xl mr-2" />
                  <span className="font-medium">{studentName}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200">
              <div className="p-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder={locale === 'fr' ? 'Rechercher...' : locale === 'ar' ? 'بحث...' : 'Search...'}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <nav className="mt-2">
                <ul>
                  {dashboardTabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center w-full px-4 py-3 text-left ${
                          activeTab === tab.id 
                            ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                            : 'text-neutral-dark hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="p-4 mt-4">
                <div className="bg-primary/5 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {locale === 'fr' ? 'Événements à venir' : locale === 'ar' ? 'الأحداث القادمة' : 'Upcoming Events'}
                  </h4>
                  <ul className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <li key={index} className="text-sm">
                        <p className="font-medium text-neutral-dark">{event.title}</p>
                        <p className="text-neutral text-xs flex items-center mt-1">
                          <FaCalendarAlt className="mr-1 text-neutral/70" />
                          {event.date}
                        </p>
                        <p className="text-neutral text-xs flex items-center mt-1">
                          <FaClock className="mr-1 text-neutral/70" />
                          {event.time}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-2">
                  {locale === 'fr'
                    ? `Bienvenue, ${studentName}!`
                    : locale === 'ar'
                    ? `مرحبًا، ${studentName}!`
                    : `Welcome, ${studentName}!`}
                </h3>
                <p>
                  {locale === 'fr'
                    ? "Vous avez des cours programmés aujourd'hui. Continuez votre parcours d'apprentissage!"
                    : locale === 'ar'
                    ? "لديك دروس مجدولة اليوم. واصل رحلة التعلم الخاصة بك!"
                    : "You have scheduled classes today. Continue your learning journey!"}
                </p>
              </div>
              
              {/* Content based on active tab */}
              {activeTab === 'courses' && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">
                    {locale === 'fr' ? 'Mes Cours' : locale === 'ar' ? 'دوراتي' : 'My Courses'}
                  </h3>
                  <div className="space-y-6">
                    {courses.map((course) => (
                      <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <div className="rounded-lg overflow-hidden h-32">
                              <img 
                                src={course.image} 
                                alt={course.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="md:w-3/4 md:pl-6">
                            <h4 className="text-lg font-bold text-neutral-dark">{course.title}</h4>
                            <p className="text-neutral text-sm mb-2">{course.instructorName}</p>
                            
                            <div className="mb-3">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-neutral">
                                  {locale === 'fr' ? 'Progression' : locale === 'ar' ? 'التقدم' : 'Progress'}
                                </span>
                                <span className="text-sm font-medium text-primary">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary rounded-full h-2" 
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                              <div className="bg-primary/5 text-primary rounded-lg px-3 py-2 text-sm flex items-center">
                                <FaVideo className="mr-2" />
                                <span>
                                  {locale === 'fr'
                                    ? 'Prochain cours:'
                                    : locale === 'ar'
                                    ? 'الدرس القادم:'
                                    : 'Next lesson:'} {course.nextLesson}
                                </span>
                              </div>
                              <div className="bg-primary/5 text-primary rounded-lg px-3 py-2 text-sm flex items-center">
                                <FaClock className="mr-2" />
                                <span>
                                  {locale === 'fr'
                                    ? 'Aujourd\'hui à'
                                    : locale === 'ar'
                                    ? 'اليوم الساعة'
                                    : 'Today at'} {course.nextLessonTime}
                                </span>
                              </div>
                              <button className="bg-primary text-white rounded-lg px-3 py-2 text-sm hover:bg-primary-dark transition-colors">
                                {locale === 'fr' ? 'Continuer' : locale === 'ar' ? 'متابعة' : 'Continue'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'assignments' && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">
                    {locale === 'fr' ? 'Devoirs' : locale === 'ar' ? 'الواجبات' : 'Assignments'}
                  </h3>
                  <div className="space-y-4">
                    {assignments.map((assignment, index) => (
                      <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-bold text-neutral-dark">{assignment.title}</h4>
                            <p className="text-neutral text-sm">{assignment.course}</p>
                            <p className="text-neutral text-sm flex items-center mt-1">
                              <FaCalendarAlt className={`${isRTL ? 'ml-1' : 'mr-1'} text-neutral/70`} />
                              <span>
                                {locale === 'fr' ? 'Échéance:' : locale === 'ar' ? 'تاريخ التسليم:' : 'Due:'} {assignment.dueDate}
                              </span>
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(assignment.status)}`}>
                            {getStatusLabel(assignment.status)}
                          </span>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button className="bg-primary text-white rounded-lg px-3 py-2 text-sm hover:bg-primary-dark transition-colors">
                            {locale === 'fr' ? 'Voir le devoir' : locale === 'ar' ? 'عرض الواجب' : 'View Assignment'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'progress' && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-4">
                    {locale === 'fr' ? 'Progrès' : locale === 'ar' ? 'التقدم' : 'Progress'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                      <h4 className="font-bold text-neutral-dark flex items-center mb-3">
                        <FaChartLine className="mr-2 text-primary" />
                        {locale === 'fr' ? 'Progression Globale' : locale === 'ar' ? 'التقدم الإجمالي' : 'Overall Progress'}
                      </h4>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <div className="bg-primary rounded-full h-4" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-sm text-neutral text-right">60%</p>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                      <h4 className="font-bold text-neutral-dark flex items-center mb-3">
                        <FaTrophy className="mr-2 text-primary" />
                        {locale === 'fr' ? 'Réalisations' : locale === 'ar' ? 'الإنجازات' : 'Achievements'}
                      </h4>
                      <p className="text-2xl font-bold text-primary text-center">12</p>
                      <p className="text-sm text-neutral text-center">
                        {locale === 'fr' 
                          ? 'badges obtenus' 
                          : locale === 'ar' 
                          ? 'شارات تم الحصول عليها' 
                          : 'badges earned'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <h4 className="font-bold text-neutral-dark mb-3">
                      {locale === 'fr' ? 'Progression par Cours' : locale === 'ar' ? 'التقدم حسب الدورة' : 'Progress by Course'}
                    </h4>
                    {courses.map((course) => (
                      <div key={course.id} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-neutral-dark">{course.title}</span>
                          <span className="text-sm font-medium text-primary">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* CTA Button */}
        <div className="text-center mt-10">
          <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors">
            {locale === 'fr' 
              ? "Explorer le tableau de bord complet" 
              : locale === 'ar' 
              ? "استكشاف لوحة التحكم الكاملة" 
              : "Explore the full dashboard"}
          </button>
        </div>
      </div>
    </section>
  );
} 