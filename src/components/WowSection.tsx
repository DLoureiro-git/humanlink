'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

function ParticleGrid() {
  const particles = useMemo(() => {
    const cols = 20;
    const rows = 10;
    const items: { id: string; x: number; y: number; delay: number; duration: number }[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        items.push({
          id: `${row}-${col}`,
          x: (col / (cols - 1)) * 100,
          y: (row / (rows - 1)) * 100,
          delay: (col * 0.08 + row * 0.12) % 3,
          duration: 2 + ((col + row) % 4) * 0.5,
        });
      }
    }
    return items;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-25">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r="0.15"
            fill="#7C3AED"
            initial={{ opacity: 0.05 }}
            animate={{
              opacity: [0.05, 0.7, 0.05],
              r: [0.08, 0.22, 0.08],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function FlowingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal flowing data streams */}
      {[18, 33, 50, 67, 82].map((y, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-px w-full"
          style={{ top: `${y}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.12, 0] }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-accent-purple to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 6 + i,
              delay: i * 0.6,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      ))}

      {/* Vertical flowing data streams */}
      {[15, 35, 50, 65, 85].map((x, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-px h-full"
          style={{ left: `${x}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0] }}
          transition={{
            duration: 5 + i * 0.4,
            delay: i * 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="w-full bg-gradient-to-b from-transparent via-accent-violet to-transparent"
            style={{ height: '35%' }}
            animate={{ y: ['-35%', '285%'] }}
            transition={{
              duration: 8 + i,
              delay: i * 0.9,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function WowSection() {
  const t = useTranslations('wow');

  return (
    <section className="relative py-40 md:py-52 overflow-hidden">
      {/* Animated background layers */}
      <ParticleGrid />
      <FlowingLines />

      {/* Central radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0.03) 35%, transparent 65%)',
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Secondary glow ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-accent-purple/5"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Decorative top element */}
        <motion.div
          className="mx-auto mb-10 w-12 h-12 relative"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 rounded-full bg-accent-purple/20 blur-xl animate-pulse-glow" />
          <div className="absolute inset-1 rounded-full bg-surface border border-accent-purple/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_16px_rgba(124,58,237,0.8)]" />
          </div>
        </motion.div>

        <motion.h2
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </motion.h2>

        <motion.p
          className="mt-8 text-lg sm:text-xl md:text-2xl text-white/45 font-body leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {t('description')}
        </motion.p>

        {/* Decorative accent line */}
        <motion.div
          className="mt-14 mx-auto h-px w-40"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
