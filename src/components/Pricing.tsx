'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Pricing() {
  const t = useTranslations('pricing');
  const includes = t.raw('includes') as string[];

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">
            {t('title')}
          </h2>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          {/* Outer glow wrapper */}
          <div className="relative group">
            {/* Animated gradient border */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent-purple via-accent-violet to-accent-purple opacity-70 blur-[1px] group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-accent-purple/40 via-accent-violet/20 to-accent-purple/40 blur-md group-hover:blur-lg transition-all duration-500" />

            {/* Card body */}
            <div className="relative bg-surface rounded-2xl p-8 md:p-10">
              {/* Badge */}
              <div className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-purple/15 border border-accent-purple/30 text-accent-purple text-sm font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('badge')}
                </span>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-6xl md:text-7xl font-bold text-white tracking-tight">
                    {t('price')}
                  </span>
                  <span className="text-lg text-white/50 font-body">
                    {t('period')}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

              {/* Includes list */}
              <ul className="space-y-4 mb-10">
                {includes.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.08,
                      ease: 'easeOut',
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-purple/15 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent-purple" />
                    </div>
                    <span className="text-white/80 font-body text-base">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA button */}
              <Link
                href="/signup"
                className="group/btn relative block w-full text-center py-4 px-8 rounded-xl font-heading font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]"
              >
                {/* Button gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-violet transition-all duration-300 group-hover/btn:from-accent-violet group-hover/btn:to-accent-purple" />
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10">{t('cta')}</span>
              </Link>

              {/* Disclaimer */}
              <p className="text-center text-white/40 text-sm mt-5 font-body">
                {t('disclaimer')}
              </p>

              {/* API key note */}
              <p className="text-center text-white/30 text-xs mt-3 font-body leading-relaxed max-w-sm mx-auto">
                {t('api_note')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
