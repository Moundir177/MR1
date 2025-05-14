import { Locale } from '../../i18n/settings';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTags, FaSearch } from 'react-icons/fa';

interface BlogPageProps {
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

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const translations = await getTranslations(locale);
  
  // Handle RTL for Arabic
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
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
    },
    {
      id: 'freelancing-tips',
      title: locale === 'fr'
        ? 'Conseils pour réussir en tant que freelance'
        : locale === 'ar'
        ? 'نصائح للنجاح كمستقل'
        : 'Tips for Succeeding as a Freelancer',
      excerpt: locale === 'fr'
        ? 'Découvrez comment établir une carrière réussie en tant que freelance dans le domaine technologique.'
        : locale === 'ar'
        ? 'اكتشف كيفية إنشاء مهنة ناجحة كمستقل في مجال التكنولوجيا.'
        : 'Learn how to establish a successful freelance career in the tech field.',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2023-11-05',
      author: locale === 'fr' ? 'Thomas Dubois' : locale === 'ar' ? 'توماس دوبوا' : 'Thomas Dubois',
      category: locale === 'fr' ? 'Carrière' : locale === 'ar' ? 'مهنة' : 'Career',
      categoryColor: 'bg-gray-600'
    },
    {
      id: 'ai-education',
      title: locale === 'fr'
        ? 'L\'IA dans l\'éducation : transformer l\'apprentissage'
        : locale === 'ar'
        ? 'الذكاء الاصطناعي في التعليم: تحويل التعلم'
        : 'AI in Education: Transforming Learning',
      excerpt: locale === 'fr'
        ? 'Explorez comment l\'intelligence artificielle révolutionne les méthodes d\'enseignement et d\'apprentissage.'
        : locale === 'ar'
        ? 'استكشف كيف يعيد الذكاء الاصطناعي تشكيل طرق التدريس والتعلم.'
        : 'Explore how artificial intelligence is reshaping teaching and learning methods.',
      image: 'https://images.pexels.com/photos/7516362/pexels-photo-7516362.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2023-11-01',
      author: locale === 'fr' ? 'Leila Mansouri' : locale === 'ar' ? 'ليلى منصوري' : 'Leila Mansouri',
      category: locale === 'fr' ? 'Technologie' : locale === 'ar' ? 'تكنولوجيا' : 'Technology',
      categoryColor: 'bg-indigo-600'
    },
    {
      id: 'ux-research',
      title: locale === 'fr'
        ? 'L\'importance de la recherche UX dans le design de produit'
        : locale === 'ar'
        ? 'أهمية أبحاث تجربة المستخدم في تصميم المنتجات'
        : 'The Importance of UX Research in Product Design',
      excerpt: locale === 'fr'
        ? 'Apprenez pourquoi la recherche UX est cruciale pour créer des produits centrés sur l\'utilisateur.'
        : locale === 'ar'
        ? 'تعرف على سبب أهمية أبحاث تجربة المستخدم في إنشاء منتجات تركز على المستخدم.'
        : 'Learn why UX research is crucial for creating user-centered products.',
      image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2023-10-28',
      author: locale === 'fr' ? 'Sarah Morel' : locale === 'ar' ? 'سارة موريل' : 'Sarah Morel',
      category: locale === 'fr' ? 'Design' : locale === 'ar' ? 'تصميم' : 'Design',
      categoryColor: 'bg-secondary'
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
  
  // Categories for sidebar
  const categories = [
    {
      name: locale === 'fr' ? 'Développement Web' : locale === 'ar' ? 'تطوير الويب' : 'Web Development',
      count: 4
    },
    {
      name: locale === 'fr' ? 'Design' : locale === 'ar' ? 'تصميم' : 'Design',
      count: 3
    },
    {
      name: locale === 'fr' ? 'Marketing' : locale === 'ar' ? 'تسويق' : 'Marketing',
      count: 2
    },
    {
      name: locale === 'fr' ? 'Technologie' : locale === 'ar' ? 'تكنولوجيا' : 'Technology',
      count: 5
    },
    {
      name: locale === 'fr' ? 'Carrière' : locale === 'ar' ? 'مهنة' : 'Career',
      count: 3
    }
  ];
  
  // Recent posts for sidebar
  const recentPosts = blogPosts.slice(0, 3);
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations.nav} />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom">
            <div className="text-center mb-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {locale === 'fr' ? 'Blog' : locale === 'ar' ? 'المدونة' : 'Blog'}
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                {locale === 'fr' 
                  ? "Explorez nos ressources et articles sur le développement web, le design, le marketing et la technologie."
                  : locale === 'ar'
                  ? "استكشف مواردنا ومقالاتنا حول تطوير الويب والتصميم والتسويق والتكنولوجيا."
                  : "Explore our resources and articles about web development, design, marketing, and technology."}
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Content */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content - Blog Posts */}
              <div className="lg:col-span-2">
                <div className="space-y-10">
                  {blogPosts.map((post, index) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`text-xs font-semibold px-3 py-1.5 ${post.categoryColor} text-white rounded-full`}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-sm text-neutral mb-4">
                          <div className="flex items-center mr-6">
                            <FaCalendarAlt className={`${isRTL ? 'ml-2' : 'mr-2'} text-primary/70`} />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <FaUser className={`${isRTL ? 'ml-2' : 'mr-2'} text-primary/70`} />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-4 text-neutral-dark hover:text-primary transition-colors">
                          <Link href={`/${locale}/blog/${post.id}`}>{post.title}</Link>
                        </h2>
                        
                        <p className="text-neutral mb-4">{post.excerpt}</p>
                        
                        <Link 
                          href={`/${locale}/blog/${post.id}`}
                          className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                          <span className={isRTL ? 'ml-2' : 'mr-2'}>
                            {locale === 'fr' 
                              ? 'Lire l\'article complet' 
                              : locale === 'ar' 
                              ? 'قراءة المقال كاملاً' 
                              : 'Read full article'}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <a 
                      href="#" 
                      className="px-4 py-2 border border-gray-300 rounded-lg text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    >
                      {locale === 'fr' ? 'Précédent' : locale === 'ar' ? 'السابق' : 'Previous'}
                    </a>
                    <a href="#" className="px-4 py-2 border border-primary bg-primary text-white rounded-lg">1</a>
                    <a href="#" className="px-4 py-2 border border-gray-300 rounded-lg text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition-colors">2</a>
                    <a href="#" className="px-4 py-2 border border-gray-300 rounded-lg text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition-colors">3</a>
                    <a 
                      href="#" 
                      className="px-4 py-2 border border-gray-300 rounded-lg text-neutral-dark hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    >
                      {locale === 'fr' ? 'Suivant' : locale === 'ar' ? 'التالي' : 'Next'}
                    </a>
                  </nav>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  {/* Search Box */}
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-xl font-bold text-neutral-dark mb-4">
                      {locale === 'fr' ? 'Rechercher' : locale === 'ar' ? 'بحث' : 'Search'}
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={locale === 'fr' ? 'Chercher des articles...' : locale === 'ar' ? 'البحث عن مقالات...' : 'Search for articles...'}
                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 focus:ring-primary focus:border-primary"
                      />
                      <FaSearch className="absolute top-3.5 right-3 text-neutral" />
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-xl font-bold text-neutral-dark mb-4">
                      {locale === 'fr' ? 'Catégories' : locale === 'ar' ? 'الفئات' : 'Categories'}
                    </h3>
                    <ul className="space-y-3">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a href="#" className="flex justify-between items-center text-neutral hover:text-primary transition-colors">
                            <span className="flex items-center">
                              <FaTags className={`text-primary/70 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {category.name}
                            </span>
                            <span className="text-xs bg-neutral-light/50 px-2 py-1 rounded-full">
                              {category.count}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Recent Posts */}
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-xl font-bold text-neutral-dark mb-4">
                      {locale === 'fr' ? 'Articles Récents' : locale === 'ar' ? 'مقالات حديثة' : 'Recent Posts'}
                    </h3>
                    <div className="space-y-4">
                      {recentPosts.map((post, index) => (
                        <div key={post.id} className="flex space-x-4">
                          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-neutral-dark hover:text-primary transition-colors">
                              <Link href={`/${locale}/blog/${post.id}`}>{post.title}</Link>
                            </h4>
                            <p className="text-sm text-neutral">
                              {formatDate(post.date)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Subscribe Box */}
                  <div className="bg-primary rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">
                      {locale === 'fr' ? 'Abonnez-vous' : locale === 'ar' ? 'اشترك' : 'Subscribe'}
                    </h3>
                    <p className="mb-4 text-white/90">
                      {locale === 'fr' 
                        ? 'Recevez nos derniers articles directement dans votre boîte mail.'
                        : locale === 'ar'
                        ? 'احصل على أحدث المقالات مباشرة في صندوق البريد الخاص بك.'
                        : 'Get our latest articles directly in your inbox.'}
                    </p>
                    <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder={locale === 'fr' ? 'Votre email' : locale === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                        className="w-full px-4 py-3 rounded-lg text-neutral-dark outline-none focus:ring-2 focus:ring-white"
                      />
                      <button className="w-full bg-white text-primary hover:bg-neutral-light py-3 rounded-lg font-medium transition-colors">
                        {locale === 'fr' ? 'S\'abonner' : locale === 'ar' ? 'اشترك' : 'Subscribe'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer locale={locale} translations={translations.footer} />
    </div>
  );
} 