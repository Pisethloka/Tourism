import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-xl transition-all duration-300 overflow-hidden ${
              isOpen 
                ? 'bg-brand-cream-dark/60 border-brand-gold shadow-md' 
                : 'bg-white/40 border-brand-gold/15 hover:border-brand-gold/45'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-base md:text-lg font-semibold text-brand-dark pr-4">
                {item.title}
              </span>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center bg-brand-gold/10 text-brand-gold transition-transform duration-300 shrink-0 ${
                isOpen ? 'rotate-180 bg-brand-gold text-brand-dark' : ''
              }`}>
                <ChevronDown size={18} />
              </span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100 border-t border-brand-gold/10' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 py-5 text-sm md:text-base leading-relaxed font-normal text-brand-dark/95">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
