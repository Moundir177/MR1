"use client";

import { Locale } from '../../i18n/settings';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CareersPageProps {
  params: {
    locale: Locale;
  };
}

export default function CareersPage({ params: { locale } }: CareersPageProps) {
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

  // Job openings data - in a real application, this would come from a database or API
  const jobOpenings = [
    {
      id: 1,
      title: {
        en: "Web Development Instructor",
        fr: "Instructeur en Développement Web",
        ar: "مدرب تطوير الويب"
      },
      department: {
        en: "Education",
        fr: "Éducation",
        ar: "التعليم"
      },
      location: {
        en: "Algiers, Algeria",
        fr: "Alger, Algérie",
        ar: "الجزائر العاصمة، الجزائر"
      },
      type: {
        en: "Full-time",
        fr: "Temps plein",
        ar: "دوام كامل"
      },
      description: {
        en: "We are seeking an experienced Web Development Instructor to join our growing team. The ideal candidate will have strong knowledge of modern web technologies and a passion for teaching.",
        fr: "Nous recherchons un instructeur expérimenté en développement web pour rejoindre notre équipe en croissance. Le candidat idéal aura une solide connaissance des technologies web modernes et une passion pour l'enseignement.",
        ar: "نحن نبحث عن مدرب متمرس في تطوير الويب للانضمام إلى فريقنا المتنامي. يجب أن يكون لدى المرشح المثالي معرفة قوية بتقنيات الويب الحديثة وشغف بالتدريس."
      }
    },
    {
      id: 2,
      title: {
        en: "Digital Marketing Specialist",
        fr: "Spécialiste en Marketing Digital",
        ar: "متخصص في التسويق الرقمي"
      },
      department: {
        en: "Marketing",
        fr: "Marketing",
        ar: "التسويق"
      },
      location: {
        en: "Algiers, Algeria",
        fr: "Alger, Algérie",
        ar: "الجزائر العاصمة، الجزائر"
      },
      type: {
        en: "Part-time",
        fr: "Temps partiel",
        ar: "دوام جزئي"
      },
      description: {
        en: "Join our marketing team as a Digital Marketing Specialist to help grow our online presence and student enrollment. Knowledge of SEO, social media marketing, and content creation is required.",
        fr: "Rejoignez notre équipe marketing en tant que spécialiste du marketing digital pour aider à développer notre présence en ligne et les inscriptions d'étudiants. Une connaissance du référencement, du marketing sur les réseaux sociaux et de la création de contenu est requise.",
        ar: "انضم إلى فريق التسويق لدينا كمتخصص في التسويق الرقمي للمساعدة في تنمية وجودنا عبر الإنترنت وتسجيل الطلاب. مطلوب معرفة بتحسين محركات البحث والتسويق عبر وسائل التواصل الاجتماعي وإنشاء المحتوى."
      }
    },
    {
      id: 3,
      title: {
        en: "Student Affairs Coordinator",
        fr: "Coordinateur des Affaires Étudiantes",
        ar: "منسق شؤون الطلاب"
      },
      department: {
        en: "Administration",
        fr: "Administration",
        ar: "الإدارة"
      },
      location: {
        en: "Algiers, Algeria",
        fr: "Alger, Algérie",
        ar: "الجزائر العاصمة، الجزائر"
      },
      type: {
        en: "Full-time",
        fr: "Temps plein",
        ar: "دوام كامل"
      },
      description: {
        en: "We are looking for a dedicated Student Affairs Coordinator to support our students throughout their educational journey at MIRA ACADEMY. Strong organizational and communication skills are essential.",
        fr: "Nous recherchons un coordinateur des affaires étudiantes dévoué pour soutenir nos étudiants tout au long de leur parcours éducatif à MIRA ACADEMY. De solides compétences organisationnelles et de communication sont essentielles.",
        ar: "نحن نبحث عن منسق مخصص لشؤون الطلاب لدعم طلابنا طوال رحلتهم التعليمية في أكاديمية ميرا. مهارات تنظيمية وتواصلية قوية ضرورية."
      }
    }
  ];

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
                {translations.careers?.title || (locale === 'fr' ? 'Rejoignez Notre Équipe' : locale === 'ar' ? 'انضم إلى فريقنا' : 'Join Our Team')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {translations.careers?.subtitle || (locale === 'fr' ? 'Découvrez les opportunités de carrière chez MIRA ACADEMY' : locale === 'ar' ? 'اكتشف فرص العمل في أكاديمية ميرا' : 'Discover career opportunities at MIRA ACADEMY')}
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Why Join Us Section */}
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
                {translations.careers?.whyJoinUs?.title || (locale === 'fr' ? 'Pourquoi Nous Rejoindre' : locale === 'ar' ? 'لماذا تنضم إلينا' : 'Why Join Us')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {translations.careers?.whyJoinUs?.description || (locale === 'fr' ? 'MIRA ACADEMY offre un environnement de travail stimulant et dynamique où vous pourrez développer vos compétences et faire progresser votre carrière.' : locale === 'ar' ? 'توفر أكاديمية ميرا بيئة عمل محفزة وديناميكية حيث يمكنك تطوير مهاراتك وتطوير حياتك المهنية.' : 'MIRA ACADEMY offers a stimulating and dynamic work environment where you can develop your skills and advance your career.')}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-dark">
                  {translations.careers?.whyJoinUs?.benefits?.professional?.title || (locale === 'fr' ? 'Développement Professionnel' : locale === 'ar' ? 'التطوير المهني' : 'Professional Development')}
                </h3>
                <p className="text-neutral">
                  {translations.careers?.whyJoinUs?.benefits?.professional?.description || (locale === 'fr' ? 'Nous investissons dans votre croissance professionnelle avec des opportunités de formation continue et de perfectionnement des compétences.' : locale === 'ar' ? 'نحن نستثمر في نموك المهني مع فرص التدريب المستمر وتطوير المهارات.' : 'We invest in your professional growth with ongoing training opportunities and skill development.')}
                </p>
              </motion.div>
              
              {/* Benefit 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-dark">
                  {translations.careers?.whyJoinUs?.benefits?.collaborative?.title || (locale === 'fr' ? 'Environnement Collaboratif' : locale === 'ar' ? 'بيئة تعاونية' : 'Collaborative Environment')}
                </h3>
                <p className="text-neutral">
                  {translations.careers?.whyJoinUs?.benefits?.collaborative?.description || (locale === 'fr' ? 'Rejoignez une équipe dynamique et collaborative qui valorise l\'innovation et les idées nouvelles.' : locale === 'ar' ? 'انضم إلى فريق ديناميكي وتعاوني يقدر الابتكار والأفكار الجديدة.' : 'Join a dynamic and collaborative team that values innovation and fresh ideas.')}
                </p>
              </motion.div>
              
              {/* Benefit 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-dark">
                  {translations.careers?.whyJoinUs?.benefits?.competitive?.title || (locale === 'fr' ? 'Rémunération Compétitive' : locale === 'ar' ? 'أجور تنافسية' : 'Competitive Compensation')}
                </h3>
                <p className="text-neutral">
                  {translations.careers?.whyJoinUs?.benefits?.competitive?.description || (locale === 'fr' ? 'Nous offrons des salaires compétitifs et des avantages sociaux pour valoriser votre expertise et vos contributions.' : locale === 'ar' ? 'نحن نقدم رواتب تنافسية ومزايا اجتماعية لتقدير خبرتك ومساهماتك.' : 'We offer competitive salaries and benefits to value your expertise and contributions.')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Current Openings Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4"
              >
                {translations.careers?.openings?.title || (locale === 'fr' ? 'Postes Ouverts' : locale === 'ar' ? 'الوظائف المتاحة' : 'Current Openings')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {translations.careers?.openings?.description || (locale === 'fr' ? 'Explorez nos opportunités d\'emploi actuelles et rejoignez notre équipe de professionnels dévoués.' : locale === 'ar' ? 'استكشف فرص العمل الحالية لدينا وانضم إلى فريقنا من المحترفين المتفانين.' : 'Explore our current job opportunities and join our team of dedicated professionals.')}
              </motion.p>
            </div>
            
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-neutral-dark">{job.title[locale as keyof typeof job.title]}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {job.department[locale as keyof typeof job.department]}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                        {job.location[locale as keyof typeof job.location]}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                        {job.type[locale as keyof typeof job.type]}
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral mb-4">{job.description[locale as keyof typeof job.description]}</p>
                  <Link href={`/${locale}/careers/${job.id}`} className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    {translations.careers?.openings?.applyButton || (locale === 'fr' ? 'Postuler Maintenant' : locale === 'ar' ? 'تقدم الآن' : 'Apply Now')}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Process */}
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
                {translations.careers?.process?.title || (locale === 'fr' ? 'Processus de Candidature' : locale === 'ar' ? 'عملية التقديم' : 'Application Process')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral max-w-3xl mx-auto"
              >
                {translations.careers?.process?.description || (locale === 'fr' ? 'Notre processus de recrutement est conçu pour être transparent et efficace. Voici à quoi vous pouvez vous attendre:' : locale === 'ar' ? 'تم تصميم عملية التوظيف لدينا لتكون شفافة وفعالة. إليك ما يمكنك توقعه:' : 'Our recruitment process is designed to be transparent and efficient. Here\'s what you can expect:')}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">
                  {translations.careers?.process?.steps?.application?.title || (locale === 'fr' ? 'Candidature' : locale === 'ar' ? 'تقديم الطلب' : 'Application')}
                </h3>
                <p className="text-neutral">
                  {translations.careers?.process?.steps?.application?.description || (locale === 'fr' ? 'Soumettez votre CV et votre lettre de motivation en ligne.' : locale === 'ar' ? 'قدم سيرتك الذاتية وخطاب تحفيزي عبر الإنترنت.' : 'Submit your CV and cover letter online.')}
                </p>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">
                  {translations.careers?.process?.steps?.screening?.title || (locale === 'fr' ? 'Présélection' : locale === 'ar' ? 'الفرز الأولي' : 'Screening')}
                </h3>
                <p className="text-neutral">
                  {translations.careers?.process?.steps?.screening?.description || (locale === 'fr' ? 'Notre équipe RH examinera votre candidature et vous contactera pour un entretien téléphonique initial.' : locale === 'ar' ? 'سيقوم فريق الموارد البشرية لدينا بمراجعة طلبك والاتصال بك لإجراء مقابلة هاتفية أولية.' : 'Our HR team will review your application and contact you for an initial phone interview.')}
                </p>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">
                  {translations.careers?.process?.steps?.interview?.title || (locale === 'fr' ? 'Entretien' : locale === 'ar' ? 'المقابلة' : 'Interview')}
                </h3>
                <p className="text-neutral">
                  {translations.careers?.process?.steps?.interview?.description || (locale === 'fr' ? 'Les candidats présélectionnés seront invités à un entretien en personne ou virtuel avec l\'équipe concernée.' : locale === 'ar' ? 'ستتم دعوة المرشحين المدرجين في القائمة المختصرة لإجراء مقابلة شخصية أو افتراضية مع الفريق المعني.' : 'Shortlisted candidates will be invited for an in-person or virtual interview with the relevant team.')}
                </p>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">
                  {translations.careers?.process?.steps?.offer?.title || (locale === 'fr' ? 'Offre' : locale === 'ar' ? 'العرض' : 'Offer')}
                </h3>
                <p className="text-neutral">
                  {translations.careers?.process?.steps?.offer?.description || (locale === 'fr' ? 'Les candidats retenus recevront une offre d\'emploi détaillant les conditions et les avantages.' : locale === 'ar' ? 'سيتلقى المرشحون الناجحون عرض عمل يوضح الشروط والمزايا.' : 'Successful candidates will receive a job offer detailing the terms and benefits.')}
                </p>
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
              {translations.careers?.cta?.title || (locale === 'fr' ? 'Prêt à Postuler?' : locale === 'ar' ? 'مستعد للتقديم؟' : 'Ready to Apply?')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              {translations.careers?.cta?.description || (locale === 'fr' ? 'Rejoignez notre équipe dynamique et contribuez à former la prochaine génération de professionnels.' : locale === 'ar' ? 'انضم إلى فريقنا الديناميكي وساهم في تدريب الجيل القادم من المحترفين.' : 'Join our dynamic team and help shape the next generation of professionals.')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href={`/${locale}/contact`} className="inline-block bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
                {translations.careers?.cta?.button || (locale === 'fr' ? 'Nous Contacter' : locale === 'ar' ? 'اتصل بنا' : 'Contact Us')}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer locale={locale} translations={translations.footer} />
    </div>
  );
} 