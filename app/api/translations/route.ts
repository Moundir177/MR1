import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { aboutContent } from '@/app/data/about-content';

export async function GET(request: NextRequest) {
  // Get locale from query params
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  
  try {
    // Validate that locale is one of the supported locales
    if (!['en', 'fr', 'ar'].includes(locale)) {
      // Return default English translations for invalid locales
      const defaultFilePath = path.join(process.cwd(), 'messages', 'en.json');
      const defaultFileContents = fs.readFileSync(defaultFilePath, 'utf8');
      
      // Clone content instead of passing it directly to avoid React rendering issues
      const safeContent = JSON.parse(JSON.stringify(aboutContent.en || {}));
      
      return NextResponse.json({
        translations: JSON.parse(defaultFileContents),
        content: safeContent
      });
    }
    
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Use type assertion to safely access aboutContent with the locale key
    const localeKey = locale as keyof typeof aboutContent;
    
    // Create a deep clone of the content to avoid React rendering issues with object references
    const safeContent = JSON.parse(JSON.stringify(aboutContent[localeKey] || aboutContent.en || {}));
    
    // Make sure to return content as a separate property, not embedded in translations
    return NextResponse.json({
      translations: JSON.parse(fileContents),
      content: safeContent
    });
  } catch (error) {
    console.error(`Error handling translations for ${locale}:`, error);
    // Return a 500 error response
    return NextResponse.json({ error: 'Failed to load translations' }, { status: 500 });
  }
} 