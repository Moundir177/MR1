# Installation Guide for MIRA ACADEMY Website

This guide will help you set up the MIRA ACADEMY website project on your local environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14.x or higher)
- npm or yarn package manager
- Git

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd mira-academy
```

## Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn
```

This will install all the required dependencies defined in the package.json file.

## Step 3: Development Environment

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the Next.js development server at http://localhost:3000.

## Step 4: Building for Production

When you're ready to deploy, build the project:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Common Issues and Solutions

### Missing Dependencies

If you encounter errors related to missing dependencies, try:

```bash
npm install --force
# or
yarn install --force
```

### Port Conflicts

If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- -p 3001
# or
yarn dev -p 3001
```

### Language Support

Make sure the messages folder contains all the necessary translation files (fr.json, ar.json, en.json). If any are missing, the application might not function correctly.

## Project Structure

- `app/`: Contains the main Next.js application code
- `messages/`: Contains language translation files
- `public/`: Stores static assets like images and fonts
- `tailwind.config.js`: Tailwind CSS configuration
- `next.config.js`: Next.js configuration
- `package.json`: Project dependencies and scripts

## Additional Setup

### Environment Variables

Create a `.env.local` file in the root directory if you need to add environment variables:

```
# Example environment variables
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Adding New Languages

To add a new language:

1. Create a new translation file in the `messages/` directory (e.g., `de.json`)
2. Add the language to the locales array in `app/i18n/settings.ts`
3. Update the `localeNames` and `localeDirs` records in the same file 