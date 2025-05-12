import { Locale } from '../../../i18n/settings';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface JobPageProps {
  params: {
    locale: Locale;
    id: string;
  };
}

async function getTranslations(locale: Locale) {
  try {
    // Validate that locale is one of the supported locales
    if (!['en', 'fr', 'ar'].includes(locale)) {
      // Return default English translations for invalid locales
      const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
      const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
      return JSON.parse(defaultFileContents);
    }
    
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // Fallback to English if there's an error
    console.error(`Error loading translations for ${locale}:`, error);
    const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
    const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
    return JSON.parse(defaultFileContents);
  }
}

export default async function JobPage({ params: { locale, id } }: JobPageProps) {
  const translations = await getTranslations(locale);
  
  // Job openings data - this would typically come from a database
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
      },
      responsibilities: {
        en: [
          "Develop and deliver high-quality web development curriculum",
          "Teach HTML, CSS, JavaScript, and modern frameworks to students",
          "Provide mentorship and guidance to students throughout their learning journey",
          "Evaluate student progress and provide constructive feedback",
          "Stay updated with the latest trends and technologies in web development"
        ],
        fr: [
          "Développer et dispenser un programme de développement web de haute qualité",
          "Enseigner HTML, CSS, JavaScript et les frameworks modernes aux étudiants",
          "Fournir du mentorat et des conseils aux étudiants tout au long de leur parcours d'apprentissage",
          "Évaluer les progrès des étudiants et fournir des commentaires constructifs",
          "Rester à jour avec les dernières tendances et technologies en développement web"
        ],
        ar: [
          "تطوير وتقديم منهج عالي الجودة لتطوير الويب",
          "تدريس HTML و CSS و JavaScript والأطر الحديثة للطلاب",
          "تقديم التوجيه والإرشاد للطلاب طوال رحلة التعلم",
          "تقييم تقدم الطلاب وتقديم ملاحظات بناءة",
          "البقاء على اطلاع بأحدث الاتجاهات والتقنيات في تطوير الويب"
        ]
      },
      requirements: {
        en: [
          "Bachelor's degree in Computer Science, Web Development, or related field",
          "At least 3 years of professional experience in web development",
          "Strong knowledge of HTML, CSS, JavaScript, and modern frameworks (React, Vue, Angular)",
          "Previous teaching or mentoring experience is a plus",
          "Excellent communication and presentation skills",
          "Fluent in English and Arabic or French"
        ],
        fr: [
          "Diplôme universitaire en informatique, développement web ou domaine connexe",
          "Au moins 3 ans d'expérience professionnelle en développement web",
          "Solide connaissance de HTML, CSS, JavaScript et des frameworks modernes (React, Vue, Angular)",
          "Expérience préalable en enseignement ou mentorat est un plus",
          "Excellentes compétences en communication et présentation",
          "Maîtrise de l'anglais et de l'arabe ou du français"
        ],
        ar: [
          "شهادة بكالوريوس في علوم الكمبيوتر أو تطوير الويب أو مجال ذي صلة",
          "خبرة مهنية لا تقل عن 3 سنوات في تطوير الويب",
          "معرفة قوية بـ HTML و CSS و JavaScript والأطر الحديثة (React, Vue, Angular)",
          "الخبرة السابقة في التدريس أو التوجيه تعتبر ميزة إضافية",
          "مهارات ممتازة في التواصل والعرض",
          "إجادة اللغة الإنجليزية والعربية أو الفرنسية"
        ]
      },
      benefits: {
        en: [
          "Competitive salary based on experience",
          "Health insurance coverage",
          "Paid vacation and holidays",
          "Professional development opportunities",
          "Dynamic and collaborative work environment"
        ],
        fr: [
          "Salaire compétitif basé sur l'expérience",
          "Couverture d'assurance maladie",
          "Congés payés et jours fériés",
          "Opportunités de développement professionnel",
          "Environnement de travail dynamique et collaboratif"
        ],
        ar: [
          "راتب تنافسي على أساس الخبرة",
          "تغطية التأمين الصحي",
          "إجازة مدفوعة وعطلات",
          "فرص للتطوير المهني",
          "بيئة عمل ديناميكية وتعاونية"
        ]
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
      },
      responsibilities: {
        en: [
          "Develop and implement digital marketing strategies",
          "Manage social media accounts and create engaging content",
          "Plan and execute email marketing campaigns",
          "Optimize website content for SEO",
          "Track and analyze marketing performance metrics",
          "Collaborate with the content team to create marketing materials"
        ],
        fr: [
          "Développer et mettre en œuvre des stratégies de marketing digital",
          "Gérer les comptes sur les réseaux sociaux et créer du contenu engageant",
          "Planifier et exécuter des campagnes d'email marketing",
          "Optimiser le contenu du site web pour le référencement",
          "Suivre et analyser les métriques de performance marketing",
          "Collaborer avec l'équipe de contenu pour créer des supports marketing"
        ],
        ar: [
          "تطوير وتنفيذ استراتيجيات التسويق الرقمي",
          "إدارة حسابات وسائل التواصل الاجتماعي وإنشاء محتوى جذاب",
          "تخطيط وتنفيذ حملات التسويق عبر البريد الإلكتروني",
          "تحسين محتوى الموقع لمحركات البحث",
          "تتبع وتحليل مقاييس أداء التسويق",
          "التعاون مع فريق المحتوى لإنشاء مواد تسويقية"
        ]
      },
      requirements: {
        en: [
          "Bachelor's degree in Marketing, Communications, or related field",
          "2+ years of experience in digital marketing",
          "Strong knowledge of SEO, social media marketing, and content creation",
          "Experience with email marketing and analytics tools",
          "Creative thinking and excellent writing skills",
          "Fluent in English and Arabic or French"
        ],
        fr: [
          "Diplôme universitaire en marketing, communications ou domaine connexe",
          "2+ ans d'expérience en marketing digital",
          "Solide connaissance du référencement, du marketing sur les réseaux sociaux et de la création de contenu",
          "Expérience avec les outils d'email marketing et d'analyse",
          "Pensée créative et excellentes compétences rédactionnelles",
          "Maîtrise de l'anglais et de l'arabe ou du français"
        ],
        ar: [
          "شهادة بكالوريوس في التسويق أو الاتصالات أو مجال ذي صلة",
          "خبرة لا تقل عن سنتين في التسويق الرقمي",
          "معرفة قوية بتحسين محركات البحث والتسويق عبر وسائل التواصل الاجتماعي وإنشاء المحتوى",
          "خبرة في التسويق عبر البريد الإلكتروني وأدوات التحليل",
          "تفكير إبداعي ومهارات كتابية ممتازة",
          "إجادة اللغة الإنجليزية والعربية أو الفرنسية"
        ]
      },
      benefits: {
        en: [
          "Flexible working hours",
          "Competitive hourly rate",
          "Professional development opportunities",
          "Remote work options",
          "Dynamic and innovative team environment"
        ],
        fr: [
          "Horaires de travail flexibles",
          "Taux horaire compétitif",
          "Opportunités de développement professionnel",
          "Options de travail à distance",
          "Environnement d'équipe dynamique et innovant"
        ],
        ar: [
          "ساعات عمل مرنة",
          "أجر ساعي تنافسي",
          "فرص للتطوير المهني",
          "خيارات العمل عن بعد",
          "بيئة فريق ديناميكية ومبتكرة"
        ]
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
      },
      responsibilities: {
        en: [
          "Serve as the primary point of contact for student inquiries and concerns",
          "Coordinate student registration and enrollment processes",
          "Maintain accurate student records and documentation",
          "Organize student orientation and other events",
          "Provide academic support and resources to students",
          "Collaborate with instructors to monitor student progress"
        ],
        fr: [
          "Servir de point de contact principal pour les demandes et préoccupations des étudiants",
          "Coordonner les processus d'inscription et d'enregistrement des étudiants",
          "Maintenir des dossiers étudiants précis et des documents",
          "Organiser l'orientation des étudiants et d'autres événements",
          "Fournir un soutien académique et des ressources aux étudiants",
          "Collaborer avec les instructeurs pour suivre les progrès des étudiants"
        ],
        ar: [
          "كن نقطة الاتصال الرئيسية لاستفسارات ومخاوف الطلاب",
          "تنسيق عمليات تسجيل الطلاب والالتحاق",
          "الحفاظ على سجلات ووثائق دقيقة للطلاب",
          "تنظيم توجيه الطلاب والفعاليات الأخرى",
          "تقديم الدعم الأكاديمي والموارد للطلاب",
          "التعاون مع المدربين لمراقبة تقدم الطلاب"
        ]
      },
      requirements: {
        en: [
          "Bachelor's degree in Education, Psychology, or related field",
          "1+ years of experience in student services or related role",
          "Strong organizational and communication skills",
          "Ability to work with diverse student populations",
          "Proficiency in MS Office and student management systems",
          "Fluent in English and Arabic or French"
        ],
        fr: [
          "Diplôme universitaire en éducation, psychologie ou domaine connexe",
          "1+ an d'expérience dans les services aux étudiants ou un rôle similaire",
          "Solides compétences organisationnelles et de communication",
          "Capacité à travailler avec des populations étudiantes diverses",
          "Maîtrise de MS Office et des systèmes de gestion des étudiants",
          "Maîtrise de l'anglais et de l'arabe ou du français"
        ],
        ar: [
          "شهادة بكالوريوس في التعليم أو علم النفس أو مجال ذي صلة",
          "خبرة لا تقل عن سنة واحدة في خدمات الطلاب أو دور مماثل",
          "مهارات تنظيمية وتواصلية قوية",
          "القدرة على العمل مع مجموعات طلابية متنوعة",
          "إتقان برامج MS Office وأنظمة إدارة الطلاب",
          "إجادة اللغة الإنجليزية والعربية أو الفرنسية"
        ]
      },
      benefits: {
        en: [
          "Competitive salary and benefits package",
          "Health insurance coverage",
          "Paid vacation and holidays",
          "Professional development opportunities",
          "Positive and supportive work environment"
        ],
        fr: [
          "Salaire compétitif et ensemble d'avantages sociaux",
          "Couverture d'assurance maladie",
          "Congés payés et jours fériés",
          "Opportunités de développement professionnel",
          "Environnement de travail positif et favorable"
        ],
        ar: [
          "حزمة راتب ومزايا تنافسية",
          "تغطية التأمين الصحي",
          "إجازة مدفوعة وعطلات",
          "فرص للتطوير المهني",
          "بيئة عمل إيجابية وداعمة"
        ]
      }
    }
  ];
  
  // Find the job by ID
  const jobId = parseInt(id);
  const job = jobOpenings.find(j => j.id === jobId);
  
  // If job not found, return 404
  if (!job) {
    notFound();
  }
  
  return (
    <main className="min-h-screen">
      <Navigation locale={locale} translations={translations.nav} />
      
      {/* Job Details Header */}
      <section className="bg-primary py-20 mt-16">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-lg p-8 -mb-32 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-neutral-dark mb-2">
                  {job.title[locale as keyof typeof job.title]}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {job.department[locale as keyof typeof job.department]}
                  </span>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                    {job.location[locale as keyof typeof job.location]}
                  </span>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
                    {job.type[locale as keyof typeof job.type]}
                  </span>
                </div>
              </div>
              <a href="#application-form" className="btn btn-primary mt-4 md:mt-0">
                {translations.careers?.openings?.applyButton || (locale === 'fr' ? 'Postuler Maintenant' : locale === 'ar' ? 'تقدم الآن' : 'Apply Now')}
              </a>
            </div>
            <p className="text-neutral text-lg mb-6">
              {job.description[locale as keyof typeof job.description]}
            </p>
          </div>
        </div>
      </section>
      
      {/* Job Details Content */}
      <section className="pt-40 pb-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Responsibilities */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                  {locale === 'fr' ? 'Responsabilités' : locale === 'ar' ? 'المسؤوليات' : 'Responsibilities'}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-neutral">
                  {job.responsibilities[locale as keyof typeof job.responsibilities].map((item, index) => (
                    <li key={index} className="pl-2">{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Requirements */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                  {locale === 'fr' ? 'Qualifications Requises' : locale === 'ar' ? 'المتطلبات' : 'Requirements'}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-neutral">
                  {job.requirements[locale as keyof typeof job.requirements].map((item, index) => (
                    <li key={index} className="pl-2">{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Benefits */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                  {locale === 'fr' ? 'Avantages' : locale === 'ar' ? 'المزايا' : 'Benefits'}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-neutral">
                  {job.benefits[locale as keyof typeof job.benefits].map((item, index) => (
                    <li key={index} className="pl-2">{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Application Form */}
              <div id="application-form" className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-neutral-dark mb-4">
                  {locale === 'fr' ? 'Postuler' : locale === 'ar' ? 'تقديم الطلب' : 'Apply for this Position'}
                </h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-dark mb-1">
                        {locale === 'fr' ? 'Prénom' : locale === 'ar' ? 'الاسم الأول' : 'First Name'}
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                    </div>
                    <div>
                      <label className="block text-neutral-dark mb-1">
                        {locale === 'fr' ? 'Nom' : locale === 'ar' ? 'اللقب' : 'Last Name'}
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-neutral-dark mb-1">
                      {locale === 'fr' ? 'Email' : locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input type="email" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                  </div>
                  <div>
                    <label className="block text-neutral-dark mb-1">
                      {locale === 'fr' ? 'Téléphone' : locale === 'ar' ? 'رقم الهاتف' : 'Phone'}
                    </label>
                    <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                  </div>
                  <div>
                    <label className="block text-neutral-dark mb-1">
                      {locale === 'fr' ? 'CV (PDF ou DOCX)' : locale === 'ar' ? 'السيرة الذاتية (PDF أو DOCX)' : 'Resume (PDF or DOCX)'}
                    </label>
                    <input type="file" accept=".pdf,.docx" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" required />
                  </div>
                  <div>
                    <label className="block text-neutral-dark mb-1">
                      {locale === 'fr' ? 'Lettre de motivation' : locale === 'ar' ? 'رسالة تحفيزية' : 'Cover Letter'}
                    </label>
                    <textarea rows={4} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {locale === 'fr' ? 'Soumettre ma candidature' : locale === 'ar' ? 'تقديم طلبي' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Summary */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-dark mb-4">
                  {locale === 'fr' ? 'Résumé du Poste' : locale === 'ar' ? 'ملخص الوظيفة' : 'Job Summary'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-neutral-light text-sm">
                      {locale === 'fr' ? 'Département' : locale === 'ar' ? 'القسم' : 'Department'}
                    </p>
                    <p className="text-neutral-dark">
                      {job.department[locale as keyof typeof job.department]}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-light text-sm">
                      {locale === 'fr' ? 'Lieu' : locale === 'ar' ? 'الموقع' : 'Location'}
                    </p>
                    <p className="text-neutral-dark">
                      {job.location[locale as keyof typeof job.location]}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-light text-sm">
                      {locale === 'fr' ? 'Type d\'emploi' : locale === 'ar' ? 'نوع الوظيفة' : 'Job Type'}
                    </p>
                    <p className="text-neutral-dark">
                      {job.type[locale as keyof typeof job.type]}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Share Job */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-dark mb-4">
                  {locale === 'fr' ? 'Partager ce Poste' : locale === 'ar' ? 'مشاركة هذه الوظيفة' : 'Share This Job'}
                </h3>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-blue-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-blue-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-red-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Other Jobs */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-dark mb-4">
                  {locale === 'fr' ? 'Autres Postes' : locale === 'ar' ? 'وظائف أخرى' : 'Other Jobs'}
                </h3>
                <div className="space-y-3">
                  {jobOpenings.filter(j => j.id !== jobId).map(otherJob => (
                    <Link 
                      key={otherJob.id} 
                      href={`/${locale}/careers/${otherJob.id}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="font-medium text-neutral-dark">{otherJob.title[locale as keyof typeof otherJob.title]}</h4>
                      <p className="text-sm text-neutral-light">{otherJob.department[locale as keyof typeof otherJob.department]}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Jobs Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-neutral-dark mb-8 text-center">
            {locale === 'fr' ? 'Postes Similaires' : locale === 'ar' ? 'وظائف مشابهة' : 'Similar Jobs'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobOpenings.filter(j => j.id !== jobId).map(relatedJob => (
              <div key={relatedJob.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-neutral-dark">{relatedJob.title[locale as keyof typeof relatedJob.title]}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      {relatedJob.department[locale as keyof typeof relatedJob.department]}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                      {relatedJob.location[locale as keyof typeof relatedJob.location]}
                    </span>
                  </div>
                  <p className="text-neutral mb-4 line-clamp-2">{relatedJob.description[locale as keyof typeof relatedJob.description]}</p>
                  <Link href={`/${locale}/careers/${relatedJob.id}`} className="text-primary hover:text-primary-dark font-medium transition-colors">
                    {locale === 'fr' ? 'Voir les détails' : locale === 'ar' ? 'عرض التفاصيل' : 'View Details'} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer locale={locale} translations={translations.footer} />
    </main>
  );
} 