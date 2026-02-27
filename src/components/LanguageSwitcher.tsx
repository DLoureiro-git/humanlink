'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

const locales = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
] as const;

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) ?? locales[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(code: string) {
    setIsOpen(false);
    router.replace(pathname, { locale: code as 'pt' | 'en' | 'es' | 'fr' });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
        aria-label="Select language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="font-body text-xs font-medium tracking-wide">
          {currentLocale.label}
        </span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[100px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#111113]/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                  l.code === locale
                    ? 'bg-accent-purple/10 text-accent-purple'
                    : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span className="font-body text-xs font-medium tracking-wider">
                  {l.label}
                </span>
                {l.code === locale && (
                  <motion.div
                    layoutId="locale-indicator"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-purple"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
