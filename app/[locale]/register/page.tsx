import { Locale } from '../../i18n/settings';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock, FaUser, FaPhoneAlt } from 'react-icons/fa';

interface RegisterPageProps {
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

// Registration page content in all three languages
const registerContent = {
  fr: {
    title: "Créer un compte",
    subtitle: "Rejoignez notre communauté d'apprentissage pour accéder à tous nos cours",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse e-mail",
    phone: "Téléphone",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    registerButton: "S'inscrire",
    alreadyAccount: "Vous avez déjà un compte ?",
    login: "Se connecter",
    orContinueWith: "Ou continuer avec",
    googleLogin: "Continuer avec Google",
    facebookLogin: "Continuer avec Facebook",
    appleLogin: "Continuer avec Apple",
    termsAndConditions: "En vous inscrivant, vous acceptez nos",
    terms: "Conditions d'utilisation",
    and: "et",
    privacyPolicy: "Politique de confidentialité",
    emailPlaceholder: "Entrez votre adresse e-mail",
    passwordPlaceholder: "Entrez votre mot de passe",
    firstNamePlaceholder: "Entrez votre prénom",
    lastNamePlaceholder: "Entrez votre nom",
    phonePlaceholder: "Entrez votre numéro de téléphone",
    confirmPasswordPlaceholder: "Confirmez votre mot de passe",
    passwordRequirements: "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial"
  },
  ar: {
    title: "إنشاء حساب",
    subtitle: "انضم إلى مجتمع التعلم لدينا للوصول إلى جميع دوراتنا",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    registerButton: "إنشاء حساب",
    alreadyAccount: "لديك حساب بالفعل؟",
    login: "تسجيل الدخول",
    orContinueWith: "أو واصل باستخدام",
    googleLogin: "المتابعة باستخدام جوجل",
    facebookLogin: "المتابعة باستخدام فيسبوك",
    appleLogin: "المتابعة باستخدام آبل",
    termsAndConditions: "بالتسجيل، فإنك توافق على",
    terms: "شروط الاستخدام",
    and: "و",
    privacyPolicy: "سياسة الخصوصية",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordPlaceholder: "أدخل كلمة المرور",
    firstNamePlaceholder: "أدخل اسمك الأول",
    lastNamePlaceholder: "أدخل اسم عائلتك",
    phonePlaceholder: "أدخل رقم هاتفك",
    confirmPasswordPlaceholder: "تأكيد كلمة المرور",
    passwordRequirements: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، بما في ذلك حرف كبير، وحرف صغير، ورقم، وحرف خاص"
  },
  en: {
    title: "Create an Account",
    subtitle: "Join our learning community to access all our courses",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone",
    password: "Password",
    confirmPassword: "Confirm Password",
    registerButton: "Register",
    alreadyAccount: "Already have an account?",
    login: "Login",
    orContinueWith: "Or continue with",
    googleLogin: "Continue with Google",
    facebookLogin: "Continue with Facebook",
    appleLogin: "Continue with Apple",
    termsAndConditions: "By registering, you agree to our",
    terms: "Terms of Service",
    and: "and",
    privacyPolicy: "Privacy Policy",
    emailPlaceholder: "Enter your email address",
    passwordPlaceholder: "Enter your password",
    firstNamePlaceholder: "Enter your first name",
    lastNamePlaceholder: "Enter your last name",
    phonePlaceholder: "Enter your phone number",
    confirmPasswordPlaceholder: "Confirm your password",
    passwordRequirements: "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
  }
};

export default async function RegisterPage({ params: { locale } }: RegisterPageProps) {
  const translations = await getTranslations(locale);
  const content = registerContent[locale as keyof typeof registerContent] || registerContent.en;
  
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={dir}>
      <Navigation locale={locale} translations={translations.nav || {}} />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
            <p className="text-gray-600">{content.subtitle}</p>
          </div>
          
          <form className="space-y-6" action="#" method="POST">
            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.firstName}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    placeholder={content.firstNamePlaceholder}
                    className={`appearance-none block w-full px-3 py-3 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.lastName}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    placeholder={content.lastNamePlaceholder}
                    className={`appearance-none block w-full px-3 py-3 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                </div>
              </div>
            </div>
            
            {/* Email and Phone fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.phone}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhoneAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={content.phonePlaceholder}
                    className={`appearance-none block w-full px-3 py-3 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                </div>
              </div>
            </div>
            
            {/* Password fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    autoComplete="new-password"
                    required
                    placeholder={content.passwordPlaceholder}
                    className={`appearance-none block w-full px-3 py-3 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.confirmPassword}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder={content.confirmPasswordPlaceholder}
                    className={`appearance-none block w-full px-3 py-3 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              {content.passwordRequirements}
            </div>
            
            {/* Terms and conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                {content.termsAndConditions} <Link href="#" className="text-primary hover:text-primary-dark">{content.terms}</Link> {content.and} <Link href="#" className="text-primary hover:text-primary-dark">{content.privacyPolicy}</Link>
              </label>
            </div>
            
            {/* Register button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {content.registerButton}
              </button>
            </div>
          </form>
          
          {/* Social registration options */}
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
          
          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {content.alreadyAccount}{' '}
              <Link href={`/${locale}/login`} className="font-medium text-primary hover:text-primary-dark">
                {content.login}
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer locale={locale} translations={translations} />
    </div>
  );
} 