"use client";

import { Locale } from '@/app/i18n/settings';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Testimonials from '@/app/components/Testimonials';
import Faq from '@/app/components/Faq';
import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaAward, FaGlobe, FaBriefcase, FaTrophy } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { aboutContent } from '@/app/data/about-content';

interface AboutPageProps {
  params: {
    locale: Locale;
  };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const [pageData, setPageData] = useState<{
    translations: any;
    content: any;
  } | null>(null);
  
  useEffect(() => {
    // Fetch data on the client side
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/translations?locale=${locale}`);
        const data = await response.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching page data:", error);
        // Use fallback data - make sure we're not directly using the object
        const localeKey = locale as keyof typeof aboutContent;
        setPageData({
          translations: {},
          content: aboutContent[localeKey] || aboutContent.en
        });
      }
    };
    
    fetchData();
  }, [locale]);
  
  if (!pageData) {
    return <div>Loading...</div>;
  }
  
  // Ensure content is properly extracted as an object and not rendered directly
  const { translations, content } = pageData;
  
  // Handle RTL for Arabic
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Stats data
  const stats = [
    {
      icon: <FaGraduationCap className="text-primary w-6 h-6" />,
      count: "5,000+",
      label: locale === 'fr' ? 'Étudiants Diplômés' : locale === 'ar' ? 'الطلاب الخريجين' : 'Graduated Students'
    },
    {
      icon: <FaUsers className="text-primary w-6 h-6" />,
      count: "50+",
      label: locale === 'fr' ? 'Instructeurs Experts' : locale === 'ar' ? 'مدربين خبراء' : 'Expert Instructors'
    },
    {
      icon: <FaGlobe className="text-primary w-6 h-6" />,
      count: "20+",
      label: locale === 'fr' ? 'Partenaires Internationaux' : locale === 'ar' ? 'شركاء دوليين' : 'International Partners'
    },
    {
      icon: <FaTrophy className="text-primary w-6 h-6" />,
      count: "15+",
      label: locale === 'fr' ? 'Prix d\'Excellence' : locale === 'ar' ? 'جوائز التميز' : 'Excellence Awards'
    }
  ];
  
  // Values data
  const values = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
      title: locale === 'fr' ? 'Excellence' : locale === 'ar' ? 'التميز' : 'Excellence',
      description: locale === 'fr' 
        ? 'Nous visons l\'excellence dans tout ce que nous faisons, en offrant une éducation de la plus haute qualité.' 
        : locale === 'ar' 
        ? 'نحن نسعى لتحقيق التميز في كل ما نقوم به، وتقديم أعلى مستويات التعليم.' 
        : 'We strive for excellence in everything we do, delivering education of the highest quality.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      title: locale === 'fr' ? 'Innovation' : locale === 'ar' ? 'الابتكار' : 'Innovation',
      description: locale === 'fr'
        ? 'Nous embrassons les nouvelles idées et technologies pour rester à la pointe de l\'éducation moderne.'
        : locale === 'ar'
        ? 'نحن نتبنى الأفكار والتقنيات الجديدة للبقاء في طليعة التعليم الحديث.'
        : 'We embrace new ideas and technologies to stay at the forefront of modern education.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>,
      title: locale === 'fr' ? 'Communauté' : locale === 'ar' ? 'المجتمع' : 'Community',
      description: locale === 'fr'
        ? 'Nous favorisons un environnement communautaire inclusif où chacun se sent soutenu et valorisé.'
        : locale === 'ar'
        ? 'نحن نعزز بيئة مجتمعية شاملة حيث يشعر الجميع بالدعم والتقدير.'
        : 'We foster an inclusive community environment where everyone feels supported and valued.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>,
      title: locale === 'fr' ? 'Adaptabilité' : locale === 'ar' ? 'القدرة على التكيف' : 'Adaptability',
      description: locale === 'fr'
        ? 'Nous préparons nos étudiants à s\'adapter aux changements rapides du monde technologique.'
        : locale === 'ar'
        ? 'نحن نعد طلابنا للتكيف مع التغيرات السريعة في عالم التكنولوجيا.'
        : 'We prepare our students to adapt to the rapidly changing technological world.'
    }
  ];
  
  // Timeline data
  const timeline = [
    {
      year: "2010",
      title: locale === 'fr' ? 'Fondation' : locale === 'ar' ? 'التأسيس' : 'Foundation',
      description: locale === 'fr'
        ? 'MIRA ACADEMY a été fondée avec une vision de fournir une éducation technologique de qualité.'
        : locale === 'ar'
        ? 'تأسست أكاديمية ميرا برؤية لتوفير تعليم تكنولوجي عالي الجودة.'
        : 'MIRA ACADEMY was founded with a vision to provide quality technological education.'
    },
    {
      year: "2012",
      title: locale === 'fr' ? 'Expansion des Programmes' : locale === 'ar' ? 'توسيع البرامج' : 'Program Expansion',
      description: locale === 'fr'
        ? 'Introduction de nouveaux programmes en développement web, design et marketing digital.'
        : locale === 'ar'
        ? 'إدخال برامج جديدة في تطوير الويب والتصميم والتسويق الرقمي.'
        : 'Introduction of new programs in web development, design, and digital marketing.'
    },
    {
      year: "2015",
      title: locale === 'fr' ? 'Reconnaissance Internationale' : locale === 'ar' ? 'الاعتراف الدولي' : 'International Recognition',
      description: locale === 'fr'
        ? 'Obtention d\'accréditations internationales et établissement de partenariats clés.'
        : locale === 'ar'
        ? 'الحصول على الاعتمادات الدولية وإقامة شراكات رئيسية.'
        : 'Gained international accreditations and established key partnerships.'
    },
    {
      year: "2018",
      title: locale === 'fr' ? 'Campus d\'Innovation' : locale === 'ar' ? 'حرم الابتكار' : 'Innovation Campus',
      description: locale === 'fr'
        ? 'Ouverture d\'un nouveau campus avec des installations technologiques de pointe.'
        : locale === 'ar'
        ? 'افتتاح حرم جامعي جديد مع مرافق تكنولوجية متطورة.'
        : 'Opening of a new campus with state-of-the-art technological facilities.'
    },
    {
      year: "2020",
      title: locale === 'fr' ? 'Expansion en Ligne' : locale === 'ar' ? 'التوسع عبر الإنترنت' : 'Online Expansion',
      description: locale === 'fr'
        ? 'Lancement de programmes d\'apprentissage en ligne pour atteindre des étudiants du monde entier.'
        : locale === 'ar'
        ? 'إطلاق برامج التعلم عبر الإنترنت للوصول إلى الطلاب من جميع أنحاء العالم.'
        : 'Launch of online learning programs to reach students worldwide.'
    },
    {
      year: "2023",
      title: locale === 'fr' ? 'Célébration du 13e Anniversaire' : locale === 'ar' ? 'الاحتفال بالذكرى السنوية الـ 13' : '13th Anniversary Celebration',
      description: locale === 'fr'
        ? 'Célébration de 13 ans d\'excellence éducative et d\'impact sur l\'industrie technologique.'
        : locale === 'ar'
        ? 'الاحتفال بـ 13 عامًا من التميز التعليمي والتأثير في صناعة التكنولوجيا.'
        : 'Celebrating 13 years of educational excellence and impact on the technology industry.'
    }
  ];
  
  // Team members data
  const leadershipTeam = [
    {
      name: locale === 'fr' ? 'Dr. Mohammed Khalid' : locale === 'ar' ? 'د. محمد خالد' : 'Dr. Mohammed Khalid',
      position: locale === 'fr' ? 'Fondateur et PDG' : locale === 'ar' ? 'المؤسس والرئيس التنفيذي' : 'Founder & CEO',
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      bio: locale === 'fr'
        ? 'Dr. Khalid a plus de 20 ans d\'expérience dans l\'éducation technologique et l\'entrepreneuriat.'
        : locale === 'ar'
        ? 'يتمتع الدكتور خالد بأكثر من 20 عامًا من الخبرة في التعليم التكنولوجي وريادة الأعمال.'
        : 'Dr. Khalid has over 20 years of experience in technology education and entrepreneurship.'
    },
    {
      name: locale === 'fr' ? 'Prof. Amina Benali' : locale === 'ar' ? 'أ. أمينة بن علي' : 'Prof. Amina Benali',
      position: locale === 'fr' ? 'Directrice Académique' : locale === 'ar' ? 'المديرة الأكاديمية' : 'Academic Director',
      image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800",
      bio: locale === 'fr'
        ? 'Spécialiste de l\'éducation avec une passion pour l\'innovation pédagogique et l\'apprentissage centré sur l\'étudiant.'
        : locale === 'ar'
        ? 'متخصصة في التعليم ولديها شغف بالابتكار التربوي والتعلم المتمحور حول الطالب.'
        : 'Education specialist with a passion for pedagogical innovation and student-centered learning.'
    },
    {
      name: locale === 'fr' ? 'Karim Mansouri' : locale === 'ar' ? 'كريم منصوري' : 'Karim Mansouri',
      position: locale === 'fr' ? 'Directeur de l\'Innovation' : locale === 'ar' ? 'مدير الابتكار' : 'Innovation Director',
      image: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=800",
      bio: locale === 'fr'
        ? 'Leader visionnaire qui supervise nos initiatives d\'innovation et nos partenariats technologiques.'
        : locale === 'ar'
        ? 'قائد صاحب رؤية يشرف على مبادرات الابتكار لدينا وشراكاتنا التكنولوجية.'
        : 'Visionary leader overseeing our innovation initiatives and technology partnerships.'
    }
  ];
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations.nav || {}} />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom">
            <div className="text-center mb-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {locale === 'fr' ? 'À Propos de Nous' : locale === 'ar' ? 'من نحن' : 'About Us'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {locale === 'fr' 
                  ? "Découvrez notre histoire, notre mission et les personnes qui font de MIRA ACADEMY une institution d'excellence."
                  : locale === 'ar'
                  ? "اكتشف قصتنا ومهمتنا والأشخاص الذين يجعلون من أكاديمية ميرا مؤسسة متميزة."
                  : "Discover our story, mission, and the people who make MIRA ACADEMY an institution of excellence."}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Our Mission Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="Our Mission" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-primary h-24 w-24 rounded-xl hidden md:flex items-center justify-center">
                    <FaChalkboardTeacher className="text-white h-12 w-12" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-neutral-dark mb-6">
                  {locale === 'fr' ? 'Notre Mission' : locale === 'ar' ? 'مهمتنا' : 'Our Mission'}
                </h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
                <p className="text-neutral mb-6">
                  {locale === 'fr'
                    ? "MIRA ACADEMY a pour mission de fournir une éducation technologique de classe mondiale qui prépare les étudiants à réussir dans un monde numérique en constante évolution. Nous nous engageons à offrir un environnement d'apprentissage innovant qui inspire la créativité, favorise la croissance personnelle et professionnelle, et développe les compétences essentielles pour l'avenir."
                    : locale === 'ar'
                    ? "تتمثل مهمة أكاديمية ميرا في توفير تعليم تكنولوجي عالمي المستوى يعد الطلاب للنجاح في عالم رقمي دائم التغير. نحن ملتزمون بتوفير بيئة تعليمية مبتكرة تلهم الإبداع، وتعزز النمو الشخصي والمهني، وتطور المهارات الأساسية للمستقبل."
                    : "MIRA ACADEMY's mission is to provide world-class technology education that prepares students to succeed in an ever-changing digital world. We are committed to offering an innovative learning environment that inspires creativity, fosters personal and professional growth, and develops essential skills for the future."}
                </p>
                <p className="text-neutral">
                  {locale === 'fr'
                    ? "Notre objectif est de transformer la vie de nos étudiants en leur donnant les connaissances, les compétences et la confiance nécessaires pour exceller dans leurs carrières choisies et contribuer positivement à la société dans un paysage technologique de plus en plus complexe."
                    : locale === 'ar'
                    ? "هدفنا هو تحويل حياة طلابنا من خلال تزويدهم بالمعرفة والمهارات والثقة اللازمة للتفوق في حياتهم المهنية المختارة والمساهمة بشكل إيجابي في المجتمع في مشهد تكنولوجي متزايد التعقيد."
                    : "Our goal is to transform our students' lives by providing them with the knowledge, skills, and confidence needed to excel in their chosen careers and contribute positively to society in an increasingly complex technological landscape."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-neutral-light/30">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl text-center shadow-md"
                >
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.count}</h3>
                  <p className="text-neutral">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
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
                {locale === 'fr' ? 'Nos Valeurs' : locale === 'ar' ? 'قيمنا' : 'Our Values'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {locale === 'fr'
                  ? "Les principes fondamentaux qui guident notre approche de l'éducation et façonnent notre culture."
                  : locale === 'ar'
                  ? "المبادئ الأساسية التي توجه نهجنا في التعليم وتشكل ثقافتنا."
                  : "The core principles that guide our approach to education and shape our culture."}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all flex"
                >
                  <div className={`flex-shrink-0 ${isRTL ? 'ml-5' : 'mr-5'}`}>
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-dark mb-2">{value.title}</h3>
                    <p className="text-neutral">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our History Section */}
        <section className="py-20 bg-neutral-light/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
              >
                {locale === 'fr' ? 'Notre Histoire' : locale === 'ar' ? 'تاريخنا' : 'Our History'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {locale === 'fr'
                  ? "Découvrez le voyage de MIRA ACADEMY depuis sa création jusqu'à aujourd'hui."
                  : locale === 'ar'
                  ? "اكتشف رحلة أكاديمية ميرا منذ تأسيسها وحتى اليوم."
                  : "Explore MIRA ACADEMY's journey from its founding to the present day."}
              </motion.p>
            </div>
            
            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
              
              {/* Timeline events */}
              <div className="space-y-12">
                {timeline.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} md:justify-between`}
                  >
                    {/* Year */}
                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'order-1 md:order-2 md:pl-8'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <span className="text-xl font-bold text-primary mb-2 block">{event.year}</span>
                        <h3 className="text-lg font-semibold text-neutral-dark mb-2">{event.title}</h3>
                        <p className="text-neutral">{event.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-md"></div>
                    
                    {/* Empty space for alternating layout */}
                    <div className={`md:w-5/12 hidden md:block ${index % 2 === 0 ? 'order-2' : 'order-1'}`}></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Leadership Team Section */}
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
                {locale === 'fr' ? 'Notre Équipe de Direction' : locale === 'ar' ? 'فريق القيادة لدينا' : 'Our Leadership Team'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {locale === 'fr'
                  ? "Rencontrez les personnes visionnaires qui dirigent MIRA ACADEMY et façonnent notre avenir."
                  : locale === 'ar'
                  ? "تعرف على الأشخاص أصحاب الرؤية الذين يقودون أكاديمية ميرا ويشكلون مستقبلنا."
                  : "Meet the visionary individuals who lead MIRA ACADEMY and shape our future."}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-neutral-dark mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.position}</p>
                    <p className="text-neutral">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href={`/${locale}/team`}
                className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {locale === 'fr' 
                  ? "Rencontrer l'équipe complète" 
                  : locale === 'ar' 
                  ? "التعرف على الفريق الكامل" 
                  : "Meet the full team"}
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {locale === 'fr' 
                ? "Rejoignez Notre Communauté" 
                : locale === 'ar' 
                ? "انضم إلى مجتمعنا" 
                : "Join Our Community"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              {locale === 'fr'
                ? "Commencez votre parcours académique chez MIRA ACADEMY et transformez votre avenir aujourd'hui."
                : locale === 'ar'
                ? "ابدأ رحلتك الأكاديمية في أكاديمية ميرا وغير مستقبلك اليوم."
                : "Start your academic journey at MIRA ACADEMY and transform your future today."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href={`/${locale}/courses`} className="inline-block bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
                {locale === 'fr' 
                  ? "Explorer Nos Programmes" 
                  : locale === 'ar' 
                  ? "استكشف برامجنا" 
                  : "Explore Our Programs"}
              </Link>
              <Link href={`/${locale}/contact`} className="inline-block bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-lg transition-colors">
                {locale === 'fr' 
                  ? "Nous Contacter" 
                  : locale === 'ar' 
                  ? "اتصل بنا" 
                  : "Contact Us"}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer locale={locale} translations={translations.footer || {}} />
    </div>
  );
} 