'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Apple, Monitor, Terminal } from 'lucide-react';
import { useRouter } from '@/i18n/routing';

function useDetectedOS() {
  const [os, setOs] = useState<'macos' | 'windows' | 'linux' | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) setOs('macos');
    else if (ua.includes('win')) setOs('windows');
    else if (ua.includes('linux')) setOs('linux');
  }, []);

  return os;
}

const osConfig = {
  macos: { label: 'macOS', icon: Apple },
  windows: { label: 'Windows', icon: Monitor },
  linux: { label: 'Linux', icon: Terminal },
};

export default function Hero() {
  const t = useTranslations('hero');
  const router = useRouter();
  const detectedOS = useDetectedOS();
  const [email, setEmail] = useState('');

  function handleScroll(href: string) {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      router.push(`/signup?email=${encodeURIComponent(email.trim())}`);
    }
  }

  const OsIcon = detectedOS ? osConfig[detectedOS].icon : null;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* ---- Animated background orbs ---- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute h-[600px] w-[600px] rounded-full bg-accent-purple/20 blur-[120px]"
          animate={{ x: [0, 100, -50, 0], y: [0, -80, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ top: '5%', left: '15%' }}
        />
        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full bg-accent-cyan/15 blur-[120px]"
          animate={{ x: [0, -70, 40, 0], y: [0, 60, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ bottom: '10%', right: '10%' }}
        />
        <motion.div
          className="absolute h-[350px] w-[350px] rounded-full bg-accent-violet/10 blur-[100px]"
          animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }}
        />
        <motion.div
          className="absolute h-[400px] w-[400px] rounded-full bg-accent-blue/[0.08] blur-[130px]"
          animate={{ x: [0, -40, 60, 0], y: [0, 30, -60, 0] }}
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

        {/* Email form + Device detection */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          {/* Email input + button as a single pill */}
          <form
            onSubmit={handleSubmit}
            className="group relative flex w-full max-w-md items-center overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.04] p-1.5 backdrop-blur-sm transition-all duration-300 focus-within:border-accent-purple/40 focus-within:bg-white/[0.06]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('email_placeholder')}
              className="flex-1 bg-transparent px-5 py-2.5 font-body text-sm text-white placeholder-white/30 outline-none sm:text-base"
            />
            <button
              type="submit"
              className="relative flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 font-body text-sm font-medium text-white transition-all duration-300 sm:px-7 sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-purple to-accent-violet transition-all duration-500 group-hover:from-accent-purple group-hover:via-accent-violet group-hover:to-accent-cyan" />
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-accent-cyan opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
              <span className="relative z-10">{t('cta_start')}</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* Device detected badge */}
          {detectedOS && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-accent-green/[0.06] px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
              </span>
              {OsIcon && <OsIcon className="h-3.5 w-3.5 text-accent-green/80" />}
              <span className="font-body text-xs font-medium tracking-wide text-accent-green/90">
                {t('device_detected')}: {osConfig[detectedOS].label}
              </span>
            </motion.div>
          )}

          {/* Secondary CTA */}
          <button
            onClick={() => handleScroll('#demo')}
            className="group mt-2 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 font-body text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white sm:px-8 sm:py-4 sm:text-base"
          >
            <Play className="h-4 w-4 transition-colors duration-300 group-hover:text-accent-purple" />
            <span>{t('cta_secondary')}</span>
          </button>
        </motion.div>

        {/* Bottom fade line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-20 h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
