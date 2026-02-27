'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Download, Users, Rocket, Play } from 'lucide-react';

const steps = [
  { key: 'step1', icon: Download, number: '01' },
  { key: 'step2', icon: Users, number: '02' },
  { key: 'step3', icon: Rocket, number: '03' },
] as const;

function ConnectorLine({ index }: { index: number }) {
  return (
    <motion.div
      className="hidden md:flex items-center justify-center flex-shrink-0 w-16 lg:w-24"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.2,
        ease: 'easeOut',
      }}
    >
      <div className="w-full relative flex items-center">
        {/* Dashed line */}
        <div className="w-full h-px border-t border-dashed border-accent-purple/30" />
        {/* Animated dot traveling along the line */}
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(124,58,237,0.6)]"
          animate={{ x: [0, 60, 0] }}
          transition={{
            duration: 3,
            delay: index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}

function MobileConnector({ index }: { index: number }) {
  return (
    <motion.div
      className="flex md:hidden items-center justify-center h-10"
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
    >
      <div className="h-full w-px border-l border-dashed border-accent-purple/30 relative">
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(124,58,237,0.6)] -left-[2.5px]"
          animate={{ y: [0, 32, 0] }}
          transition={{
            duration: 2.5,
            delay: index * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Demo() {
  const t = useTranslations('demo');

  return (
    <section id="demo" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent-purple/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-body font-medium mb-6">
            3 passos
          </span>
        </motion.div>

        {/* Steps - Horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          {steps.map((step, i) => (
            <div key={step.key} className="contents">
              {/* Step card */}
              <motion.div
                className="flex flex-col items-center text-center max-w-[240px] w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Step number */}
                <span className="text-xs font-body font-semibold text-accent-purple/50 tracking-[0.2em] uppercase mb-4">
                  {step.number}
                </span>

                {/* Icon container */}
                <div className="relative mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center relative z-10"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(124, 58, 237, 0.4)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <step.icon className="w-6 h-6 text-accent-purple" strokeWidth={1.5} />
                  </motion.div>
                  {/* Glow behind icon */}
                  <div className="absolute inset-0 rounded-2xl bg-accent-purple/10 blur-xl" />
                </div>

                {/* Text */}
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-sm text-white/40 font-body leading-relaxed">
                  {t(`${step.key}.description`)}
                </p>
              </motion.div>

              {/* Connector between steps */}
              {i < steps.length - 1 && (
                <>
                  <ConnectorLine index={i} />
                  <MobileConnector index={i} />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Video placeholder */}
        <motion.div
          className="mt-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="relative aspect-video rounded-2xl bg-surface border border-border overflow-hidden group cursor-pointer">
            {/* Subtle inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-violet/5" />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent-purple/20 blur-xl scale-150"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Button */}
                <div className="relative w-16 h-16 rounded-full bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-accent-purple/20 group-hover:border-accent-purple/50 transition-all duration-300">
                  <Play
                    className="w-6 h-6 text-accent-purple ml-0.5"
                    strokeWidth={1.5}
                    fill="rgba(124, 58, 237, 0.3)"
                  />
                </div>
              </motion.div>

              <span className="text-sm text-white/30 font-body group-hover:text-white/50 transition-colors duration-300">
                {t('videoPlaceholder')}
              </span>
            </div>

            {/* Bottom reflection/glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
