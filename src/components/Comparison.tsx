'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function Comparison() {
  const t = useTranslations('comparison');
  const itemCount = 6;

  return (
    <section id="comparison" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-purple/3 rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
        </motion.div>

        {/* Desktop: Side by side columns */}
        <div className="hidden md:block">
          {/* Column headers */}
          <motion.div
            className="grid grid-cols-2 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl bg-red-500/[0.07] border border-red-500/10 px-6 py-4 text-center">
              <span className="font-heading text-lg font-semibold text-red-400/80">
                {t('without_label')}
              </span>
            </div>
            <div className="rounded-xl bg-green-500/[0.07] border border-green-500/10 px-6 py-4 text-center">
              <span className="font-heading text-lg font-semibold text-accent-green">
                {t('with_label')}
              </span>
            </div>
          </motion.div>

          {/* Comparison rows */}
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {Array.from({ length: itemCount }).map((_, i) => (
              <motion.div
                key={i}
                variants={rowVariants}
                className="grid grid-cols-2 gap-4"
              >
                {/* Without */}
                <div className="flex items-center gap-4 rounded-xl bg-red-500/[0.03] border border-red-500/[0.06] px-5 py-4 transition-colors duration-300 hover:bg-red-500/[0.05]">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20">
                    <X className="w-4 h-4 text-red-400/70" />
                  </div>
                  <p className="font-body text-sm text-white/50 leading-relaxed">
                    {t(`items.${i}.without`)}
                  </p>
                </div>

                {/* With */}
                <div className="flex items-center gap-4 rounded-xl bg-green-500/[0.03] border border-green-500/[0.06] px-5 py-4 transition-colors duration-300 hover:bg-green-500/[0.05]">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20">
                    <Check className="w-4 h-4 text-accent-green" />
                  </div>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    {t(`items.${i}.with`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: Stacked cards */}
        <motion.div
          className="md:hidden space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {Array.from({ length: itemCount }).map((_, i) => (
            <motion.div
              key={i}
              variants={rowVariants}
              className="rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-sm overflow-hidden"
            >
              {/* Without */}
              <div className="flex items-start gap-3 px-5 py-4 bg-red-500/[0.03] border-b border-white/[0.04]">
                <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 mt-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                  <X className="w-3.5 h-3.5 text-red-400/70" />
                </div>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  {t(`items.${i}.without`)}
                </p>
              </div>

              {/* With */}
              <div className="flex items-start gap-3 px-5 py-4 bg-green-500/[0.03]">
                <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 mt-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <Check className="w-3.5 h-3.5 text-accent-green" />
                </div>
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  {t(`items.${i}.with`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-14 text-center font-body text-base md:text-lg text-white/40 italic"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t('tagline')}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mt-10 mx-auto w-full max-w-md h-px"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
