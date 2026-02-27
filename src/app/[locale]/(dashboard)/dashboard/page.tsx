'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase-browser';
import { Link } from '@/i18n/routing';
import {
  Copy, Check, Monitor, Power, Loader2,
  Download, CreditCard, Sparkles, ArrowRight,
  Zap, Shield, Cpu, Clock
} from 'lucide-react';

type License = {
  id: string;
  license_key: string;
  status: string;
  personality_choice: string | null;
  device_fingerprint: string | null;
  device_name: string | null;
  activated_at: string | null;
  last_heartbeat: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { user } = useAuth();
  const supabase = createClient();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [deactivating, setDeactivating] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchLicense = async () => {
      const { data } = await supabase
        .from('licenses')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      setLicense(data);
      setLoading(false);
    };
    fetchLicense();
  }, [user]);

  async function copyKey() {
    if (!license) return;
    await navigator.clipboard.writeText(license.license_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function deactivateDevice() {
    if (!license) return;
    setDeactivating(true);
    await fetch('/api/v1/license/deactivate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        license_key: license.license_key,
        device_fingerprint: license.device_fingerprint,
      }),
    });
    setLicense({ ...license, device_fingerprint: null, device_name: null });
    setDeactivating(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    active: 'bg-green-500/15 text-green-400 border-green-500/30',
    suspended: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    revoked: 'bg-red-500/15 text-red-400 border-red-500/30',
    expired: 'bg-white/10 text-white/50 border-white/20',
  };

  // No license — onboarding state
  if (!license) {
    return (
      <div className="max-w-4xl">
        <h1 className="mb-2 font-heading text-2xl font-bold text-white">{t('welcome')}</h1>
        <p className="mb-10 font-body text-white/50">{t('welcome_sub')}</p>

        {/* Quick start steps */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            { step: '1', icon: CreditCard, title: t('step_subscribe'), desc: t('step_subscribe_desc'), href: '/dashboard/subscription', color: 'from-accent-purple to-accent-violet' },
            { step: '2', icon: Download, title: t('step_download'), desc: t('step_download_desc'), href: '/dashboard/download', color: 'from-accent-violet to-accent-cyan' },
            { step: '3', icon: Zap, title: t('step_activate'), desc: t('step_activate_desc'), href: '#', color: 'from-accent-cyan to-accent-blue' },
          ].map((s) => (
            <Link
              key={s.step}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.02]"
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color}`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div className="mb-1 flex items-center gap-2">
                <span className="font-heading text-xs font-bold text-white/30">{t('step')} {s.step}</span>
              </div>
              <h3 className="mb-1 font-heading text-base font-semibold text-white">{s.title}</h3>
              <p className="font-body text-sm text-white/40">{s.desc}</p>
              <ArrowRight className="absolute right-4 top-6 h-4 w-4 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-white/40" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-accent-purple/20 bg-accent-purple/[0.05] p-8 text-center">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-accent-purple" />
          <h2 className="mb-2 font-heading text-xl font-bold text-white">{t('no_license')}</h2>
          <p className="mb-6 font-body text-sm text-white/50">{t('no_license_desc')}</p>
          <Link
            href="/dashboard/subscription"
            className="inline-flex items-center gap-2 rounded-xl bg-accent-purple px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-accent-purple/80"
          >
            {t('subscribe_cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Has license — main dashboard
  return (
    <div className="max-w-4xl">
      <h1 className="mb-8 font-heading text-2xl font-bold text-white">{t('title')}</h1>

      {/* Quick stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.06] bg-surface p-5">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent-purple" />
            <span className="font-body text-xs text-white/40">{t('status')}</span>
          </div>
          <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor[license.status] ?? statusColor.expired}`}>
            {license.status}
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-surface p-5">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-violet" />
            <span className="font-body text-xs text-white/40">{t('personality')}</span>
          </div>
          <p className="font-heading text-sm font-semibold capitalize text-white">
            {license.personality_choice ?? '—'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-surface p-5">
          <div className="mb-2 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-accent-cyan" />
            <span className="font-body text-xs text-white/40">{t('device')}</span>
          </div>
          <p className="truncate font-body text-sm text-white">
            {license.device_name ?? t('no_device')}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-surface p-5">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent-blue" />
            <span className="font-body text-xs text-white/40">{t('last_seen')}</span>
          </div>
          <p className="font-body text-sm text-white/70">
            {license.last_heartbeat ? new Date(license.last_heartbeat).toLocaleDateString() : '—'}
          </p>
        </div>
      </div>

      {/* License Key */}
      <div className="mb-6 rounded-2xl border border-white/[0.06] bg-surface p-6">
        <h2 className="mb-4 font-heading text-sm font-medium uppercase tracking-wider text-white/40">
          {t('license_key')}
        </h2>
        <div className="flex items-center gap-3">
          <code className="flex-1 rounded-xl bg-white/[0.04] px-4 py-3 font-mono text-sm text-white/80">
            {license.license_key}
          </code>
          <button
            onClick={copyKey}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Device */}
      {license.device_fingerprint && (
        <div className="mb-6 rounded-2xl border border-white/[0.06] bg-surface p-6">
          <h2 className="mb-4 font-heading text-sm font-medium uppercase tracking-wider text-white/40">
            {t('active_device')}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-accent-purple" />
              <div>
                <p className="font-body text-sm text-white">{license.device_name ?? t('unknown_device')}</p>
                <p className="font-body text-xs text-white/40">
                  {t('last_seen')}: {license.last_heartbeat ? new Date(license.last_heartbeat).toLocaleString() : '—'}
                </p>
              </div>
            </div>
            <button
              onClick={deactivateDevice}
              disabled={deactivating}
              className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-body text-xs text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
            >
              {deactivating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Power className="h-3 w-3" />}
              {t('deactivate')}
            </button>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/download"
          className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-surface p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.02]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-violet">
            <Download className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-white">{t('download_app')}</p>
            <p className="font-body text-xs text-white/40">{t('download_app_desc')}</p>
          </div>
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-surface p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.02]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-white">{t('settings')}</p>
            <p className="font-body text-xs text-white/40">{t('settings_desc')}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
