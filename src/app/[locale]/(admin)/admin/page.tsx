'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Users, UserCheck, UserX, Activity, Loader2 } from 'lucide-react';

type Stats = {
  total_users: number;
  active_users: number;
  suspended_users: number;
  monthly_active: number;
};

export default function AdminPage() {
  const t = useTranslations('admin');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/admin/stats', {
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  const cards = [
    { label: t('total_users'), value: stats?.total_users ?? 0, icon: Users, color: 'text-accent-purple' },
    { label: t('active_users'), value: stats?.active_users ?? 0, icon: UserCheck, color: 'text-green-400' },
    { label: t('suspended_users'), value: stats?.suspended_users ?? 0, icon: UserX, color: 'text-yellow-400' },
    { label: t('monthly_active'), value: stats?.monthly_active ?? 0, icon: Activity, color: 'text-accent-cyan' },
  ];

  return (
    <div>
      <h1 className="mb-8 font-heading text-2xl font-bold text-white">{t('title')}</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/[0.06] bg-surface p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <card.icon className={`h-5 w-5 ${card.color}`} />
              <span className="font-body text-sm text-white/50">{card.label}</span>
            </div>
            <p className="font-heading text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
