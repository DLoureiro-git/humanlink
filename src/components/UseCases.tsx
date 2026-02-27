'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Users,
  Calendar,
  HelpCircle,
  Briefcase,
  Mail,
  Search,
  FileText,
  BarChart,
  MessageSquare,
  Repeat,
  Lightbulb,
  Palette,
  TrendingUp,
  PenTool,
  FolderOpen,
  Headphones,
  UserPlus,
  Wrench,
  CalendarCheck,
} from 'lucide-react';

const tabs = ['student', 'freelancer', 'entrepreneur', 'creator', 'enterprise'] as const;

type Tab = (typeof tabs)[number];

interface TabConfig {
  emoji: string;
  color: string;
  colorRgb: string;
  icons: LucideIcon[];
}

const tabConfig: Record<Tab, TabConfig> = {
  student: {
    emoji: '\u{1F393}',
    color: 'accent-blue',
    colorRgb: '59, 130, 246',
    icons: [BookOpen, HelpCircle, Calendar, Users],
  },
  freelancer: {
    emoji: '\u{1F4BC}',
    color: 'accent-green',
    colorRgb: '16, 185, 129',
    icons: [Briefcase, Mail, Search, FileText],
  },
  entrepreneur: {
    emoji: '\u{1F680}',
    color: 'accent-purple',
    colorRgb: '124, 58, 237',
    icons: [BarChart, MessageSquare, Repeat, Lightbulb],
  },
  creator: {
    emoji: '\u{1F3A8}',
    color: 'accent-violet',
    colorRgb: '139, 92, 246',
    icons: [Palette, TrendingUp, PenTool, FolderOpen],
  },
  enterprise: {
    emoji: '\u{1F3E2}',
    color: 'accent-amber',
    colorRgb: '245, 158, 11',
    icons: [Headphones, UserPlus, Wrench, CalendarCheck],
  },
};

const contentVariants = {
  initial: { opacity: 0, x: 20, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.25,
      ease: 'easeIn' as const,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut' as const,
    },
  },
};

export default function UseCases() {
  const t = useTranslations('useCases');
  const [activeTab, setActiveTab] = useState<Tab>('student');

  const active = tabConfig[activeTab];

  return (
    <section id="usecases" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent-violet/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent-blue/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
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

          <p className="mt-5 text-lg md:text-xl text-white/50 font-body max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex justify-center">
            <div className="flex gap-2 overflow-x-auto pb-2 px-1 max-w-full scrollbar-hide">
              {tabs.map((tab) => {
                const config = tabConfig[tab];
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      relative flex items-center gap-2 px-4 py-2.5 rounded-full
                      font-body text-sm font-medium whitespace-nowrap
                      transition-all duration-300 ease-out cursor-pointer
                      border shrink-0
                      ${
                        isActive
                          ? 'text-white border-transparent'
                          : 'text-white/50 border-white/[0.06] bg-white/[0.03] hover:text-white/70 hover:bg-white/[0.06] hover:border-white/[0.1]'
                      }
                    `}
                    style={
                      isActive
                        ? {
                            backgroundColor: `rgba(${config.colorRgb}, 0.15)`,
                            boxShadow: `0 0 20px rgba(${config.colorRgb}, 0.1), inset 0 1px 0 rgba(${config.colorRgb}, 0.2)`,
                            borderColor: `rgba(${config.colorRgb}, 0.3)`,
                          }
                        : undefined
                    }
                  >
                    <span className="text-base leading-none">{config.emoji}</span>
                    <span>{t(`tabs.${tab}.label`)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[0, 1, 2, 3].map((index) => {
              const Icon = active.icons[index];

              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  variants={cardVariants}
                  className="group relative"
                >
                  <div
                    className="relative h-full rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-400 hover:border-transparent hover:bg-white/[0.05]"
                    style={{
                      ['--card-accent' as string]: `rgba(${active.colorRgb}, 0.3)`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `rgba(${active.colorRgb}, 0.25)`;
                      (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(${active.colorRgb}, 0.05)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '';
                      (e.currentTarget as HTMLElement).style.backgroundColor = '';
                    }}
                  >
                    {/* Subtle top border glow on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(${active.colorRgb}, 0.4), transparent)`,
                      }}
                    />

                    <div className="relative p-5 flex gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.03] transition-all duration-400 group-hover:border-transparent"
                          style={{}}
                        >
                          <div
                            className="absolute w-10 h-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                            style={{
                              backgroundColor: `rgba(${active.colorRgb}, 0.12)`,
                            }}
                          />
                          <Icon
                            className="relative w-[18px] h-[18px] transition-colors duration-400 text-white/50 group-hover:text-white/80"
                            style={{}}
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <h4 className="font-heading text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors duration-300 mb-1">
                          {t(`tabs.${activeTab}.items.${index}.title`)}
                        </h4>
                        <p className="font-body text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                          {t(`tabs.${activeTab}.items.${index}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
