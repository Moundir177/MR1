/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Updated colors for MIRA ACADEMY - Modern color theme
        primary: {
          DEFAULT: '#E84A7F', // Pink
          light: '#FF7DA8',
          dark: '#C4285B',
        },
        secondary: {
          DEFAULT: '#3D5A80', // Rich blue instead of dark gray
          light: '#6B8CAE',
          dark: '#2A3F58',
        },
        accent: {
          DEFAULT: '#98C1D9', // Soft blue-gray for accents
          light: '#C3DCE9',
          dark: '#70A0BC',
        },
        neutral: {
          DEFAULT: '#293241', // Blue-tinted dark gray for text
          light: '#8E9CAB',
          dark: '#1C232E',
        },
        background: {
          DEFAULT: '#F7F9FC', // Subtle blue-tinted white
          dark: '#E8ECF2',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
        heading: ['Georgia', 'Times New Roman', 'Times', 'serif'],
        arabic: ['Tahoma', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'footer-gradient': 'linear-gradient(to bottom, #293241, #1c232e)',
        'card-gradient': 'linear-gradient(to right bottom, #f7f9fc, #e8ecf2)',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'elegant': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}; 