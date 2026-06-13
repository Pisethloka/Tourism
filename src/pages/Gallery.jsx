import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import heroAngkor from '../assets/hero_angkor.png';
import apsaraDancer from '../assets/apsara_dancer.png';
import galleryCorridor from '../assets/gallery_corridor.png';
import galleryBoat from '../assets/gallery_boat.png';
import galleryForest from '../assets/gallery_forest.png';
import galleryFruits from '../assets/gallery_fruits.png';
import bayonBuddha from '../assets/bayon_buddha.png';

export const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      src: apsaraDancer,
      category: 'CULTURAL',
      title: 'Sacred Apsara Dance',
      description: 'A traditional Cambodian Apsara dancer in classical gold costume executing precise gestures.',
    },
    {
      id: 2,
      src: galleryCorridor,
      category: 'DARK TOURISM',
      title: 'Monastery Walkway',
      description: 'Sunlight filtering through the brick-lined corridors of ancient ruins.',
    },
    {
      id: 3,
      src: galleryBoat,
      category: 'ECO TOURISM',
      title: 'Tonle Sap Sunrise',
      description: 'A traditional wooden boat floating on calm water at sunset.',
    },
    {
      id: 4,
      src: galleryForest,
      category: 'ECO TOURISM',
      title: 'Rainforest Canopy',
      description: 'Aerial view of a lush green tropical forest under morning mist.',
    },
    {
      id: 5,
      src: galleryFruits,
      category: 'CULTURAL',
      title: 'Cambodian Market Harvest',
      description: 'Baskets of fresh green mangoes, dragonfruits, and oranges at a local market.',
    },
    {
      id: 6,
      src: bayonBuddha,
      category: 'CULTURAL',
      title: 'Serene Face of Avalokiteshvara',
      description: 'Stone carving depicting the smiling Bayon face at Angkor.',
    }
  ];

  const categories = ['ALL PHOTOS', 'CULTURAL', 'DARK TOURISM', 'ECO TOURISM'];
  const [activeFilter, setActiveFilter] = useState('ALL PHOTOS');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'ALL PHOTOS' || item.category === activeFilter
  );

  const openLightbox = (id) => {
    const originalIndex = galleryItems.findIndex(item => item.id === id);
    setSelectedImageIndex(originalIndex);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(prev => 
        prev === 0 ? galleryItems.length - 1 : prev - 1
      );
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(prev => 
        prev === galleryItems.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="pb-20 bg-brand-cream animate-fade-in">
      {/* Hero Header */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroAngkor} alt="Angkor Wat Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-dark/50" />
        </div>
        <div className="relative z-10 text-center space-y-3 mt-12 animate-fade-in">
          <span className="text-brand-gold font-serif text-xs tracking-[0.25em] uppercase block">
            BEYOND THE SURFACE
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white tracking-widest font-normal uppercase">
            -- Gallery --
          </h1>
          <p className="font-serif text-lg md:text-2xl text-brand-cream-dark/95 tracking-wide italic">
            Cambodia Through the Lens
          </p>
        </div>
      </section>

      {/* Categories Filter Links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="flex justify-center items-center space-x-8 text-[10px] md:text-xs tracking-[0.2em] font-semibold text-brand-dark/60 uppercase border-y border-brand-gold/15 py-4">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`transition-colors duration-300 relative py-1 cursor-pointer ${
                  isActive ? 'text-brand-gold font-bold' : 'hover:text-brand-dark'
                }`}
              >
                <span>{cat}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of exactly 6 images */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item.id)}
            className="group relative rounded-none overflow-hidden aspect-square border border-brand-gold/10 hover:border-brand-gold/40 shadow-sm cursor-pointer bg-white transition-all duration-300"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Eye overlay on hover */}
            <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-center text-white space-y-1 p-4">
                <span className="text-[9px] font-bold tracking-widest uppercase text-brand-gold-light">{item.category}</span>
                <h3 className="font-serif text-sm font-bold tracking-wide uppercase">{item.title}</h3>
                <div className="pt-2 flex items-center justify-center text-xs text-brand-gold space-x-1">
                  <Eye size={12} />
                  <span>VIEW FULLSCREEN</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom text */}
      <div className="text-center pt-16">
        <span className="text-[10px] tracking-[0.3em] font-bold text-brand-gold-dark uppercase block">
          MORE STORIES TO UNCOVER
        </span>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-2">
            <div className="text-brand-cream-dark">
              <h4 className="font-serif text-lg md:text-xl text-brand-gold">
                {galleryItems[selectedImageIndex].title}
              </h4>
              <p className="text-xs text-brand-cream-dark/50 uppercase tracking-widest mt-0.5">
                Category: {galleryItems[selectedImageIndex].category}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cream-dark hover:text-brand-gold hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Stage */}
          <div className="flex-grow flex items-center justify-center relative w-full max-w-7xl mx-auto my-4">
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cream-dark hover:text-brand-gold hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <div 
              className="max-h-[70vh] max-w-[90%] overflow-hidden rounded-none border border-brand-gold/20 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[selectedImageIndex].src}
                alt={galleryItems[selectedImageIndex].title}
                className="max-h-[70vh] object-contain mx-auto"
              />
            </div>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cream-dark hover:text-brand-gold hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center w-full max-w-3xl mx-auto pb-4">
            <p className="text-sm md:text-base font-light text-brand-cream-dark/80 leading-relaxed">
              {galleryItems[selectedImageIndex].description}
            </p>
            <div className="flex justify-center items-center space-x-2 mt-4 text-xs text-brand-cream-dark/40 font-mono">
              <span>{selectedImageIndex + 1}</span>
              <span>/</span>
              <span>{galleryItems.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
