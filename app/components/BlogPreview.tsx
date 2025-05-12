"use client";

import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface BlogPreviewProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
}

export default function BlogPreview({ locale, translations }: BlogPreviewProps) {
  // Mock blog posts data - in a real app, this would come from an API or CMS
  const blogPosts = [
    {
      id: 'web-dev-trends',
      title: locale === 'fr' 
        ? 'Tendances du développement web en 2023' 
        : locale === 'ar' 
        ? 'اتجاهات تطوير الويب في 2023' 
        : 'Web Development Trends in 2023',
      excerpt: locale === 'fr'
        ? 'Découvrez les technologies et frameworks qui dominent l\'écosystème du développement web cette année.'
        : locale === 'ar'
        ? 'اكتشف التقنيات وأطر العمل التي تهيمن على نظام تطوير الويب هذا العام.'
        : 'Discover the technologies and frameworks dominating the web development ecosystem this year.',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: '2023-11-20',
      author: locale === 'fr' ? 'Marie Laurent' : locale === 'ar' ? 'مريم لوران' : 'Marie Laurent',
      category: locale === 'fr' ? 'Développement Web' : locale === 'ar' ? 'تطوير الويب' : 'Web Development',
      categoryColor: 'bg-primary'
    },
    {
      id: 'ui-design-principles',
      title: locale === 'fr'
        ? 'Principes essentiels de conception d\'interface utilisateur'
        : locale === 'ar'
        ? 'مبادئ أساسية في تصميم واجهة المستخدم'
        : 'Essential UI Design Principles',
      excerpt: locale === 'fr'
        ? 'Apprenez les principes fondamentaux de la conception d\'interfaces utilisateur qui améliorent l\'expérience utilisateur.'
        : locale === 'ar'
        ? 'تعلم المبادئ الأساسية لتصميم واجهات المستخدم التي تحسن تجربة المستخدم.'
        : 'Learn the fundamental principles of UI design that enhance user experience.',
      image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: '2023-11-15',
      author: locale === 'fr' ? 'Ahmed Benali' : locale === 'ar' ? 'أحمد بن علي' : 'Ahmed Benali',
      category: locale === 'fr' ? 'Design' : locale === 'ar' ? 'تصميم' : 'Design',
      categoryColor: 'bg-secondary'
    },
    {
      id: 'digital-marketing-strategies',
      title: locale === 'fr'
        ? 'Stratégies de marketing digital pour 2024'
        : locale === 'ar'
        ? 'استراتيجيات التسويق الرقمي لعام 2024'
        : 'Digital Marketing Strategies for 2024',
      excerpt: locale === 'fr'
        ? 'Préparez votre entreprise avec les stratégies de marketing digital les plus efficaces pour l\'année à venir.'
        : locale === 'ar'
        ? 'جهز شركتك باستراتيجيات التسويق الرقمي الأكثر فعالية للعام المقبل.'
        : 'Prepare your business with the most effective digital marketing strategies for the coming year.',
      image: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: '2023-11-10',
      author: locale === 'fr' ? 'Sophia Dupont' : locale === 'ar' ? 'صوفيا دوبونت' : 'Sophia Dupont',
      category: locale === 'fr' ? 'Marketing' : locale === 'ar' ? 'تسويق' : 'Marketing',
      categoryColor: 'bg-accent'
    }
  ];

  // Format date according to locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    if (locale === 'fr') {
      return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    } else if (locale === 'ar') {
      return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4 text-center md:text-left"
            >
              {translations.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-neutral max-w-xl text-center md:text-left"
            >
              {translations.subtitle}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a 
              href={`/${locale}/blog`}
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors mt-6 md:mt-0"
            >
              <span className="mr-2">{translations.viewAll}</span>
              <FaArrowRight className="text-sm" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <a 
                href={`/${locale}/blog/${post.id}`}
                className="block"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 ${post.categoryColor} text-white rounded-full`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-neutral-light mb-4">
                    <div className="flex items-center mr-4">
                      <FaCalendarAlt className="mr-2 text-neutral-light" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-neutral-light" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-neutral-dark hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors">
                      <span className="mr-2">
                        {locale === 'fr' ? 'Lire la suite' : locale === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                      </span>
                      <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
} 