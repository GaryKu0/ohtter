// components/PillNavigation.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface PillNavigationProps {
  headings: Heading[];
}

export default function PillNavigation({ headings }: PillNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;

    if (totalHeight <= 0) {
      setScrollPercent(100);
      return;
    }

    let percent = (scrollPos / totalHeight) * 100;
    percent = Math.min(Math.max(percent, 0), 100);

    setScrollPercent(Math.round(percent));
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed w-full top-8 flex justify-center z-50">
        <motion.div
          className="relative bg-black/60 backdrop-blur-md text-white shadow-lg border border-gray-800 rounded-2xl overflow-hidden flex flex-col"
          layout="position"
          initial={{ width: 'auto' }}
          animate={{
            width: isOpen ? '320px' : '240px',
            height: isOpen ? '16rem' : '3.6rem',
            borderRadius: '1.75rem',
            padding: isOpen ? '1.5rem' : '0.8rem',
            gap: isOpen ? '0.75rem' : '0.4rem',
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-8 h-8 flex-shrink-0">
              <svg className="absolute inset-0 rotate-[-90deg]" viewBox="0 0 36 36">
                <circle
                  className="text-gray-700"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <motion.circle
                  className="text-white"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="transparent"
                  r="16"
                  cx="18"
                  cy="18"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  animate={{ strokeDashoffset: 100 - (scrollPercent / 100) * 100 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            <div
              className="flex-grow cursor-pointer w-fit"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="font-medium"
              >
                Index
              </motion.span>
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FiChevronDown size={20} />
            </motion.div>

            <div className="bg-gray-600 text-white text-sm min-w-[3.5rem] text-center px-3 py-1 rounded-full">
              {scrollPercent}%
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 relative flex-grow overflow-hidden"
              >
                <div className="relative h-full">
                  <div
                    className="h-full overflow-y-auto custom-scrollbar"
                  >
                    {headings.map((heading) => (
                      <div
                        key={heading.id}
                        className="cursor-pointer py-2 px-4 rounded-lg transition-colors text-sm text-gray-400 hover:bg-gray-700/70"
                        onClick={() => handleItemClick(heading.id)}
                      >
                        {heading.text}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}