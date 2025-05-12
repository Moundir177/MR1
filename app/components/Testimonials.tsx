"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface TestimonialsProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
  };
}

export default function Testimonials({ locale, translations }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mock testimonials data - in a real app, this would come from a CMS or API
  const testimonials = [
    {
      id: 1,
      name: {
        en: 'Ahmed Hassan',
        fr: 'Ahmed Hassan',
        ar: 'أحمد حسن'
      },
      role: {
        en: 'Web Development Student',
        fr: 'Étudiant en Développement Web',
        ar: 'طالب تطوير الويب'
      },
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      rating: 5,
      content: {
        en: 'The web development course at MirAcademy completely transformed my career. The instructors are incredibly knowledgeable and supportive. I went from knowing almost nothing about coding to landing a junior developer position within six months of completing the course.',
        fr: 'Le cours de développement web à MirAcademy a complètement transformé ma carrière. Les instructeurs sont incroyablement compétents et encourageants. Je suis passé de ne presque rien connaître à la programmation à décrocher un poste de développeur junior dans les six mois suivant la fin du cours.',
        ar: 'لقد غيرت دورة تطوير الويب في مير أكاديمي مساري المهني تمامًا. المدربون على قدر كبير من المعرفة والدعم. انتقلت من عدم معرفة أي شيء تقريبًا عن البرمجة إلى الحصول على وظيفة كمطور مبتدئ في غضون ستة أشهر من إكمال الدورة.'
      }
    },
    {
      id: 2,
      name: {
        en: 'Sophia Martinez',
        fr: 'Sophia Martinez',
        ar: 'صوفيا مارتينيز'
      },
      role: {
        en: 'UX/UI Design Graduate',
        fr: 'Diplômée en Design UX/UI',
        ar: 'خريجة تصميم تجربة وواجهة المستخدم'
      },
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      rating: 5,
      content: {
        en: "The UX/UI design program exceeded all my expectations. The curriculum is comprehensive and up-to-date with industry standards. The practical projects helped me build an impressive portfolio that caught the attention of employers. I'm now working at a leading design agency!",
        fr: 'Le programme de design UX/UI a dépassé toutes mes attentes. Le curriculum est complet et à jour avec les standards de l\'industrie. Les projets pratiques m\'ont aidée à construire un portfolio impressionnant qui a attiré l\'attention des employeurs. Je travaille maintenant dans une agence de design de premier plan !',
        ar: 'لقد تجاوز برنامج تصميم تجربة وواجهة المستخدم كل توقعاتي. المنهج شامل ومواكب لمعايير الصناعة. ساعدتني المشاريع العملية على بناء محفظة مشاريع مثيرة للإعجاب جذبت انتباه أصحاب العمل. أنا الآن أعمل في وكالة تصميم رائدة!'
      }
    },
    {
      id: 3,
      name: {
        en: 'Omar Benali',
        fr: 'Omar Benali',
        ar: 'عمر بن علي'
      },
      role: {
        en: 'Digital Marketing Professional',
        fr: 'Professionnel du Marketing Digital',
        ar: 'محترف التسويق الرقمي'
      },
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      rating: 4,
      content: {
        en: "I enrolled in the Digital Marketing course to enhance my skills, and it was one of the best decisions I've made. The course covered everything from SEO to social media strategies and analytics. What I appreciated most was how the instructors incorporated real-world case studies and current trends into the lessons.",
        fr: "Je me suis inscrit au cours de Marketing Digital pour améliorer mes compétences, et c'était l'une des meilleures décisions que j'ai prises. Le cours couvrait tout, de la SEO aux stratégies de médias sociaux et à l'analyse. Ce que j'ai le plus apprécié, c'est la façon dont les instructeurs ont incorporé des études de cas réels et des tendances actuelles dans les leçons.",
        ar: "لقد التحقت بدورة التسويق الرقمي لتعزيز مهاراتي، وكان ذلك من أفضل القرارات التي اتخذتها. غطت الدورة كل شيء من تحسين محركات البحث إلى استراتيجيات وسائل التواصل الاجتماعي والتحليلات. ما قدرته أكثر هو كيفية قيام المدربين بدمج دراسات الحالة الواقعية والاتجاهات الحالية في الدروس."
      }
    },
    {
      id: 4,
      name: {
        en: 'Fatima Zahra',
        fr: 'Fatima Zahra',
        ar: 'فاطمة الزهراء'
      },
      role: {
        en: 'Data Science Student',
        fr: 'Étudiante en Science des Données',
        ar: 'طالبة علوم البيانات'
      },
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 5,
      content: {
        en: 'The Data Science bootcamp at MirAcademy was intense but incredibly rewarding. The instructors broke down complex concepts into manageable chunks, and the hands-on projects using real datasets gave me valuable experience. The career support after graduation was outstanding – they helped me connect with employers and prepare for interviews.',
        fr: 'Le bootcamp de Science des Données à MirAcademy était intense mais incroyablement enrichissant. Les instructeurs ont décomposé des concepts complexes en morceaux gérables, et les projets pratiques utilisant des ensembles de données réels m\'ont donné une expérience précieuse. Le soutien à la carrière après l\'obtention du diplôme était exceptionnel – ils m\'ont aidée à entrer en contact avec des employeurs et à me préparer pour les entretiens.',
        ar: 'كان معسكر علوم البيانات في مير أكاديمي مكثفًا ولكنه مجزٍ بشكل لا يصدق. قام المدرسون بتفكيك المفاهيم المعقدة إلى أجزاء يمكن التحكم فيها، وأعطتني المشاريع العملية التي تستخدم مجموعات بيانات حقيقية خبرة قيمة. كان الدعم الوظيفي بعد التخرج ممتازًا - لقد ساعدوني في التواصل مع أصحاب العمل والتحضير للمقابلات.'
      }
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const testimonial = testimonials[currentIndex];
  const name = testimonial.name[locale as keyof typeof testimonial.name] || testimonial.name.en;
  const role = testimonial.role[locale as keyof typeof testimonial.role] || testimonial.role.en;
  const content = testimonial.content[locale as keyof typeof testimonial.content] || testimonial.content.en;
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar 
        key={index} 
        className={index < rating ? "text-yellow-400" : "text-gray-300"} 
      />
    ));
  };
  
  return (
    <section className="py-24 bg-neutral-light">
      <div className="container-custom">
        <div className="text-center mb-16">
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
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-primary/10">
                    <img 
                      src={testimonial.image} 
                      alt={name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full">
                    <FaQuoteLeft className="text-sm" />
                  </div>
                </div>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <blockquote className="text-neutral text-lg md:text-xl italic mb-6">
                  "{content}"
                </blockquote>
                
                <div>
                  <div className="font-bold text-neutral-dark text-lg">{name}</div>
                  <div className="text-primary">{role}</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-dark hover:bg-primary hover:text-white transition-colors border border-gray-200"
              aria-label={locale === 'fr' ? 'Témoignage précédent' : locale === 'ar' ? 'الشهادة السابقة' : 'Previous testimonial'}
            >
              <FaChevronLeft />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-neutral-dark hover:bg-primary hover:text-white transition-colors border border-gray-200"
              aria-label={locale === 'fr' ? 'Témoignage suivant' : locale === 'ar' ? 'الشهادة التالية' : 'Next testimonial'}
            >
              <FaChevronRight />
            </button>
          </div>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={locale === 'fr' 
                  ? `Témoignage ${index + 1}` 
                  : locale === 'ar' 
                  ? `الشهادة ${index + 1}` 
                  : `Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 