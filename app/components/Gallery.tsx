"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Locale } from '../i18n/settings';

interface GalleryProps {
  locale: Locale;
  translations: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      campus: string;
      classrooms: string;
      events: string;
      students: string;
    };
  };
}

// Mock gallery data - in a real app, this would come from a CMS or database
const galleryImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg",
    alt: "Campus main building",
    category: "campus"
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg",
    alt: "Modern classroom",
    category: "classrooms"
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
    alt: "Students working on computers",
    category: "students"
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg",
    alt: "Graduation ceremony",
    category: "events"
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg",
    alt: "Computer lab",
    category: "classrooms"
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
    alt: "Campus garden",
    category: "campus"
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
    alt: "Workshop event",
    category: "events"
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/2422278/pexels-photo-2422278.jpeg",
    alt: "Study group",
    category: "students"
  }
];

export default function Gallery({ locale, translations }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const categories = [
    { id: 'all', label: translations.categories.all },
    { id: 'campus', label: translations.categories.campus },
    { id: 'classrooms', label: translations.categories.classrooms },
    { id: 'events', label: translations.categories.events },
    { id: 'students', label: translations.categories.students }
  ];
  
  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  const openLightbox = (index: number) => {
    const imageIndexInFiltered = filteredImages.findIndex(img => img.id === galleryImages[index].id);
    setCurrentImageIndex(imageIndexInFiltered);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };
  
  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % filteredImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + filteredImages.length) % filteredImages.length);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
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
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-neutral-light/50 text-neutral-dark hover:bg-neutral-light'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => openLightbox(galleryImages.findIndex(img => img.id === image.id))}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-neutral-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 bg-white/90 rounded-lg">
                  <span className="text-sm font-medium text-neutral-dark">{image.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Lightbox */}
        {lightboxOpen && filteredImages.length > 0 && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={closeLightbox} 
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div 
              className="relative max-w-4xl w-full mx-auto p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-0 right-0 -mt-12 -mr-12 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/30 transition-colors z-10 flex items-center justify-center"
                onClick={closeLightbox}
              >
                <FaTimes />
              </button>
              
              <div className="relative aspect-video bg-neutral-dark/50 rounded-lg overflow-hidden">
                <img 
                  src={filteredImages[currentImageIndex].src} 
                  alt={filteredImages[currentImageIndex].alt} 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              <div className="flex justify-between mt-4">
                <button 
                  className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <FaChevronLeft />
                </button>
                <div className="text-white/90 text-center">
                  <p className="font-medium">{filteredImages[currentImageIndex].alt}</p>
                  <p className="text-sm">{currentImageIndex + 1} / {filteredImages.length}</p>
                </div>
                <button 
                  className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 