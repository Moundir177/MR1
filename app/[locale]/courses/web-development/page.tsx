import { Locale } from '../../../i18n/settings';
import Navigation from '../../../components/Navigation';
import CourseDetails from '../../../components/CourseDetails';
import Footer from '../../../components/Footer';
import fs from 'fs';
import path from 'path';

interface CoursePageProps {
  params: {
    locale: Locale;
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

export default async function WebDevelopmentCoursePage({ params: { locale } }: CoursePageProps) {
  const translations = await getTranslations(locale);

  // Mock course data - in a real app, this would come from a CMS or API
  const webDevCourse = {
    id: 'web-development',
    title: locale === 'fr' 
      ? 'Formation Complète en Développement Web' 
      : locale === 'ar' 
      ? 'دورة شاملة في تطوير الويب' 
      : 'Complete Web Development Course',
    description: locale === 'fr'
      ? 'Cette formation complète vous enseignera tout ce que vous devez savoir pour devenir un développeur web full-stack. Vous apprendrez HTML, CSS, JavaScript, React, Node.js et plus encore pour créer des sites web modernes et réactifs.'
      : locale === 'ar'
      ? 'ستعلمك هذه الدورة التدريبية الشاملة كل ما تحتاج لمعرفته لتصبح مطور ويب متكامل. ستتعلم HTML و CSS و JavaScript و React و Node.js والمزيد لإنشاء مواقع ويب حديثة ومتجاوبة.'
      : 'This comprehensive course will teach you everything you need to know to become a full-stack web developer. You will learn HTML, CSS, JavaScript, React, Node.js, and more to create modern, responsive websites.',
    image: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg',
    duration: locale === 'fr' ? '120 heures' : locale === 'ar' ? '120 ساعة' : '120 hours',
    level: locale === 'fr' ? 'Débutant à Avancé' : locale === 'ar' ? 'مبتدئ إلى متقدم' : 'Beginner to Advanced',
    language: locale === 'fr' ? 'Français' : locale === 'ar' ? 'العربية' : 'English',
    price: '35,000 DA',
    discount: '-20%',
    students: 1245,
    lessons: 48,
    outcome: [
      locale === 'fr' 
        ? 'Maîtriser HTML5, CSS3 et JavaScript (ES6+)' 
        : locale === 'ar' 
        ? 'إتقان HTML5 و CSS3 و JavaScript (ES6+)' 
        : 'Master HTML5, CSS3, and JavaScript (ES6+)',
      locale === 'fr'
        ? 'Créer des sites web réactifs avec des designs modernes'
        : locale === 'ar'
        ? 'إنشاء مواقع ويب متجاوبة بتصميمات حديثة'
        : 'Create responsive websites with modern designs',
      locale === 'fr'
        ? 'Développer des applications front-end avec React.js'
        : locale === 'ar'
        ? 'تطوير تطبيقات الواجهة الأمامية باستخدام React.js'
        : 'Develop front-end applications with React.js',
      locale === 'fr'
        ? 'Construire des API RESTful avec Node.js et Express'
        : locale === 'ar'
        ? 'بناء واجهات برمجة تطبيقات RESTful باستخدام Node.js و Express'
        : 'Build RESTful APIs with Node.js and Express',
      locale === 'fr'
        ? 'Travailler avec des bases de données MongoDB'
        : locale === 'ar'
        ? 'العمل مع قواعد بيانات MongoDB'
        : 'Work with MongoDB databases',
      locale === 'fr'
        ? 'Déployer vos applications sur des services cloud'
        : locale === 'ar'
        ? 'نشر تطبيقاتك على خدمات سحابية'
        : 'Deploy your applications to cloud services',
      locale === 'fr'
        ? 'Utiliser Git pour le contrôle de version'
        : locale === 'ar'
        ? 'استخدام Git للتحكم في الإصدار'
        : 'Use Git for version control',
      locale === 'fr'
        ? 'Comprendre les meilleures pratiques de développement web'
        : locale === 'ar'
        ? 'فهم أفضل ممارسات تطوير الويب'
        : 'Understand web development best practices'
    ],
    curriculum: [
      {
        section: locale === 'fr' ? 'Introduction au développement web' : locale === 'ar' ? 'مقدمة في تطوير الويب' : 'Introduction to Web Development',
        lessons: [
          {
            title: locale === 'fr' ? 'Bienvenue au cours' : locale === 'ar' ? 'مرحبًا بك في الدورة' : 'Welcome to the Course',
            duration: '10:00',
            preview: true
          },
          {
            title: locale === 'fr' ? 'Configuration de l\'environnement de développement' : locale === 'ar' ? 'إعداد بيئة التطوير' : 'Setting Up the Development Environment',
            duration: '15:00',
            preview: true
          },
          {
            title: locale === 'fr' ? 'Comprendre Internet et le Web' : locale === 'ar' ? 'فهم الإنترنت والويب' : 'Understanding the Internet and the Web',
            duration: '20:00'
          }
        ]
      },
      {
        section: locale === 'fr' ? 'HTML5 Fondamentaux' : locale === 'ar' ? 'أساسيات HTML5' : 'HTML5 Fundamentals',
        lessons: [
          {
            title: locale === 'fr' ? 'Structure d\'un document HTML' : locale === 'ar' ? 'هيكل مستند HTML' : 'HTML Document Structure',
            duration: '15:00',
            preview: true
          },
          {
            title: locale === 'fr' ? 'Texte et éléments de contenu' : locale === 'ar' ? 'النص وعناصر المحتوى' : 'Text and Content Elements',
            duration: '25:00'
          },
          {
            title: locale === 'fr' ? 'Liens et navigation' : locale === 'ar' ? 'الروابط والتنقل' : 'Links and Navigation',
            duration: '20:00'
          },
          {
            title: locale === 'fr' ? 'Images et multimédia' : locale === 'ar' ? 'الصور والوسائط المتعددة' : 'Images and Multimedia',
            duration: '25:00'
          },
          {
            title: locale === 'fr' ? 'Formulaires et validation' : locale === 'ar' ? 'النماذج والتحقق' : 'Forms and Validation',
            duration: '30:00'
          }
        ]
      },
      {
        section: locale === 'fr' ? 'CSS3 et style moderne' : locale === 'ar' ? 'CSS3 والتصميم الحديث' : 'CSS3 and Modern Styling',
        lessons: [
          {
            title: locale === 'fr' ? 'Bases de CSS' : locale === 'ar' ? 'أساسيات CSS' : 'CSS Basics',
            duration: '20:00'
          },
          {
            title: locale === 'fr' ? 'Le modèle de boîte' : locale === 'ar' ? 'نموذج الصندوق' : 'The Box Model',
            duration: '15:00'
          },
          {
            title: locale === 'fr' ? 'Mise en page avec Flexbox' : locale === 'ar' ? 'التخطيط باستخدام Flexbox' : 'Layout with Flexbox',
            duration: '25:00'
          },
          {
            title: locale === 'fr' ? 'Grilles CSS' : locale === 'ar' ? 'شبكات CSS' : 'CSS Grid',
            duration: '25:00'
          },
          {
            title: locale === 'fr' ? 'Design responsive' : locale === 'ar' ? 'التصميم المتجاوب' : 'Responsive Design',
            duration: '30:00'
          },
          {
            title: locale === 'fr' ? 'Animations et transitions' : locale === 'ar' ? 'الرسوم المتحركة والانتقالات' : 'Animations and Transitions',
            duration: '20:00'
          }
        ]
      },
      {
        section: locale === 'fr' ? 'JavaScript Moderne' : locale === 'ar' ? 'جافا سكريبت الحديثة' : 'Modern JavaScript',
        lessons: [
          {
            title: locale === 'fr' ? 'Introduction à JavaScript' : locale === 'ar' ? 'مقدمة في جافا سكريبت' : 'Introduction to JavaScript',
            duration: '20:00'
          },
          {
            title: locale === 'fr' ? 'Variables, types et fonctions' : locale === 'ar' ? 'المتغيرات والأنواع والوظائف' : 'Variables, Types, and Functions',
            duration: '30:00'
          },
          {
            title: locale === 'fr' ? 'Contrôle de flux et boucles' : locale === 'ar' ? 'التحكم في التدفق والحلقات' : 'Flow Control and Loops',
            duration: '25:00'
          },
          {
            title: locale === 'fr' ? 'Manipulation du DOM' : locale === 'ar' ? 'التلاعب بالـ DOM' : 'DOM Manipulation',
            duration: '35:00'
          },
          {
            title: locale === 'fr' ? 'Gestion des événements' : locale === 'ar' ? 'إدارة الأحداث' : 'Event Handling',
            duration: '25:00'
          },
          {
            title: locale === 'fr' ? 'ES6+ et fonctionnalités modernes' : locale === 'ar' ? 'ES6+ والميزات الحديثة' : 'ES6+ and Modern Features',
            duration: '30:00'
          },
          {
            title: locale === 'fr' ? 'Travailler avec les API' : locale === 'ar' ? 'العمل مع واجهات برمجة التطبيقات' : 'Working with APIs',
            duration: '40:00'
          }
        ]
      }
    ],
    instructor: {
      name: locale === 'fr' ? 'Ahmed Benali' : locale === 'ar' ? 'أحمد بن علي' : 'Ahmed Benali',
      role: locale === 'fr' 
        ? 'Développeur Web Senior & Formateur' 
        : locale === 'ar' 
        ? 'مطور ويب أول ومدرب' 
        : 'Senior Web Developer & Instructor',
      bio: locale === 'fr'
        ? 'Ahmed est un développeur web avec plus de 10 ans d\'expérience. Il a travaillé pour plusieurs entreprises technologiques et a contribué à de nombreux projets open source. Sa passion pour l\'enseignement l\'a amené à créer des cours qui ont aidé des milliers d\'étudiants à devenir des développeurs web compétents.'
        : locale === 'ar'
        ? 'أحمد مطور ويب بخبرة تزيد عن 10 سنوات. عمل لدى العديد من شركات التكنولوجيا وساهم في العديد من مشاريع المصدر المفتوح. دفعه شغفه بالتدريس إلى إنشاء دورات ساعدت آلاف الطلاب ليصبحوا مطوري ويب أكفاء.'
        : 'Ahmed is a web developer with over 10 years of experience. He has worked for several tech companies and contributed to many open-source projects. His passion for teaching led him to create courses that have helped thousands of students become proficient web developers.',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation locale={locale} translations={translations.nav} />
      <CourseDetails 
        locale={locale} 
        translations={translations.courseDetails} 
        course={webDevCourse} 
      />
      <Footer locale={locale} translations={translations.footer} />
    </main>
  );
} 