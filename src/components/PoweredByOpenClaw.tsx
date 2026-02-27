'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Eye, Users, Lock } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface PointConfig {
  key: number;
  icon: LucideIcon;
  accent: string;
  accentRgb: string;
}

const points: PointConfig[] = [
  {
    key: 0,
    icon: Eye,
    accent: '#7C3AED',
    accentRgb: '124, 58, 237',
  },
  {
    key: 1,
    icon: Users,
    accent: '#06B6D4',
    accentRgb: '6, 182, 212',
  },
  {
    key: 2,
    icon: Lock,
    accent: '#10B981',
    accentRgb: '16, 185, 129',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function PoweredByOpenClaw() {
  const t = useTranslations('poweredBy');

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/[0.02] rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-surface/30" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-base md:text-lg text-white/45 font-body leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          {t('subtitle')}
        </motion.p>

        {/* 3 Feature points */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {points.map((point) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={point.key}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative"
              >
                <div className="relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 group-hover:border-white/[0.12]">
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at top, rgba(${point.accentRgb}, 0.06) 0%, transparent 70%)`,
                    }}
                  />

                  {/* Top border glow line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(${point.accentRgb}, 0.4), transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-7 lg:p-8 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="relative mb-5">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-border/40 bg-surface-light/50 transition-all duration-500">
                        <div
                          className="absolute w-12 h-12 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                          style={{
                            backgroundColor: `rgba(${point.accentRgb}, 0.15)`,
                          }}
                        />
                        <Icon
                          className="relative w-5 h-5 transition-colors duration-500 text-white/60 group-hover:text-white"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
                      {t(`points.${point.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                      {t(`points.${point.key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Link */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://github.com/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-white/35 hover:text-white/60 transition-colors duration-300"
          >
            {t('link')}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
