'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function WhatIsIt() {
  const t = useTranslations('whatIsIt');

  return (
    <section
      id="what"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center">
        {/* Animated connection lines visual */}
        <motion.div
          className="mb-16 relative w-20 h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Central glowing orb */}
          <div className="absolute inset-0 rounded-full bg-accent-purple/20 blur-xl animate-pulse-glow" />
          <div className="absolute inset-2 rounded-full bg-surface border border-border flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_20px_rgba(124,58,237,0.6)]" />
          </div>

          {/* Orbiting connection dots */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={deg}
              className="absolute w-1.5 h-1.5 rounded-full bg-accent-purple/60"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [
                  Math.cos(((deg + 0) * Math.PI) / 180) * 36,
                  Math.cos(((deg + 360) * Math.PI) / 180) * 36,
                ],
                y: [
                  Math.sin(((deg + 0) * Math.PI) / 180) * 36,
                  Math.sin(((deg + 360) * Math.PI) / 180) * 36,
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
            />
          ))}

          {/* Connection lines from center */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 80 80"
          >
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <motion.line
                key={`line-${deg}`}
                x1="40"
                y1="40"
                x2={40 + Math.cos((deg * Math.PI) / 180) * 30}
                y2={40 + Math.sin((deg * Math.PI) / 180) * 30}
                stroke="rgba(124, 58, 237, 0.15)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Text content */}
        <div className="max-w-3xl text-center">
          <motion.h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </motion.h2>

          <motion.p
            className="mt-8 text-lg md:text-xl text-white/50 leading-relaxed font-body max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-20 w-full max-w-md h-px"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
