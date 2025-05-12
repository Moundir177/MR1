# MIRA ACADEMY Website

Website for MIRA ACADEMY, a professional training center based in Algeria. The website is multilingual, supporting French (primary), Arabic, and English.

## Features

- **Multilingual Support**: Full support for French, Arabic, and English with automatic language detection
- **Modern Design**: Responsive design with unique color scheme
- **Dynamic Content**: Courses, testimonials, and features sections
- **Interactive UI**: Animations and transitions for an engaging user experience

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For utility-first styling
- **Framer Motion**: For animations
- **next-intl**: For internationalization

## Project Structure

- `app/`: Next.js app directory structure
  - `[locale]/`: Dynamic routing for language selection
  - `components/`: Reusable UI components
  - `i18n/`: Internationalization settings
- `messages/`: Translation files for each language
- `public/`: Static assets

## Color Scheme

- **Primary**: Deep blue (#2E5EAA) - Represents trust, professionalism, and stability
- **Secondary**: Gold/Amber (#E6A919) - Signifies achievement, success, and excellence
- **Accent**: Vibrant red (#D64045) - Adds energy and draws attention to important elements
- **Neutral**: Dark blue-gray (#2B2D42) - For text and subtle elements

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mira-academy
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

The project can be deployed on any hosting platform that supports Node.js applications:

- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Developed for MIRA ACADEMY - A professional training center in Algeria. 