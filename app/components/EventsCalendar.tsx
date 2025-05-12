"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaChevronLeft, 
  FaChevronRight, 
  FaMapMarkerAlt, 
  FaClock, 
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface EventsCalendarProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    noEvents: string;
    viewAll: string;
    registerNow: string;
    categories: {
      all: string;
      course: string;
      workshop: string;
      seminar: string;
      campus: string;
    };
    months: string[];
    days: string[];
    today: string;
    location: string;
    time: string;
    filterEvents: string;
  };
}

// Example events data - in a real app, this would come from a CMS or API
const eventsData = [
  {
    id: 1,
    title: {
      en: "Web Development Bootcamp",
      fr: "Bootcamp de Développement Web",
      ar: "معسكر تطوير الويب"
    },
    date: new Date(2023, 11, 15), // December 15, 2023
    startTime: "09:00",
    endTime: "17:00",
    location: {
      en: "Main Campus, Room 101",
      fr: "Campus Principal, Salle 101",
      ar: "الحرم الرئيسي، غرفة 101"
    },
    category: "course",
    description: {
      en: "Intensive bootcamp covering HTML, CSS, JavaScript, and modern frameworks.",
      fr: "Bootcamp intensif couvrant HTML, CSS, JavaScript et les frameworks modernes.",
      ar: "معسكر مكثف يغطي HTML و CSS و JavaScript والأطر الحديثة."
    },
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 2,
    title: {
      en: "UI/UX Design Workshop",
      fr: "Atelier de Design UI/UX",
      ar: "ورشة عمل تصميم واجهة وتجربة المستخدم"
    },
    date: new Date(2023, 11, 18), // December 18, 2023
    startTime: "14:00",
    endTime: "17:30",
    location: {
      en: "Design Studio, 2nd Floor",
      fr: "Studio de Design, 2e Étage",
      ar: "ستوديو التصميم، الطابق الثاني"
    },
    category: "workshop",
    description: {
      en: "Hands-on workshop on creating effective and beautiful user interfaces.",
      fr: "Atelier pratique sur la création d'interfaces utilisateur efficaces et belles.",
      ar: "ورشة عمل عملية حول إنشاء واجهات مستخدم فعالة وجميلة."
    },
    image: "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 3,
    title: {
      en: "Digital Marketing Seminar",
      fr: "Séminaire sur le Marketing Digital",
      ar: "ندوة التسويق الرقمي"
    },
    date: new Date(2023, 11, 20), // December 20, 2023
    startTime: "10:00",
    endTime: "12:30",
    location: {
      en: "Conference Hall",
      fr: "Salle de Conférence",
      ar: "قاعة المؤتمرات"
    },
    category: "seminar",
    description: {
      en: "Learn the latest digital marketing strategies from industry experts.",
      fr: "Apprenez les dernières stratégies de marketing digital auprès d'experts du secteur.",
      ar: "تعلم أحدث استراتيجيات التسويق الرقمي من خبراء الصناعة."
    },
    image: "https://images.pexels.com/photos/6476783/pexels-photo-6476783.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 4,
    title: {
      en: "Student Networking Event",
      fr: "Événement de Réseautage Étudiant",
      ar: "فعالية تواصل الطلاب"
    },
    date: new Date(2023, 11, 22), // December 22, 2023
    startTime: "18:00",
    endTime: "21:00",
    location: {
      en: "Campus Garden",
      fr: "Jardin du Campus",
      ar: "حديقة الحرم الجامعي"
    },
    category: "campus",
    description: {
      en: "Connect with fellow students and alumni from all programs.",
      fr: "Connectez-vous avec d'autres étudiants et anciens élèves de tous les programmes.",
      ar: "تواصل مع زملائك الطلاب والخريجين من جميع البرامج."
    },
    image: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 5,
    title: {
      en: "Mobile App Development Course",
      fr: "Cours de Développement d'Applications Mobiles",
      ar: "دورة تطوير تطبيقات الجوال"
    },
    date: new Date(2024, 0, 5), // January 5, 2024
    startTime: "09:00",
    endTime: "16:00",
    location: {
      en: "Tech Lab, Room 205",
      fr: "Laboratoire Tech, Salle 205",
      ar: "معمل التكنولوجيا، غرفة 205"
    },
    category: "course",
    description: {
      en: "Comprehensive course on developing mobile applications for iOS and Android.",
      fr: "Cours complet sur le développement d'applications mobiles pour iOS et Android.",
      ar: "دورة شاملة في تطوير تطبيقات الجوال لنظامي iOS و Android."
    },
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 6,
    title: {
      en: "Data Science Workshop",
      fr: "Atelier de Science des Données",
      ar: "ورشة عمل علوم البيانات"
    },
    date: new Date(2024, 0, 10), // January 10, 2024
    startTime: "13:00",
    endTime: "17:00",
    location: {
      en: "Data Center, 3rd Floor",
      fr: "Centre de Données, 3e Étage",
      ar: "مركز البيانات، الطابق الثالث"
    },
    category: "workshop",
    description: {
      en: "Practical workshop on data analysis and visualization techniques.",
      fr: "Atelier pratique sur les techniques d'analyse et de visualisation des données.",
      ar: "ورشة عمل عملية حول تقنيات تحليل البيانات وتصورها."
    },
    image: "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 7,
    title: {
      en: "Open House Day",
      fr: "Journée Portes Ouvertes",
      ar: "يوم البيت المفتوح"
    },
    date: new Date(2024, 0, 15), // January 15, 2024
    startTime: "10:00",
    endTime: "16:00",
    location: {
      en: "Main Campus",
      fr: "Campus Principal",
      ar: "الحرم الرئيسي"
    },
    category: "campus",
    description: {
      en: "Explore our campus, meet instructors, and learn about our programs.",
      fr: "Explorez notre campus, rencontrez les instructeurs et découvrez nos programmes.",
      ar: "استكشف حرمنا الجامعي، قابل المدربين، وتعرف على برامجنا."
    },
    image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }
];

