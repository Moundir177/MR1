import { Locale } from '../../../i18n/settings';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { FaCalendarAlt, FaUser, FaTag, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    locale: Locale;
    slug: string;
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

// Mock blog posts data - in a real app, this would come from an API or CMS
const blogPostsData = {
  'web-dev-trends': {
    id: 'web-dev-trends',
    translations: {
      en: {
        title: 'Web Development Trends in 2023',
        content: `
          <p>The world of web development is constantly evolving, with new technologies, frameworks, and methodologies emerging every year. In 2023, several key trends are shaping how developers build modern web applications.</p>
          
          <h2>Rise of Jamstack Architecture</h2>
          <p>Jamstack (JavaScript, APIs, and Markup) continues to gain popularity due to its performance benefits, improved security, and better developer experience. By pre-rendering pages and serving them directly from a CDN, Jamstack sites deliver lightning-fast loading times and reduced server dependencies.</p>
          
          <h2>Increased Adoption of Web Components</h2>
          <p>Web Components are becoming more mainstream, allowing developers to create reusable, encapsulated UI components that work across different frameworks. This technology enables more modular and maintainable codebases.</p>
          
          <h2>AI-Enhanced Development Tools</h2>
          <p>Artificial intelligence is revolutionizing development workflows with tools that can generate code, identify bugs, and optimize performance. These AI assistants are helping developers work more efficiently and produce higher quality applications.</p>
          
          <h2>Progressive Web Apps (PWAs) Continue to Evolve</h2>
          <p>PWAs are bridging the gap between web and native applications, offering offline capabilities, push notifications, and app-like interfaces. In 2023, more businesses are investing in PWAs to provide users with seamless experiences across devices.</p>
          
          <h2>WebAssembly Opening New Possibilities</h2>
          <p>WebAssembly (Wasm) is enabling high-performance code execution in browsers, allowing developers to use languages like Rust, C++, and Go for web development. This technology is particularly valuable for computation-heavy applications like games, video editing, and data visualization.</p>
          
          <p>Staying up-to-date with these trends is essential for developers looking to build modern, efficient, and user-friendly web applications in today's rapidly changing digital landscape.</p>
        `,
        category: 'Web Development',
        readNext: 'Read Next Article',
        sharePost: 'Share This Post',
        tableOfContents: 'Table of Contents',
        authorPrefix: 'By',
        publishedPrefix: 'Published on',
        minuteRead: 'minute read',
        relatedArticles: 'Related Articles',
        tags: ['Web Development', 'JavaScript', 'Frontend', 'Technology Trends']
      },
      fr: {
        title: 'Tendances du développement web en 2023',
        content: `
          <p>Le monde du développement web évolue constamment, avec de nouvelles technologies, frameworks et méthodologies qui émergent chaque année. En 2023, plusieurs tendances clés façonnent la manière dont les développeurs construisent des applications web modernes.</p>
          
          <h2>Montée de l'architecture Jamstack</h2>
          <p>Jamstack (JavaScript, APIs et Markup) continue de gagner en popularité en raison de ses avantages en termes de performance, de sécurité améliorée et d'une meilleure expérience pour les développeurs. En pré-rendant les pages et en les servant directement depuis un CDN, les sites Jamstack offrent des temps de chargement ultra-rapides et réduisent les dépendances aux serveurs.</p>
          
          <h2>Adoption accrue des Web Components</h2>
          <p>Les Web Components deviennent plus courants, permettant aux développeurs de créer des composants d'interface utilisateur réutilisables et encapsulés qui fonctionnent avec différents frameworks. Cette technologie permet des bases de code plus modulaires et plus faciles à maintenir.</p>
          
          <h2>Outils de développement améliorés par l'IA</h2>
          <p>L'intelligence artificielle révolutionne les flux de travail de développement avec des outils qui peuvent générer du code, identifier des bugs et optimiser les performances. Ces assistants IA aident les développeurs à travailler plus efficacement et à produire des applications de meilleure qualité.</p>
          
          <h2>Les Progressive Web Apps (PWAs) continuent d'évoluer</h2>
          <p>Les PWA comblent le fossé entre les applications web et natives, offrant des fonctionnalités hors ligne, des notifications push et des interfaces similaires aux applications. En 2023, davantage d'entreprises investissent dans les PWA pour offrir aux utilisateurs des expériences fluides sur tous les appareils.</p>
          
          <h2>WebAssembly ouvre de nouvelles possibilités</h2>
          <p>WebAssembly (Wasm) permet l'exécution de code haute performance dans les navigateurs, permettant aux développeurs d'utiliser des langages comme Rust, C++ et Go pour le développement web. Cette technologie est particulièrement précieuse pour les applications à forte intensité de calcul comme les jeux, l'édition vidéo et la visualisation de données.</p>
          
          <p>Rester à jour avec ces tendances est essentiel pour les développeurs qui souhaitent construire des applications web modernes, efficaces et conviviales dans le paysage numérique en rapide évolution d'aujourd'hui.</p>
        `,
        category: 'Développement Web',
        readNext: 'Lire l\'article suivant',
        sharePost: 'Partager cet article',
        tableOfContents: 'Table des matières',
        authorPrefix: 'Par',
        publishedPrefix: 'Publié le',
        minuteRead: 'minutes de lecture',
        relatedArticles: 'Articles connexes',
        tags: ['Développement Web', 'JavaScript', 'Frontend', 'Tendances Technologiques']
      },
      ar: {
        title: 'اتجاهات تطوير الويب في 2023',
        content: `
          <p>يتطور عالم تطوير الويب باستمرار، مع ظهور تقنيات وأطر عمل ومنهجيات جديدة كل عام. في عام 2023، هناك العديد من الاتجاهات الرئيسية التي تشكل كيفية بناء المطورين لتطبيقات الويب الحديثة.</p>
          
          <h2>صعود بنية Jamstack</h2>
          <p>تستمر Jamstack (JavaScript وواجهات برمجة التطبيقات والتوصيف) في اكتساب شعبية بسبب فوائدها في الأداء والأمان المحسن وتجربة مطور أفضل. من خلال إعادة عرض الصفحات مسبقًا وتقديمها مباشرة من CDN، توفر مواقع Jamstack أوقات تحميل سريعة للغاية وتقليل اعتماديات الخادم.</p>
          
          <h2>زيادة اعتماد مكونات الويب</h2>
          <p>أصبحت مكونات الويب أكثر انتشارًا، مما يسمح للمطورين بإنشاء مكونات واجهة مستخدم قابلة لإعادة الاستخدام ومغلفة تعمل عبر أطر عمل مختلفة. تتيح هذه التقنية قواعد شفرة أكثر تعديلاً وأسهل في الصيانة.</p>
          
          <h2>أدوات تطوير محسنة بالذكاء الاصطناعي</h2>
          <p>يقوم الذكاء الاصطناعي بإحداث ثورة في مسارات عمل التطوير من خلال أدوات يمكنها إنشاء التعليمات البرمجية وتحديد الأخطاء وتحسين الأداء. تساعد هذه المساعدات الذكية المطورين على العمل بكفاءة أكبر وإنتاج تطبيقات ذات جودة أعلى.</p>
          
          <h2>تستمر تطبيقات الويب التقدمية (PWAs) في التطور</h2>
          <p>تعمل تطبيقات الويب التقدمية على سد الفجوة بين تطبيقات الويب والتطبيقات الأصلية، وتقدم إمكانات غير متصلة بالإنترنت وإشعارات الدفع وواجهات شبيهة بالتطبيقات. في عام 2023، تستثمر المزيد من الشركات في تطبيقات الويب التقدمية لتزويد المستخدمين بتجارب سلسة عبر الأجهزة.</p>
          
          <h2>WebAssembly يفتح إمكانيات جديدة</h2>
          <p>يتيح WebAssembly (Wasm) تنفيذ التعليمات البرمجية عالية الأداء في المتصفحات، مما يسمح للمطورين باستخدام لغات مثل Rust و C++ و Go لتطوير الويب. هذه التقنية ذات قيمة خاصة للتطبيقات كثيفة الحوسبة مثل الألعاب وتحرير الفيديو وتصور البيانات.</p>
          
          <p>البقاء على اطلاع بهذه الاتجاهات أمر ضروري للمطورين الذين يتطلعون إلى بناء تطبيقات ويب حديثة وفعالة وسهلة الاستخدام في المشهد الرقمي سريع التغير اليوم.</p>
        `,
        category: 'تطوير الويب',
        readNext: 'قراءة المقال التالي',
        sharePost: 'مشاركة هذا المنشور',
        tableOfContents: 'جدول المحتويات',
        authorPrefix: 'بواسطة',
        publishedPrefix: 'نُشر في',
        minuteRead: 'دقائق للقراءة',
        relatedArticles: 'مقالات ذات صلة',
        tags: ['تطوير الويب', 'جافا سكريبت', 'واجهة المستخدم', 'اتجاهات التكنولوجيا']
      }
    },
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2023-11-20',
    author: {
      en: 'Marie Laurent',
      fr: 'Marie Laurent',
      ar: 'مريم لوران'
    },
    readTime: 8,
    relatedPosts: ['ui-design-principles', 'responsive-design-tips', 'cybersecurity-basics']
  },
  // Additional blog posts would be defined here
};

export default async function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  const translations = await getTranslations(locale);
  
  // Check if the blog post exists
  const post = blogPostsData[slug];
  if (!post) {
    notFound();
  }
  
  // Get the localized content for the blog post
  const postContent = post.translations[locale as keyof typeof post.translations] || post.translations.en;
  
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
  
  // Get the localized author name
  const authorName = post.author[locale as keyof typeof post.author] || post.author.en;
  
  // Handle RTL for Arabic
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Generate table of contents from the content
  const headings = postContent.content.match(/<h2>(.*?)<\/h2>/g)?.map(heading => {
    const text = heading.replace('<h2>', '').replace('</h2>', '');
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return { text, id };
  }) || [];
  
  // Mock related posts data
  const relatedPosts = post.relatedPosts.slice(0, 2).map(relatedSlug => {
    const relatedPost = blogPostsData[relatedSlug];
    if (relatedPost) {
      return {
        id: relatedPost.id,
        title: relatedPost.translations[locale as keyof typeof relatedPost.translations]?.title || relatedPost.translations.en.title,
        image: relatedPost.image,
        date: relatedPost.date,
        author: relatedPost.author[locale as keyof typeof relatedPost.author] || relatedPost.author.en
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <main className={`min-h-screen ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations.nav} />
      
      <article className="bg-white py-16">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 text-sm font-medium text-white bg-primary rounded-full`}>
                {postContent.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
              {postContent.title}
            </h1>
            
            <div className="flex items-center text-neutral-light mb-8">
              <div className="flex items-center mr-6">
                <FaUser className="mr-2" />
                <span>{postContent.authorPrefix} {authorName}</span>
              </div>
              <div className="flex items-center mr-6">
                <FaCalendarAlt className="mr-2" />
                <span>{postContent.publishedPrefix} {formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <FaTag className="mr-2" />
                <span>{post.readTime} {postContent.minuteRead}</span>
              </div>
            </div>
            
            <div className="h-96 rounded-xl overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={postContent.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-8">
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-neutral-light/20 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-bold text-neutral-dark mb-4">
                      {postContent.tableOfContents}
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading, index) => (
                        <a 
                          key={index}
                          href={`#${heading.id}`}
                          className="block text-neutral hover:text-primary transition-colors"
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
                
                {/* Share Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-neutral-dark mb-4">
                    {postContent.sharePost}
                  </h3>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                      <FaFacebookF />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                      <FaTwitter />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                      <FaLinkedinIn />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                      <FaPinterestP />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="prose max-w-none prose-primary prose-headings:text-neutral-dark prose-p:text-neutral prose-a:text-primary" 
                dangerouslySetInnerHTML={{ __html: postContent.content }} />
              
              {/* Tags */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {postContent.tags.map((tag, index) => (
                    <a 
                      key={index}
                      href={`/${locale}/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-block px-3 py-1 text-sm bg-neutral-light/30 text-neutral-dark rounded-full hover:bg-neutral-light transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-neutral-dark mb-8">
                  {postContent.relatedArticles}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost: any, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                      <a href={`/${locale}/blog/${relatedPost.id}`} className="block">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center text-sm text-neutral-light mb-3">
                            <div className="flex items-center mr-4">
                              <FaCalendarAlt className="mr-2 text-neutral-light" />
                              <span>{formatDate(relatedPost.date)}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 text-neutral-dark hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          
                          <div className="flex justify-end">
                            <span className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors">
                              <span className="mr-2">{postContent.readNext}</span>
                              <span>→</span>
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
      
      <Footer locale={locale} translations={translations.footer} />
    </main>
  );
} 