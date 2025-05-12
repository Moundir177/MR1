"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegClock, FaRegCalendarAlt, FaChalkboardTeacher, FaRegFileAlt, FaCheck, FaUsers, FaGraduationCap, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface CourseDetailsProps {
  locale: Locale;
  translations: {
    enrollNow: string;
    learnMore: string;
    duration: string;
    level: string;
    language: string;
    price: string;
    overview: string;
    whatLearn: string;
    content: string;
    instructor: string;
    reviews: string;
  };
  course: {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: string;
    level: string;
    language: string;
    price: string;
    discount?: string;
    students: number;
    lessons: number;
    outcome: string[];
    curriculum: {
      section: string;
      lessons: {
        title: string;
        duration: string;
        preview?: boolean;
      }[];
    }[];
    instructor: {
      name: string;
      role: string;
      bio: string;
      image: string;
    };
  };
}

export default function CourseDetails({ locale, translations, course }: CourseDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [openSections, setOpenSections] = useState<string[]>([course.curriculum[0]?.section || '']);
  
  const toggleSection = (section: string) => {
    if (openSections.includes(section)) {
      setOpenSections(openSections.filter(s => s !== section));
    } else {
      setOpenSections([...openSections, section]);
    }
  };
  
  const formatStudentsCount = (count: number) => {
    if (locale === 'fr') {
      return `${count.toLocaleString('fr-FR')} étudiants`;
    } else if (locale === 'ar') {
      return `${count.toLocaleString('ar-SA')} طالب`;
    } else {
      return `${count.toLocaleString('en-US')} students`;
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
            >
              {course.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-neutral mb-6"
            >
              {course.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center text-neutral mb-6"
            >
              <div className="flex items-center mr-6 mb-2">
                <FaRegClock className="mr-2 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaUsers className="mr-2 text-primary" />
                <span>{formatStudentsCount(course.students)}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaRegFileAlt className="mr-2 text-primary" />
                <span>
                  {locale === 'fr' 
                    ? `${course.lessons} leçons` 
                    : locale === 'ar' 
                    ? `${course.lessons} درس` 
                    : `${course.lessons} lessons`}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <FaGraduationCap className="mr-2 text-primary" />
                <span>{course.level}</span>
              </div>
            </motion.div>
          </div>
          
          {/* Course Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
              {course.discount && (
                <div className="absolute top-4 right-4">
                  <span className="bg-accent text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {course.discount}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-sm text-neutral-light">
                    {translations.price}
                  </span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    {course.discount && (
                      <span className="text-neutral-light line-through ml-2">
                        {parseInt(course.price.replace(/[^0-9]/g, '')) * 1.25} DA
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral">{translations.duration}</span>
                  <span className="font-medium text-neutral-dark">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral">{translations.level}</span>
                  <span className="font-medium text-neutral-dark">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral">{translations.language}</span>
                  <span className="font-medium text-neutral-dark">{course.language}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors">
                  {translations.enrollNow}
                </button>
                <button className="w-full py-3 px-4 border border-primary text-primary hover:bg-primary/5 font-medium rounded-lg transition-colors">
                  {translations.learnMore}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-8 border-b border-gray-200">
              <div className="flex flex-wrap -mb-px">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`inline-flex items-center py-4 px-6 border-b-2 text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral hover:text-primary hover:border-gray-300'
                  }`}
                >
                  {translations.overview}
                </button>
                
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`inline-flex items-center py-4 px-6 border-b-2 text-sm font-medium ${
                    activeTab === 'curriculum'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral hover:text-primary hover:border-gray-300'
                  }`}
                >
                  {translations.content}
                </button>
                
                <button
                  onClick={() => setActiveTab('instructor')}
                  className={`inline-flex items-center py-4 px-6 border-b-2 text-sm font-medium ${
                    activeTab === 'instructor'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral hover:text-primary hover:border-gray-300'
                  }`}
                >
                  {translations.instructor}
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="bg-white rounded-lg">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-dark mb-6">
                    {translations.overview}
                  </h2>
                  
                  <div className="mb-8">
                    <p className="text-neutral mb-4">
                      {course.description}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-neutral-dark mb-4">
                      {translations.whatLearn}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.outcome.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <FaCheck className="text-green-500" />
                          </div>
                          <p className="ml-3 text-neutral">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Curriculum Tab */}
              {activeTab === 'curriculum' && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-dark mb-6">
                    {translations.content}
                  </h2>
                  
                  <div className="space-y-4">
                    {course.curriculum.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection(section.section)}
                          className="flex justify-between items-center w-full p-4 bg-neutral-light text-left font-medium text-neutral-dark hover:bg-neutral-light/80 transition-colors"
                        >
                          <span>{section.section}</span>
                          {openSections.includes(section.section) ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </button>
                        
                        {openSections.includes(section.section) && (
                          <div className="p-4 space-y-2">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex items-center">
                                  {lesson.preview ? (
                                    <FaRegFileAlt className="text-primary mr-3" />
                                  ) : (
                                    <FaRegFileAlt className="text-neutral-light mr-3" />
                                  )}
                                  <span className={lesson.preview ? 'text-primary' : 'text-neutral'}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  {lesson.preview && (
                                    <span className="text-xs bg-primary/10 text-primary py-1 px-2 rounded-full mr-3">
                                      {locale === 'fr' ? 'Aperçu' : locale === 'ar' ? 'معاينة' : 'Preview'}
                                    </span>
                                  )}
                                  <span className="text-neutral-light text-sm">{lesson.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Instructor Tab */}
              {activeTab === 'instructor' && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-dark mb-6">
                    {translations.instructor}
                  </h2>
                  
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src={course.instructor.image} 
                        alt={course.instructor.name} 
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-neutral-dark mb-1">
                        {course.instructor.name}
                      </h3>
                      <p className="text-primary mb-4">{course.instructor.role}</p>
                      <p className="text-neutral">{course.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Courses - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-dark mb-6">
                  {locale === 'fr' ? 'Autres Cours' : locale === 'ar' ? 'دورات أخرى' : 'Related Courses'}
                </h3>
                
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-20 h-16 flex-shrink-0 rounded-md overflow-hidden mr-4">
                        <img 
                          src={`https://images.pexels.com/photos/${1000000 + index * 100000}/pexels-photo-${1000000 + index * 100000}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} 
                          alt="Related Course" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-dark hover:text-primary transition-colors">
                          <a href="#">
                            {locale === 'fr' 
                              ? `Cours ${index + 1}` 
                              : locale === 'ar' 
                              ? `الدورة ${index + 1}` 
                              : `Course ${index + 1}`}
                          </a>
                        </h4>
                        <p className="text-sm text-primary font-medium mt-1">
                          {`${20000 + index * 5000} DA`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 