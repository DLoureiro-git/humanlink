'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, LayoutDashboard, Shield, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from './auth/AuthProvider';

const navLinks = [
  { key: 'features', href: '#features' },
  { key: 'personalities', href: '#personalities' },
  { key: 'pricing', href: '#pricing' },
  { key: 'faq', href: '#faq' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const { user, isAdmin, loading, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan opacity-80 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan">
                <span className="font-heading text-sm font-bold text-white">H</span>
              </div>
            </div>
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
                <span className="relative z-10">{t(link.key)}</span>
                <div className="absolute inset-0 rounded-lg bg-white/[0.04] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Auth buttons */}
            {!loading && (
              <>
                {user ? (
                  /* User menu dropdown */
                  <div className="relative hidden md:block" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-sm text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
                      <ChevronDown className={`h-3 w-3 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-white/[0.08] bg-surface shadow-2xl"
                        >
                          <Link
                            href="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 font-body text-sm text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </Link>
                          {isAdmin && (
                            <Link
                              href="/admin"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 font-body text-sm text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                            >
                              <Shield className="h-4 w-4" />
                              Admin
                            </Link>
                          )}
                          <div className="border-t border-white/[0.06]" />
                          <button
                            onClick={async () => {
                              setUserMenuOpen(false);
                              await signOut();
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 font-body text-sm text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Login + CTA buttons */
                  <div className="hidden items-center gap-2 md:flex">
                    <Link
                      href="/login"
                      className="rounded-full px-4 py-2 font-body text-sm text-white/60 transition-colors hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="group relative overflow-hidden rounded-full px-5 py-2 font-body text-sm font-medium text-white transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-purple/80 transition-all duration-300 group-hover:from-accent-purple group-hover:to-accent-cyan" />
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
                      <span className="relative z-10">{t('cta')}</span>
                    </Link>
                  </div>
                )}
              </>
            )}

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
                className="mt-4 w-full space-y-3"
              >
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full rounded-full bg-gradient-to-r from-accent-purple to-accent-purple/80 px-8 py-4 text-center font-body text-base font-medium text-white transition-all hover:from-accent-purple hover:to-accent-cyan"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={async () => {
                        setMobileOpen(false);
                        await signOut();
                      }}
                      className="w-full rounded-full border border-white/10 px-8 py-4 text-center font-body text-base text-white/60 transition-colors hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full rounded-full bg-gradient-to-r from-accent-purple to-accent-purple/80 px-8 py-4 text-center font-body text-base font-medium text-white transition-all hover:from-accent-purple hover:to-accent-cyan"
                    >
                      {t('cta')}
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full rounded-full border border-white/10 px-8 py-4 text-center font-body text-base text-white/60 transition-colors hover:text-white"
                    >
                      Login
                    </Link>
                  </>
                )}
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
