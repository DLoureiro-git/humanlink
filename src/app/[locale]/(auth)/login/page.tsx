'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase-browser';
import { Link, useRouter } from '@/i18n/routing';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(t('error_invalid'));
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-2 text-center font-heading text-2xl font-bold text-white">
        {t('login_title')}
      </h1>
      <p className="mb-8 text-center font-body text-sm text-white/50">
        {t('login_subtitle')}
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

        <div>
          <label className="mb-1.5 block font-body text-sm text-white/70">{t('password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-body text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-accent-purple/50 focus:bg-white/[0.06]"
            placeholder={t('password_placeholder')}
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
            {t('login_button')}
          </span>
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-white/40">
        {t('no_account')}{' '}
        <Link href="/signup" className="text-accent-purple hover:text-accent-purple/80 transition-colors">
          {t('signup_link')}
        </Link>
      </p>
    </div>
  );
}
