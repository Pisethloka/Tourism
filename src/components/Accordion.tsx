import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
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
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left transition-colors duration-300"
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
              <div className="px-6 py-5 text-sm md:text-base leading-relaxed font-light text-brand-dark/85">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
