'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase-browser';
import { Link, useRouter } from '@/i18n/routing';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.code === 'user_already_exists') {
        setError(t('error_exists'));
      } else {
        setError(t('error_signup'));
      }
      setLoading(false);
      return;
    }

    if (!data.session) {
      setError(t('error_signup'));
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-2 text-center font-heading text-2xl font-bold text-white">
        {t('signup_title')}
      </h1>
      <p className="mb-8 text-center font-body text-sm text-white/50">
        {t('signup_subtitle')}
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
            {t('signup_button')}
          </span>
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-white/40">
        {t('has_account')}{' '}
        <Link href="/login" className="text-accent-purple hover:text-accent-purple/80 transition-colors">
          {t('login_link')}
        </Link>
      </p>
    </div>
  );
}
