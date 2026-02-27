'use client';

import { useTranslations } from 'next-intl';
import { Download, Monitor, Apple, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DownloadPage() {
  const t = useTranslations('download');

  const platforms = [
    {
      id: 'windows',
      name: 'Windows',
      icon: Monitor,
      version: t('coming_soon'),
      requirements: 'Windows 10+',
      available: false,
    },
    {
      id: 'macos',
      name: 'macOS',
      icon: Apple,
      version: t('coming_soon'),
      requirements: 'macOS 12+',
      available: false,
    },
  ];

  const steps = [
    { num: '1', title: t('step1_title'), desc: t('step1_desc') },
    { num: '2', title: t('step2_title'), desc: t('step2_desc') },
    { num: '3', title: t('step3_title'), desc: t('step3_desc') },
    { num: '4', title: t('step4_title'), desc: t('step4_desc') },
  ];

  return (
    <div className="max-w-3xl">
      <h1 className="mb-2 font-heading text-2xl font-bold text-white">{t('title')}</h1>
      <p className="mb-10 font-body text-white/50">{t('subtitle')}</p>

      {/* Platform cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]">
                <p.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">{p.name}</h3>
                <p className="font-body text-xs text-white/40">{p.requirements}</p>
              </div>
            </div>

            {p.available ? (
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-purple px-4 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-accent-purple/80">
                <Download className="h-4 w-4" />
                {t('download_btn')}
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <AlertCircle className="h-4 w-4 text-white/30" />
                <span className="font-body text-sm text-white/30">{t('coming_soon')}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Installation steps */}
      <div className="rounded-2xl border border-white/[0.06] bg-surface p-6">
        <h2 className="mb-6 font-heading text-lg font-semibold text-white">{t('how_to_install')}</h2>
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-purple/15 text-accent-purple">
                <span className="font-heading text-sm font-bold">{s.num}</span>
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-white">{s.title}</h3>
                <p className="font-body text-sm text-white/40">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System requirements */}
      <div className="mt-6 rounded-2xl border border-white/[0.06] bg-surface p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-white">{t('requirements')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: 'OS', value: 'Windows 10+ / macOS 12+' },
            { label: 'RAM', value: '4 GB' },
            { label: t('disk'), value: '500 MB' },
            { label: 'Internet', value: t('optional') },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400/60" />
              <span className="font-body text-sm text-white/60">
                <span className="text-white/80">{r.label}:</span> {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
