'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Ban, Trash2, Plus } from 'lucide-react';

type UserRow = {
  id: string;
  email: string;
  license_key: string;
  status: string;
  personality_choice: string | null;
  device_name: string | null;
  created_at: string;
  last_heartbeat: string | null;
};

export default function AdminUsersPage() {
  const t = useTranslations('admin');
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function fetchUsers() {
    const res = await fetch('/api/v1/admin/users', {
      credentials: 'include',
    });
    const data = await res.json();
    setUsers(data.users ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleSuspend(id: string) {
    setActionLoading(id);
    await fetch(`/api/v1/admin/users/${id}/suspend`, {
      method: 'POST',
      credentials: 'include',
    });
    await fetchUsers();
    setActionLoading(null);
  }

  async function handleRevoke(id: string) {
    setActionLoading(id);
    await fetch(`/api/v1/admin/users/${id}/revoke`, {
      method: 'POST',
      credentials: 'include',
    });
    await fetchUsers();
    setActionLoading(null);
  }

  async function handleCreate() {
    const email = prompt(t('enter_email'));
    if (!email) return;
    setActionLoading('create');
    await fetch('/api/v1/admin/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    await fetchUsers();
    setActionLoading(null);
  }

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-500/15 text-green-400 border-green-500/30',
      suspended: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
      revoked: 'bg-red-500/15 text-red-400 border-red-500/30',
    };
    return colors[status] ?? 'bg-white/10 text-white/50 border-white/20';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-white">{t('users_title')}</h1>
        <button
          onClick={handleCreate}
          disabled={actionLoading === 'create'}
          className="flex items-center gap-2 rounded-xl bg-accent-purple px-4 py-2 font-body text-sm font-medium text-white transition-colors hover:bg-accent-purple/80 disabled:opacity-50"
        >
          {actionLoading === 'create' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {t('create_user')}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-surface">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-white/40">{t('col_email')}</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-white/40">{t('col_key')}</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-white/40">{t('col_status')}</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-white/40">{t('col_personality')}</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-white/40">{t('col_device')}</th>
              <th className="px-6 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-white/40">{t('col_created')}</th>
              <th className="px-6 py-3 text-right font-body text-xs font-medium uppercase tracking-wider text-white/40">{t('col_actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {users.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-body text-sm text-white/80">{u.email}</td>
                <td className="px-6 py-4 font-mono text-xs text-white/40">{u.license_key}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadge(u.status)}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-body text-sm capitalize text-white/50">{u.personality_choice ?? '—'}</td>
                <td className="px-6 py-4 font-body text-sm text-white/50">{u.device_name ?? '—'}</td>
                <td className="px-6 py-4 font-body text-xs text-white/40">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {u.status === 'active' && (
                      <button
                        onClick={() => handleSuspend(u.id)}
                        disabled={actionLoading === u.id}
                        className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-1.5 text-yellow-400 transition-colors hover:bg-yellow-500/20 disabled:opacity-50"
                        title={t('suspend')}
                      >
                        {actionLoading === u.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Ban className="h-3.5 w-3.5" />}
                      </button>
                    )}
                    {u.status !== 'revoked' && (
                      <button
                        onClick={() => handleRevoke(u.id)}
                        disabled={actionLoading === u.id}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                        title={t('revoke')}
                      >
                        {actionLoading === u.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center font-body text-sm text-white/30">
                  {t('no_users')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
