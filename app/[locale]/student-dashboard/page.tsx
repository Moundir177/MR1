"use client";

import { Locale } from '../../i18n/settings';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import StudentDashboardPreview from '../../components/StudentDashboardPreview';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGraduationCap, FaUsers, FaBook, FaLaptop, FaChartLine, FaCertificate } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface StudentDashboardPageProps {
  params: {
    locale: Locale;
  };
}

export default function StudentDashboardPage({ params: { locale } }: StudentDashboardPageProps) {
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchTranslations() {
      try {
        const response = await fetch(`/api/translations?locale=${locale}`);
        const data = await response.json();
        setTranslations(data.translations);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching translations:", error);
        // Use fallback data
        setTranslations({
          nav: {},
          footer: {}
        });
        setIsLoading(false);
      }
    }
    
    fetchTranslations();
  }, [locale]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Handle RTL for Arabic
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Dashboard features
  const features = [
    {
      icon: <FaBook className="h-10 w-10 text-primary" />,
      title: locale === 'fr' ? 'Accès aux Cours' : locale === 'ar' ? 'الوصول إلى الدورات' : 'Course Access',
      description: locale === 'fr'
        ? 'Accédez à tous vos cours en ligne, matériaux d\'apprentissage et ressources depuis un seul endroit.'
        : locale === 'ar'
        ? 'الوصول إلى جميع دوراتك عبر الإنترنت ومواد التعلم والموارد من مكان واحد.'
        : 'Access all your online courses, learning materials, and resources from one place.'
    },
    {
      icon: <FaChartLine className="h-10 w-10 text-primary" />,
      title: locale === 'fr' ? 'Suivi des Progrès' : locale === 'ar' ? 'تتبع التقدم' : 'Progress Tracking',
      description: locale === 'fr'
        ? 'Suivez votre progression dans chaque cours avec des visualisations détaillées et des statistiques personnelles.'
        : locale === 'ar'
        ? 'تتبع تقدمك في كل دورة مع تصورات مفصلة وإحصاءات شخصية.'
        : 'Track your progress in each course with detailed visualizations and personal statistics.'
    },
    {
      icon: <FaLaptop className="h-10 w-10 text-primary" />,
      title: locale === 'fr' ? 'Classes Virtuelles' : locale === 'ar' ? 'الفصول الافتراضية' : 'Virtual Classrooms',
      description: locale === 'fr'
        ? 'Participez à des sessions en direct interactives avec vos instructeurs et camarades de classe.'
        : locale === 'ar'
        ? 'المشاركة في جلسات تفاعلية مباشرة مع المدربين وزملاء الدراسة.'
        : 'Participate in interactive live sessions with your instructors and classmates.'
    },
    {
      icon: <FaUsers className="h-10 w-10 text-primary" />,
      title: locale === 'fr' ? 'Communauté d\'Apprentissage' : locale === 'ar' ? 'مجتمع التعلم' : 'Learning Community',
      description: locale === 'fr'
        ? 'Connectez-vous avec d\'autres étudiants, partagez des idées et travaillez sur des projets collaboratifs.'
        : locale === 'ar'
        ? 'التواصل مع الطلاب الآخرين ومشاركة الأفكار والعمل على مشاريع تعاونية.'
        : 'Connect with other students, share ideas, and work on collaborative projects.'
    },
    {
      icon: <FaCertificate className="h-10 w-10 text-primary" />,
      title: locale === 'fr' ? 'Certificats et Badges' : locale === 'ar' ? 'الشهادات والشارات' : 'Certificates & Badges',
      description: locale === 'fr'
        ? 'Gagnez des badges pour vos réalisations et téléchargez vos certificats directement depuis le tableau de bord.'
        : locale === 'ar'
        ? 'اكسب شارات لإنجازاتك وقم بتنزيل شهاداتك مباشرة من لوحة المعلومات.'
        : 'Earn badges for your achievements and download your certificates directly from the dashboard.'
    },
    {
      icon: <FaGraduationCap className="h-10 w-10 text-primary" />,
      title: locale === 'fr' ? 'Plan d\'Apprentissage' : locale === 'ar' ? 'خطة التعلم' : 'Learning Path',
      description: locale === 'fr'
        ? 'Visualisez votre parcours éducatif et planifiez vos prochaines étapes vers vos objectifs professionnels.'
        : locale === 'ar'
        ? 'عرض مسار التعلم الخاص بك وتخطيط خطواتك التالية نحو أهدافك المهنية.'
        : 'Visualize your educational journey and plan your next steps toward your career goals.'
    }
  ];
  
  // Dashboard translation object
  const dashboardTranslations = {
    title: locale === 'fr' 
      ? 'Tableau de Bord Étudiant' 
      : locale === 'ar' 
      ? 'لوحة تحكم الطالب' 
      : 'Student Dashboard',
    subtitle: locale === 'fr'
      ? 'Gérez votre parcours d\'apprentissage avec notre plateforme intuitive qui vous aide à suivre vos progrès et à atteindre vos objectifs.'
      : locale === 'ar'
      ? 'أدر رحلة التعلم الخاصة بك من خلال منصتنا البديهية التي تساعدك على تتبع تقدمك وتحقيق أهدافك.'
      : 'Manage your learning journey with our intuitive platform that helps you track your progress and reach your goals.'
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations.nav} />
      
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
                {locale === 'fr' ? 'Portail Étudiant' : locale === 'ar' ? 'بوابة الطالب' : 'Student Portal'}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {locale === 'fr' 
                  ? "Votre passerelle vers une expérience d'apprentissage personnalisée et enrichissante."
                  : locale === 'ar'
                  ? "بوابتك إلى تجربة تعليمية مخصصة وغنية."
                  : "Your gateway to a personalized and enriching learning experience."}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview Section */}
        <StudentDashboardPreview locale={locale} translations={dashboardTranslations} />
        
        {/* Dashboard Features */}
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
                {locale === 'fr' 
                  ? 'Fonctionnalités du Tableau de Bord' 
                  : locale === 'ar' 
                  ? 'ميزات لوحة التحكم' 
                  : 'Dashboard Features'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {locale === 'fr'
                  ? "Découvrez les outils puissants qui vous aideront à tirer le meilleur parti de votre expérience d'apprentage."
                  : locale === 'ar'
                  ? "اكتشف الأدوات القوية التي ستساعدك على تحقيق أقصى استفادة من تجربة التعلم."
                  : "Discover the powerful tools that will help you make the most of your learning experience."}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-neutral text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Access Information */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-2 md:order-1"
              >
                <h2 className="text-3xl font-bold text-neutral-dark mb-6">
                  {locale === 'fr' 
                    ? 'Comment Accéder à Votre Tableau de Bord' 
                    : locale === 'ar' 
                    ? 'كيفية الوصول إلى لوحة التحكم الخاصة بك' 
                    : 'How to Access Your Dashboard'}
                </h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
                <p className="text-neutral mb-6">
                  {locale === 'fr'
                    ? "En tant qu'étudiant inscrit, vous recevrez un e-mail avec vos informations de connexion uniques. Utilisez-les pour vous connecter à votre tableau de bord personnalisé depuis n'importe quel appareil et n'importe où."
                    : locale === 'ar'
                    ? "كطالب مسجل، ستتلقى بريدًا إلكترونيًا يحتوي على معلومات تسجيل الدخول الفريدة الخاصة بك. استخدمها لتسجيل الدخول إلى لوحة التحكم المخصصة من أي جهاز وفي أي مكان."
                    : "As an enrolled student, you'll receive an email with your unique login credentials. Use these to log in to your personalized dashboard from any device, anywhere."}
                </p>
                <p className="text-neutral mb-8">
                  {locale === 'fr'
                    ? "Votre tableau de bord se synchronise automatiquement sur tous vos appareils, vous permettant de reprendre votre apprentissage exactement là où vous l'avez laissé."
                    : locale === 'ar'
                    ? "تتزامن لوحة التحكم الخاصة بك تلقائيًا عبر جميع أجهزتك، مما يتيح لك استئناف التعلم من حيث توقفت بالضبط."
                    : "Your dashboard automatically syncs across all your devices, allowing you to pick up your learning exactly where you left off."}
                </p>
                <div className="space-x-4">
                  <Link 
                    href="#" 
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    {locale === 'fr' ? 'Se Connecter' : locale === 'ar' ? 'تسجيل الدخول' : 'Log In'}
                  </Link>
                  <Link 
                    href="#" 
                    className="inline-block bg-transparent hover:bg-primary/5 text-primary border border-primary font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    {locale === 'fr' ? 'Aide & Support' : locale === 'ar' ? 'المساعدة والدعم' : 'Help & Support'}
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-1 md:order-2"
              >
                <img 
                  src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Student accessing dashboard" 
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Mobile Experience */}
        <section className="py-20 bg-primary/5">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
              >
                {locale === 'fr' 
                  ? 'Expérience Mobile' 
                  : locale === 'ar' 
                  ? 'تجربة الهاتف المحمول' 
                  : 'Mobile Experience'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {locale === 'fr'
                  ? "Accédez à toutes les fonctionnalités de votre tableau de bord depuis n'importe où grâce à notre application mobile entièrement responsive."
                  : locale === 'ar'
                  ? "الوصول إلى جميع ميزات لوحة التحكم الخاصة بك من أي مكان من خلال تطبيق الهاتف المحمول المتجاوب بالكامل."
                  : "Access all your dashboard features on the go with our fully responsive mobile application."}
              </motion.p>
            </div>
            
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 max-w-4xl text-center"
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="md:w-1/3">
                    <img 
                      src="https://lnkdstc.com/assets/images/smartphone.svg" 
                      alt="Mobile App" 
                      className="h-64 mx-auto"
                    />
                  </div>
                  <div className="md:w-2/3 text-left">
                    <h3 className="text-2xl font-bold text-neutral-dark mb-4">
                      {locale === 'fr' 
                        ? 'Apprenez n\'importe où, n\'importe quand' 
                        : locale === 'ar' 
                        ? 'تعلم في أي مكان، في أي وقت' 
                        : 'Learn Anywhere, Anytime'}
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                          {locale === 'fr' 
                            ? 'Accédez à vos cours et matériaux d\'apprentissage hors ligne'
                            : locale === 'ar'
                            ? 'الوصول إلى الدورات ومواد التعلم دون اتصال بالإنترنت'
                            : 'Access your courses and learning materials offline'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                          {locale === 'fr' 
                            ? 'Recevez des notifications pour les cours, devoirs et événements'
                            : locale === 'ar'
                            ? 'تلقي إشعارات للدورات والواجبات والأحداث'
                            : 'Receive notifications for classes, assignments, and events'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                          {locale === 'fr' 
                            ? 'Interagissez avec les instructeurs et camarades de classe via le chat'
                            : locale === 'ar'
                            ? 'التفاعل مع المدربين وزملاء الدراسة عبر الدردشة'
                            : 'Interact with instructors and classmates via chat'}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                          {locale === 'fr' 
                            ? 'Suivez votre progression avec des visualisations optimisées pour mobile'
                            : locale === 'ar'
                            ? 'تتبع تقدمك مع تصورات محسنة للجوال'
                            : 'Track your progress with mobile-optimized visualizations'}
                        </span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors">
                        {locale === 'fr' 
                          ? "Télécharger l'Application" 
                          : locale === 'ar' 
                          ? "تنزيل التطبيق" 
                          : "Download the App"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
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
                ? "Prêt à Commencer Votre Parcours d'Apprentissage?" 
                : locale === 'ar' 
                ? "هل أنت مستعد لبدء رحلة التعلم الخاصة بك؟" 
                : "Ready to Start Your Learning Journey?"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              {locale === 'fr'
                ? "Inscrivez-vous dès aujourd'hui et accédez à votre tableau de bord étudiant personnalisé."
                : locale === 'ar'
                ? "سجل اليوم واحصل على لوحة تحكم الطالب المخصصة الخاصة بك."
                : "Register today and get access to your personalized student dashboard."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href={`/${locale}/register`} className="inline-block bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
                {locale === 'fr' 
                  ? "S'inscrire Maintenant" 
                  : locale === 'ar' 
                  ? "سجل الآن" 
                  : "Register Now"}
              </Link>
              <Link href={`/${locale}/courses`} className="inline-block bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-lg transition-colors">
                {locale === 'fr' 
                  ? "Explorer les Cours" 
                  : locale === 'ar' 
                  ? "استكشف الدورات" 
                  : "Explore Courses"}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer locale={locale} translations={translations.footer} />
    </div>
  );
} 