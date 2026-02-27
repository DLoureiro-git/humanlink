'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('hero');

  function handleScroll(href: string) {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* ---- Animated background orbs ---- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary purple orb -- top left area */}
        <motion.div
          className="absolute h-[600px] w-[600px] rounded-full bg-accent-purple/20 blur-[120px]"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ top: '5%', left: '15%' }}
        />
        {/* Cyan orb -- bottom right area */}
        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full bg-accent-cyan/15 blur-[120px]"
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 60, -40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ bottom: '10%', right: '10%' }}
        />
        {/* Small violet orb -- center */}
        <motion.div
          className="absolute h-[350px] w-[350px] rounded-full bg-accent-violet/10 blur-[100px]"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }}
        />
        {/* Very subtle blue orb -- upper right */}
        <motion.div
          className="absolute h-[400px] w-[400px] rounded-full bg-accent-blue/[0.08] blur-[130px]"
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 30, -60, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ top: '15%', right: '20%' }}
        />
      </div>

      {/* ---- Subtle grid overlay ---- */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="group relative inline-flex items-center gap-2 rounded-full border border-accent-purple/20 bg-accent-purple/[0.06] px-4 py-1.5 backdrop-blur-sm">
            {/* Badge glow */}
            <div className="absolute inset-0 rounded-full bg-accent-purple/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            <Zap className="relative h-3.5 w-3.5 text-accent-purple" />
            <span className="relative font-body text-xs font-medium tracking-wide text-accent-purple/90">
              {t('badge')}
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
            {t('headline')}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-white/50 sm:text-lg md:text-xl md:leading-relaxed"
        >
          {t('subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primary CTA */}
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-body text-sm font-medium text-white transition-all duration-300 sm:px-8 sm:py-4 sm:text-base"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-purple to-accent-violet transition-all duration-500 group-hover:from-accent-purple group-hover:via-accent-violet group-hover:to-accent-cyan" />
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-accent-cyan opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">{t('cta_primary')}</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          {/* Secondary CTA */}
          <button
            onClick={() => handleScroll('#demo')}
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 font-body text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white sm:px-8 sm:py-4 sm:text-base"
          >
            <Play className="h-4 w-4 transition-colors duration-300 group-hover:text-accent-purple" />
            <span>{t('cta_secondary')}</span>
          </button>
        </motion.div>

        {/* Bottom fade line -- visual separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-20 h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

      {/* ---- Bottom gradient fade into next section ---- */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
