'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Brain, Mic, Eye, Zap, Globe, Shield } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface FeatureConfig {
  key: string;
  icon: LucideIcon;
  accent: string;
  accentRgb: string;
}

const features: FeatureConfig[] = [
  {
    key: 'memory',
    icon: Brain,
    accent: '#8B5CF6',
    accentRgb: '139, 92, 246',
  },
  {
    key: 'voice',
    icon: Mic,
    accent: '#3B82F6',
    accentRgb: '59, 130, 246',
  },
  {
    key: 'screen',
    icon: Eye,
    accent: '#06B6D4',
    accentRgb: '6, 182, 212',
  },
  {
    key: 'automation',
    icon: Zap,
    accent: '#F59E0B',
    accentRgb: '245, 158, 11',
  },
  {
    key: 'browse',
    icon: Globe,
    accent: '#10B981',
    accentRgb: '16, 185, 129',
  },
  {
    key: 'privacy',
    icon: Shield,
    accent: '#EF4444',
    accentRgb: '239, 68, 68',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function Features() {
  const t = useTranslations('features');

  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent-cyan/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-accent-purple/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.key}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative"
              >
                <div className="relative h-full rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-border">
                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at top left, rgba(${feature.accentRgb}, 0.08) 0%, transparent 70%)`,
                    }}
                  />

                  {/* Top border glow line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(${feature.accentRgb}, 0.5), transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-7 lg:p-8">
                    {/* Icon */}
                    <div className="relative mb-5">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-xl border border-border/40 bg-surface-light/50 transition-all duration-500"
                        style={{
                          boxShadow: 'none',
                        }}
                      >
                        {/* Icon glow on hover */}
                        <div
                          className="absolute w-12 h-12 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                          style={{
                            backgroundColor: `rgba(${feature.accentRgb}, 0.15)`,
                          }}
                        />
                        <Icon
                          className="relative w-5 h-5 transition-colors duration-500 text-white/60 group-hover:text-white"
                          style={{
                            filter: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
                      {t(`${feature.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                      {t(`${feature.key}.description`)}
                    </p>
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
