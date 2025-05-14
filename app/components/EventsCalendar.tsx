"use client";

import { useState, useEffect } from 'react';
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
    <section className="py-16 bg-background">
      <div className="container-custom">
        {/* Calendar Header with Month Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevMonth}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-neutral-dark hover:bg-neutral-light/20 transition-colors"
              aria-label="Previous month"
            >
              <FaChevronLeft className={isRTL ? "rotate-180" : ""} />
            </button>
            <h2 className="text-xl font-bold text-neutral-dark">
              {formatMonthYear(currentMonth)}
            </h2>
            <button
              onClick={nextMonth}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-neutral-dark hover:bg-neutral-light/20 transition-colors"
              aria-label="Next month"
            >
              <FaChevronRight className={isRTL ? "rotate-180" : ""} />
            </button>
          </div>
          
          {/* Mobile Filter Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm text-sm font-medium text-neutral-dark"
            >
              <FaFilter className="mr-2" />
              {translations.filterEvents}
            </button>
          </div>
          
          {/* Desktop Filter Categories */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-dark hover:bg-neutral-light/20"
              }`}
            >
              {translations.categories.all}
            </button>
            <button
              onClick={() => setActiveCategory("course")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "course"
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-dark hover:bg-neutral-light/20"
              }`}
            >
              {translations.categories.course}
            </button>
            <button
              onClick={() => setActiveCategory("workshop")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "workshop"
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-dark hover:bg-neutral-light/20"
              }`}
            >
              {translations.categories.workshop}
            </button>
            <button
              onClick={() => setActiveCategory("seminar")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "seminar"
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-dark hover:bg-neutral-light/20"
              }`}
            >
              {translations.categories.seminar}
            </button>
            <button
              onClick={() => setActiveCategory("campus")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "campus"
                  ? "bg-primary text-white"
                  : "bg-white text-neutral-dark hover:bg-neutral-light/20"
              }`}
            >
              {translations.categories.campus}
            </button>
          </div>
        </div>
        
        {/* Mobile Filters (Conditional Render) */}
        {showFilters && (
          <div className="md:hidden bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-neutral-dark">
                {translations.filterEvents}
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-neutral-dark"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-primary text-white"
                    : "bg-neutral-light/20 text-neutral-dark"
                }`}
              >
                {translations.categories.all}
              </button>
              <button
                onClick={() => setActiveCategory("course")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === "course"
                    ? "bg-primary text-white"
                    : "bg-neutral-light/20 text-neutral-dark"
                }`}
              >
                {translations.categories.course}
              </button>
              <button
                onClick={() => setActiveCategory("workshop")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === "workshop"
                    ? "bg-primary text-white"
                    : "bg-neutral-light/20 text-neutral-dark"
                }`}
              >
                {translations.categories.workshop}
              </button>
              <button
                onClick={() => setActiveCategory("seminar")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === "seminar"
                    ? "bg-primary text-white"
                    : "bg-neutral-light/20 text-neutral-dark"
                }`}
              >
                {translations.categories.seminar}
              </button>
              <button
                onClick={() => setActiveCategory("campus")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === "campus"
                    ? "bg-primary text-white"
                    : "bg-neutral-light/20 text-neutral-dark"
                }`}
              >
                {translations.categories.campus}
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-neutral-light/10 border-b">
              {translations.days.map((day, index) => (
                <div key={index} className="p-2 text-center text-sm font-medium text-neutral">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 p-4">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square"></div>;
                }
                
                const isToday = day.toDateString() === new Date().toDateString();
                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                const hasEventsToday = hasEvents(day);
                
                return (
                  <div 
                    key={day.getTime()} 
                    className="relative"
                  >
                    <button
                      onClick={() => setSelectedDate(day)}
                      className={`w-full aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors ${
                        isSelected
                          ? 'bg-primary text-white'
                          : isToday
                          ? 'bg-neutral-light/30 text-neutral-dark'
                          : 'hover:bg-neutral-light/20 text-neutral-dark'
                      }`}
                    >
                      <span className={isToday && !isSelected ? 'font-bold' : ''}>
                        {day.getDate()}
                      </span>
                      {hasEventsToday && !isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1"></span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Events List */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-neutral-dark mb-4">
              {selectedDate 
                ? `${selectedDate.getDate()} ${translations.months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                : translations.viewAll
              }
            </h3>
            
            <div className="space-y-4">
              {getEventsForDate(selectedDate).map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title[locale as keyof typeof event.title]} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className={`px-2 py-0.5 text-xs text-white rounded-full ${
                      event.category === 'course' 
                        ? 'bg-primary'
                        : event.category === 'workshop'
                        ? 'bg-secondary'
                        : event.category === 'seminar'
                        ? 'bg-accent'
                        : 'bg-neutral'
                    }`}>
                      {translations.categories[event.category as keyof typeof translations.categories]}
                    </span>
                    
                    <h4 className="font-bold text-neutral-dark mt-2 mb-2">
                      {event.title[locale as keyof typeof event.title]}
                    </h4>
                    
                    <div className="text-sm text-neutral mb-3">
                      <div className="flex items-center mb-1">
                        <FaCalendarAlt className="mr-2 text-neutral-light" />
                        <span>
                          {new Date(event.date).getDate()} {translations.months[new Date(event.date).getMonth()]} {new Date(event.date).getFullYear()}
                        </span>
                      </div>
                      <div className="flex items-center mb-1">
                        <FaClock className="mr-2 text-neutral-light" />
                        <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-neutral-light" />
                        <span>{event.location[locale as keyof typeof event.location]}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-neutral mb-4">
                      {event.description[locale as keyof typeof event.description]}
                    </p>
                    
                    <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                      {translations.registerNow}
                    </button>
                  </div>
                </div>
              ))}
              
              {getEventsForDate(selectedDate).length === 0 && (
                <div className="bg-white rounded-xl p-6 text-center border border-dashed border-neutral-light/50">
                  <FaCalendarAlt className="mx-auto text-2xl text-neutral-light mb-2" />
                  <p className="text-neutral">
                    {translations.noEvents}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 