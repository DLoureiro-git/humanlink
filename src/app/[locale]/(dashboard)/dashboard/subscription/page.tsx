'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase-browser';
import { Check, CreditCard, Sparkles, Loader2, ExternalLink } from 'lucide-react';

type License = {
  id: string;
  license_key: string;
  status: string;
  personality_choice: string | null;
  created_at: string;
  cancellation_scheduled: boolean | null;
  cancellation_date: string | null;
};

export default function SubscriptionPage() {
  const t = useTranslations('subscription');
  const { user } = useAuth();
  const supabase = createClient();
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchLicense = async () => {
      const { data } = await supabase
        .from('licenses')
        .select('id, license_key, status, personality_choice, created_at, cancellation_scheduled, cancellation_date')
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      setLicense(data);
      setLoading(false);
    };
    fetchLicense();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  const includes = [
    t('include_install'),
    t('include_personalities'),
    t('include_updates'),
    t('include_privacy'),
    t('include_new'),
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 font-heading text-2xl font-bold text-white">{t('title')}</h1>
      <p className="mb-10 font-body text-white/50">{t('subtitle')}</p>

      {license ? (
        /* Active subscription */
        <div className="space-y-6">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.05] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h2 className="font-heading text-base font-semibold text-white">{t('active_plan')}</h2>
                <p className="font-body text-sm text-white/50">{t('plan_name')}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="font-body text-xs text-white/40">{t('status_label')}</span>
                <p className="font-body text-sm capitalize text-green-400">{license.status}</p>
              </div>
              <div>
                <span className="font-body text-xs text-white/40">{t('since')}</span>
                <p className="font-body text-sm text-white/70">
                  {new Date(license.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {license.cancellation_scheduled && (
              <div className="mt-4 rounded-lg bg-yellow-500/10 px-4 py-2">
                <p className="font-body text-sm text-yellow-400">
                  {t('cancelling')} {license.cancellation_date ? new Date(license.cancellation_date).toLocaleDateString() : ''}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-surface p-6">
            <h3 className="mb-4 font-heading text-sm font-medium text-white/50">{t('manage')}</h3>
            <p className="font-body text-sm text-white/40">{t('manage_desc')}</p>
          </div>
        </div>
      ) : (
        /* No subscription — pricing card */
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-accent-purple/30 bg-surface p-8">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-purple/10 blur-[60px]" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-accent-purple" />
                <span className="font-body text-sm font-medium text-accent-purple">{t('recommended')}</span>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-heading text-5xl font-bold text-white">{t('price')}</span>
                <span className="font-body text-white/40">{t('period')}</span>
              </div>

              <div className="mb-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <ul className="mb-8 space-y-3">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-purple/15">
                      <Check className="h-3 w-3 text-accent-purple" />
                    </div>
                    <span className="font-body text-sm text-white/70">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-purple px-6 py-4 font-heading text-base font-semibold text-white opacity-80 transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                {t('subscribe_btn')}
              </button>
              <p className="mt-3 text-center font-body text-xs text-white/30">{t('coming_soon_note')}</p>
            </div>
          </div>

          <p className="text-center font-body text-sm text-white/30">{t('disclaimer')}</p>
        </div>
      )}
    </div>
  );
}
