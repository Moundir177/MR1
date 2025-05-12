import { Locale } from '@/app/i18n/settings';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock } from 'react-icons/fa';

interface LoginPageProps {
  params: {
    locale: Locale;
  };
}

async function getTranslations(locale: Locale) {
  try {
    if (!['en', 'fr', 'ar'].includes(locale)) {
      const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
      const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
      return JSON.parse(defaultFileContents);
    }
    
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading translations for ${locale}:`, error);
    const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
    const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
    return JSON.parse(defaultFileContents);
  }
}

// Login page content in all three languages
const loginContent = {
  fr: {
    title: "Connexion",
    subtitle: "Accédez à votre compte pour continuer votre apprentissage",
    email: "Adresse e-mail",
    password: "Mot de passe",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié ?",
    loginButton: "Se connecter",
    noAccount: "Vous n'avez pas de compte ?",
    register: "S'inscrire",
    orContinueWith: "Ou continuer avec",
    googleLogin: "Continuer avec Google",
    facebookLogin: "Continuer avec Facebook",
    appleLogin: "Continuer avec Apple",
    emailPlaceholder: "Entrez votre adresse e-mail",
    passwordPlaceholder: "Entrez votre mot de passe"
  },
  ar: {
    title: "تسجيل الدخول",
    subtitle: "الوصول إلى حسابك لمواصلة التعلم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    loginButton: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    register: "إنشاء حساب",
    orContinueWith: "أو واصل باستخدام",
    googleLogin: "المتابعة باستخدام جوجل",
    facebookLogin: "المتابعة باستخدام فيسبوك",
    appleLogin: "المتابعة باستخدام آبل",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordPlaceholder: "أدخل كلمة المرور"
  },
  en: {
    title: "Login",
    subtitle: "Access your account to continue learning",
    email: "Email Address",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    register: "Register",
    orContinueWith: "Or continue with",
    googleLogin: "Continue with Google",
    facebookLogin: "Continue with Facebook",
    appleLogin: "Continue with Apple",
    emailPlaceholder: "Enter your email address",
    passwordPlaceholder: "Enter your password"
  }
};

export default async function LoginPage({ params: { locale } }: LoginPageProps) {
  const translations = await getTranslations(locale);
  const content = loginContent[locale as keyof typeof loginContent] || loginContent.en;
  
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations.nav || {}} />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
            <p className="text-gray-600">{content.subtitle}</p>
          </div>
          
          <form className="space-y-6" action="#" method="POST">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {content.email}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={content.emailPlaceholder}
                  className={`appearance-none block w-full px-3 py-3 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                />
              </div>
            </div>
            
            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {content.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder={content.passwordPlaceholder}
                  className={`appearance-none block w-full px-3 py-3 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                />
              </div>
            </div>
            
            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {content.rememberMe}
                </label>
              </div>
              
              <div className="text-sm">
                <Link href="#" className="font-medium text-primary hover:text-primary-dark">
                  {content.forgotPassword}
                </Link>
              </div>
            </div>
            
            {/* Login button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {content.loginButton}
              </button>
            </div>
          </form>
          
          {/* Social login options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {content.orContinueWith}
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <button
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <FaGoogle className="h-5 w-5 text-red-600" />
                </button>
              </div>
              
              <div>
                <button
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <FaFacebook className="h-5 w-5 text-blue-600" />
                </button>
              </div>
              
              <div>
                <button
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <FaApple className="h-5 w-5 text-black" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Register link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {content.noAccount}{' '}
              <Link href={`/${locale}/register`} className="font-medium text-primary hover:text-primary-dark">
                {content.register}
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer locale={locale} translations={translations} />
    </div>
  );
} 