export default function EventsCalendar({ locale, translations }: EventsCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const isRTL = locale === 'ar';
  
  const getDaysInMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    const days = [];
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, monthIndex, day));
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentMonth);
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };
  
  const formatMonthYear = (date: Date) => {
    const monthName = translations.months[date.getMonth()];
    return `${monthName} ${date.getFullYear()}`;
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  const hasEvents = (date: Date) => {
    return eventsData.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear() &&
      (activeCategory === 'all' || event.category === activeCategory)
    );
  };
  
  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    
    return eventsData.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear() &&
      (activeCategory === 'all' || event.category === activeCategory)
    );
  };
  
  const formatTime = (time: string) => {
    // Simple time formatting, can be extended for more complex formatting
    return time;
  };
  
  const getUpcomingEvents = () => {
    const today = new Date();
    return eventsData
      .filter(event => 
        event.date >= today && 
        (activeCategory === 'all' || event.category === activeCategory)
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3); // Get only the next 3 events
  };
  
  const selectedDateEvents = getEventsForDate(selectedDate);
  const upcomingEvents = getUpcomingEvents();
  
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between bg-primary/5 p-4 border-b border-gray-100">
              <button 
                onClick={prevMonth}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                aria-label="Previous Month"
              >
                <FaChevronLeft className={`text-neutral-dark ${isRTL ? 'transform rotate-180' : ''}`} />
              </button>
              <h3 className="text-xl font-bold text-neutral-dark">
                {formatMonthYear(currentMonth)}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors relative"
                  aria-label="Filter Events"
                >
                  <FaFilter className="text-neutral-dark" />
                  {activeCategory !== 'all' && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full"></span>
                  )}
                </button>
                <button 
                  onClick={nextMonth}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                  aria-label="Next Month"
                >
                  <FaChevronRight className={`text-neutral-dark ${isRTL ? 'transform rotate-180' : ''}`} />
                </button>
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="p-4 bg-neutral-light/30 border-b border-gray-100 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'all' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-dark hover:bg-primary/10'
                  }`}
                >
                  {translations.categories.all}
                </button>
                <button
                  onClick={() => setActiveCategory('course')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'course' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-dark hover:bg-primary/10'
                  }`}
                >
                  {translations.categories.course}
                </button>
                <button
                  onClick={() => setActiveCategory('workshop')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'workshop' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-dark hover:bg-primary/10'
                  }`}
                >
                  {translations.categories.workshop}
                </button>
                <button
                  onClick={() => setActiveCategory('seminar')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'seminar' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-dark hover:bg-primary/10'
                  }`}
                >
                  {translations.categories.seminar}
                </button>
                <button
                  onClick={() => setActiveCategory('campus')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'campus' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-dark hover:bg-primary/10'
                  }`}
                >
                  {translations.categories.campus}
                </button>
              </div>
            )}
            
            {/* Calendar Grid */}
            <div className="p-4">
              {/* Days of week */}
              <div className="grid grid-cols-7 mb-2">
                {translations.days.map((day, index) => (
                  <div key={index} className="text-center text-neutral font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square relative rounded-lg ${
                      !day ? 'bg-transparent' : 
                      selectedDate && day && day.getDate() === selectedDate.getDate() ? 'bg-primary text-white' : 
                      isToday(day) ? 'bg-primary/10' : 'bg-neutral-light/30 hover:bg-neutral-light/50'
                    } ${day ? 'cursor-pointer' : ''} transition-colors flex items-center justify-center`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day && (
                      <>
                        <span className={`text-sm ${selectedDate && day && day.getDate() === selectedDate.getDate() ? 'text-white' : 'text-neutral-dark'}`}>
                          {day.getDate()}
                        </span>
                        {isToday(day) && (
                          <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[8px] font-medium text-primary">
                            {translations.today}
                          </span>
                        )}
                        {hasEvents(day) && (
                          <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                            selectedDate && day && day.getDate() === selectedDate.getDate() ? 'bg-white' : 'bg-primary'
                          }`}></span>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Selected Day Events */}
            {selectedDate && (
              <div className="p-4 border-t border-gray-100">
                <h4 className="text-lg font-bold text-neutral-dark mb-3">
                  {new Date(selectedDate).toLocaleDateString(
                    locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-SA' : 'en-US', 
                    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </h4>
                
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className="flex gap-4 p-3 bg-neutral-light/20 rounded-lg hover:bg-neutral-light/30 transition-colors">
                        <div className="w-2 self-stretch rounded-full" style={{ 
                          backgroundColor: 
                            event.category === 'course' ? '#4F46E5' : 
                            event.category === 'workshop' ? '#16A34A' : 
                            event.category === 'seminar' ? '#EA580C' :
                            '#2563EB'
                        }}></div>
                        <div className="flex-grow">
                          <h5 className="font-bold text-neutral-dark">{event.title[locale]}</h5>
                          <div className="flex items-center text-sm text-neutral gap-4 mt-1">
                            <div className="flex items-center">
                              <FaClock className="mr-1 text-primary/70" />
                              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="mr-1 text-primary/70" />
                              <span>{event.location[locale]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral italic">{translations.noEvents}</p>
                )}
              </div>
            )}
          </motion.div>
          
          {/* Upcoming Events Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="p-4 bg-primary text-white">
              <h3 className="text-lg font-bold flex items-center">
                <FaCalendarAlt className="mr-2" />
                {translations.viewAll}
              </h3>
            </div>
            
            <div className="p-4">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-6">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="group">
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img 
                          src={event.image} 
                          alt={event.title[locale]} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            event.category === 'course' ? 'bg-indigo-100 text-indigo-700' : 
                            event.category === 'workshop' ? 'bg-green-100 text-green-700' : 
                            event.category === 'seminar' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {translations.categories[event.category as keyof typeof translations.categories]}
                          </span>
                          <span className="text-sm text-neutral">
                            {event.date.toLocaleDateString(
                              locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-SA' : 'en-US', 
                              { month: 'short', day: 'numeric' }
                            )}
                          </span>
                        </div>
                        <h4 className="font-bold text-neutral-dark mb-1">{event.title[locale]}</h4>
                        <p className="text-sm text-neutral mb-3">{event.description[locale]}</p>
                        <div className="flex items-center text-sm text-neutral gap-4 mb-3">
                          <div className="flex items-center">
                            <FaClock className="mr-1 text-primary/70" />
                            <span>{formatTime(event.startTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-1 text-primary/70" />
                            <span>{event.location[locale]}</span>
                          </div>
                        </div>
                        <button className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm font-medium">
                          {translations.registerNow}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral italic">{translations.noEvents}</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 