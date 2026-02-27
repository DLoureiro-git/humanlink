'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase-browser';
import { Loader2, Check, User, Lock, Sparkles } from 'lucide-react';

const personalities = ['atlas', 'nova', 'spark', 'sage'] as const;
const personalityColors: Record<string, string> = {
  atlas: 'from-blue-500 to-blue-600',
  nova: 'from-green-500 to-emerald-600',
  spark: 'from-orange-500 to-amber-600',
  sage: 'from-purple-500 to-violet-600',
};

export default function SettingsPage() {
  const t = useTranslations('settings');
  const tP = useTranslations('personalities');
  const { user } = useAuth();
  const supabase = createClient();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);
    setPasswordLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setPasswordError(t('password_error'));
    } else {
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
    setPasswordLoading(false);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8 font-heading text-2xl font-bold text-white">{t('title')}</h1>

      {/* Profile */}
      <div className="mb-6 rounded-2xl border border-white/[0.06] bg-surface p-6">
        <div className="mb-4 flex items-center gap-3">
          <User className="h-5 w-5 text-accent-purple" />
          <h2 className="font-heading text-base font-semibold text-white">{t('profile')}</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block font-body text-xs text-white/40">{t('email')}</label>
            <p className="font-body text-sm text-white/70">{user?.email}</p>
          </div>
          <div>
            <label className="mb-1 block font-body text-xs text-white/40">{t('account_id')}</label>
            <p className="font-mono text-xs text-white/30">{user?.id}</p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="mb-6 rounded-2xl border border-white/[0.06] bg-surface p-6">
        <div className="mb-4 flex items-center gap-3">
          <Lock className="h-5 w-5 text-accent-cyan" />
          <h2 className="font-heading text-base font-semibold text-white">{t('change_password')}</h2>
        </div>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="mb-1.5 block font-body text-sm text-white/50">{t('new_password')}</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 font-body text-sm text-white placeholder-white/20 outline-none focus:border-accent-purple/50"
              placeholder={t('new_password_placeholder')}
            />
          </div>

          {passwordError && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 font-body text-xs text-red-400">{passwordError}</p>
          )}
          {passwordSuccess && (
            <p className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 font-body text-xs text-green-400">
              <Check className="h-3 w-3" /> {t('password_success')}
            </p>
          )}

          <button
            type="submit"
            disabled={passwordLoading || !newPassword}
            className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-4 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white disabled:opacity-40"
          >
            {passwordLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            {t('save_password')}
          </button>
        </form>
      </div>

      {/* Personality Selector */}
      <div className="rounded-2xl border border-white/[0.06] bg-surface p-6">
        <div className="mb-4 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-accent-violet" />
          <h2 className="font-heading text-base font-semibold text-white">{t('personality')}</h2>
        </div>
        <p className="mb-4 font-body text-sm text-white/40">{t('personality_desc')}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {personalities.map((p) => (
            <div
              key={p}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12]"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full bg-gradient-to-br ${personalityColors[p]}`} />
                <h3 className="font-heading text-sm font-semibold capitalize text-white">{p}</h3>
              </div>
              <p className="font-body text-xs text-white/40">{tP(`${p}.tagline`)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-body text-xs text-white/30">{t('personality_note')}</p>
      </div>
    </div>
  );
}
