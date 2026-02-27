'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { key: 'features', href: '#features' },
  { key: 'personalities', href: '#personalities' },
  { key: 'pricing', href: '#pricing' },
  { key: 'faq', href: '#faq' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.06] bg-[#0A0A0B]/80 backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-[72px] lg:px-8">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative z-10 flex items-center gap-2.5"
          >
            {/* Logo mark */}
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan opacity-80 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan">
                <span className="font-heading text-sm font-bold text-white">
                  H
                </span>
              </div>
            </div>
            {/* Logo text */}
            <span className="font-heading text-lg font-semibold tracking-tight text-white">
              Human
              <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">
                Link
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="group relative rounded-lg px-4 py-2 font-body text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                <span className="relative z-10">
                  {t(link.key)}
                </span>
                <div className="absolute inset-0 rounded-lg bg-white/[0.04] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          {/* Right side: Language switcher + CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* CTA button */}
            <button
              onClick={() => handleNavClick('#pricing')}
              className="group relative hidden overflow-hidden rounded-full px-5 py-2 font-body text-sm font-medium text-white transition-all duration-300 md:block"
            >
              {/* Button gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-purple/80 transition-all duration-300 group-hover:from-accent-purple group-hover:to-accent-cyan" />
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
              <span className="relative z-10">{t('cta')}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-2 px-6"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full rounded-2xl px-6 py-4 text-center font-heading text-2xl font-medium text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {t(link.key)}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="mt-4 w-full"
              >
                <button
                  onClick={() => handleNavClick('#pricing')}
                  className="w-full rounded-full bg-gradient-to-r from-accent-purple to-accent-purple/80 px-8 py-4 font-body text-base font-medium text-white transition-all hover:from-accent-purple hover:to-accent-cyan"
                >
                  {t('cta')}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-6"
              >
                <LanguageSwitcher />
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
