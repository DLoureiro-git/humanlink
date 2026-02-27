'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const avatarColors = [
  'from-accent-blue to-accent-cyan',      // João (uses Atlas = blue)
  'from-accent-green to-emerald-500',      // Marta (uses Nova = green)
  'from-accent-purple to-accent-violet',   // Ricardo (uses Atlas/generic = purple)
  'from-accent-violet to-pink-500',        // Ana (uses Spark = violet)
];

const avatarInitials = ['J', 'M', 'R', 'A'];

const personalityColors: Record<string, string> = {
  atlas: 'bg-accent-blue/15 border-accent-blue/30 text-accent-blue',
  nova: 'bg-accent-green/15 border-accent-green/30 text-accent-green',
  spark: 'bg-accent-violet/15 border-accent-violet/30 text-accent-violet',
  sage: 'bg-accent-amber/15 border-accent-amber/30 text-accent-amber',
};

interface TestimonialCardProps {
  index: number;
  quote: string;
  name: string;
  role: string;
  badge: string;
  personality: string;
}

function TestimonialCard({ index, quote, name, role, badge, personality }: TestimonialCardProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Card */}
      <div className="relative h-full rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.06] p-8 overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.1]">
        {/* Glassmorphism shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

        {/* Top accent glow */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)`,
          }}
        />

        {/* Quote icon */}
        <div className="mb-6">
          <Quote
            className="w-8 h-8 text-accent-purple/20"
            strokeWidth={1}
            fill="rgba(124, 58, 237, 0.05)"
          />
        </div>

        {/* Quote text */}
        <p className="text-white/70 font-body text-base md:text-lg leading-relaxed italic mb-8">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-gradient-to-r from-accent-purple/30 to-transparent mb-6" />

        {/* Author */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[index]} flex items-center justify-center flex-shrink-0`}>
            <span className="text-sm font-heading font-bold text-white">
              {avatarInitials[index]}
            </span>
            {/* Ring */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
          </div>

          {/* Name, role, badge */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-heading text-sm font-semibold text-white">
                {name}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-[10px] font-body font-medium uppercase tracking-wider">
                {badge}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-body font-medium uppercase tracking-wider ${personalityColors[personality] ?? ''}`}>
                {personality}
              </span>
            </div>
            <span className="text-xs text-white/30 font-body capitalize mt-0.5 block">
              {role}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const t = useTranslations('testimonials');

  // Access the testimonials array from translations
  const testimonials = [0, 1, 2, 3].map((i) => ({
    quote: t(`items.${i}.quote`),
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    badge: t(`items.${i}.badge`),
    personality: t(`items.${i}.personality`),
  }));

  return (
    <section id="testimonials" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-purple/3 rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-1.5 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-accent-purple/40"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            ))}
          </div>

          <p className="text-sm text-white/30 font-body uppercase tracking-[0.2em]">
            Beta testers
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((item, i) => (
            <TestimonialCard
              key={i}
              index={i}
              quote={item.quote}
              name={item.name}
              role={item.role}
              badge={item.badge}
              personality={item.personality}
            />
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-20 mx-auto w-full max-w-sm h-px"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
