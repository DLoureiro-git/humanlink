'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, MessageCircle, Lightbulb, Compass } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface PersonalityConfig {
  key: string;
  name: string;
  icon: LucideIcon;
  accent: string;
  accentRgb: string;
  borderHover: string;
  shadowHover: string;
  glowBg: string;
  gradientFrom: string;
}

const personalities: PersonalityConfig[] = [
  {
    key: 'atlas',
    name: 'Atlas',
    icon: Briefcase,
    accent: '#3B82F6',
    accentRgb: '59, 130, 246',
    borderHover: 'group-hover:border-accent-blue/50',
    shadowHover: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]',
    glowBg: 'bg-accent-blue',
    gradientFrom: 'from-accent-blue/10',
  },
  {
    key: 'nova',
    name: 'Nova',
    icon: MessageCircle,
    accent: '#10B981',
    accentRgb: '16, 185, 129',
    borderHover: 'group-hover:border-accent-green/50',
    shadowHover: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]',
    glowBg: 'bg-accent-green',
    gradientFrom: 'from-accent-green/10',
  },
  {
    key: 'spark',
    name: 'Spark',
    icon: Lightbulb,
    accent: '#8B5CF6',
    accentRgb: '139, 92, 246',
    borderHover: 'group-hover:border-accent-violet/50',
    shadowHover: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    glowBg: 'bg-accent-violet',
    gradientFrom: 'from-accent-violet/10',
  },
  {
    key: 'sage',
    name: 'Sage',
    icon: Compass,
    accent: '#F59E0B',
    accentRgb: '245, 158, 11',
    borderHover: 'group-hover:border-accent-amber/50',
    shadowHover: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]',
    glowBg: 'bg-accent-amber',
    gradientFrom: 'from-accent-amber/10',
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export default function Personalities() {
  const t = useTranslations('personalities');

  return (
    <section id="personalities" className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-blue/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-violet/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 text-lg md:text-xl text-white/50 font-body max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {personalities.map((personality) => {
            const Icon = personality.icon;

            return (
              <motion.div
                key={personality.key}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative"
              >
                <div
                  className={`
                    relative h-full rounded-2xl
                    border border-border/60 ${personality.borderHover}
                    ${personality.shadowHover}
                    bg-surface/60 backdrop-blur-xl
                    transition-all duration-500 ease-out
                    overflow-hidden
                  `}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className={`
                      absolute inset-0 opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      bg-gradient-to-br ${personality.gradientFrom} to-transparent
                    `}
                  />

                  {/* Card content */}
                  <div className="relative p-8 lg:p-10">
                    {/* Icon + Name row */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="relative flex items-center justify-center w-12 h-12 rounded-xl border border-border/40 bg-surface-light/50"
                      >
                        {/* Icon glow */}
                        <div
                          className={`absolute inset-0 rounded-xl ${personality.glowBg}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
                        />
                        <Icon
                          className="relative w-5 h-5 transition-colors duration-500"
                          style={{ color: personality.accent }}
                        />
                      </div>

                      <h3
                        className="font-heading text-2xl font-bold transition-all duration-500"
                        style={{
                          textShadow: 'none',
                        }}
                      >
                        <span
                          className="group-hover:drop-shadow-[0_0_12px_var(--glow)]"
                          style={
                            {
                              '--glow': `rgba(${personality.accentRgb}, 0.5)`,
                              color: personality.accent,
                            } as React.CSSProperties
                          }
                        >
                          {personality.name}
                        </span>
                      </h3>
                    </div>

                    {/* Tagline */}
                    <p
                      className="text-sm font-medium tracking-wide uppercase mb-4 font-body"
                      style={{ color: `rgba(${personality.accentRgb}, 0.7)` }}
                    >
                      {t(`${personality.key}.tagline`)}
                    </p>

                    {/* Description */}
                    <p className="text-white/50 leading-relaxed font-body mb-8">
                      {t(`${personality.key}.description`)}
                    </p>

                    {/* Chat bubble example */}
                    <div className="relative">
                      <div
                        className="rounded-xl border px-5 py-4 font-body text-sm leading-relaxed"
                        style={{
                          borderColor: `rgba(${personality.accentRgb}, 0.15)`,
                          backgroundColor: `rgba(${personality.accentRgb}, 0.05)`,
                        }}
                      >
                        {/* Chat bubble tail */}
                        <div
                          className="absolute -top-2 left-6 w-4 h-4 rotate-45 border-l border-t"
                          style={{
                            borderColor: `rgba(${personality.accentRgb}, 0.15)`,
                            backgroundColor: `rgba(${personality.accentRgb}, 0.05)`,
                          }}
                        />
                        <span className="relative text-white/70 italic">
                          &ldquo;{t(`${personality.key}.example`)}&rdquo;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
