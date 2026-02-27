'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase-browser';
import { Link } from '@/i18n/routing';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth');
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback`,
    });

    if (error) {
      setError(t('error_reset'));
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="w-full max-w-sm text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-400" />
        <h1 className="mb-2 font-heading text-2xl font-bold text-white">{t('reset_sent_title')}</h1>
        <p className="mb-6 font-body text-sm text-white/50">{t('reset_sent_desc')}</p>
        <Link
          href="/login"
          className="font-body text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
        >
          {t('back_to_login')}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-2 text-center font-heading text-2xl font-bold text-white">
        {t('forgot_title')}
      </h1>
      <p className="mb-8 text-center font-body text-sm text-white/50">
        {t('forgot_subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block font-body text-sm text-white/70">{t('email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-accent-purple/50 focus:bg-white/[0.06]"
            placeholder={t('email_placeholder')}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-2 text-center font-body text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-xl py-3 font-heading text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-violet transition-all duration-300 group-hover:from-accent-violet group-hover:to-accent-purple" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t('reset_button')}
          </span>
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-white/40">
        <Link href="/login" className="text-accent-purple hover:text-accent-purple/80 transition-colors">
          {t('back_to_login')}
        </Link>
      </p>
    </div>
  );
}
