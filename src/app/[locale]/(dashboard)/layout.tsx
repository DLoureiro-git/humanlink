'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LayoutDashboard, Shield, LogOut, Loader2, Download, Settings, CreditCard } from 'lucide-react';
import { useEffect } from 'react';

const navItems = [
  { key: 'nav_dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'nav_subscription', href: '/dashboard/subscription', icon: CreditCard },
  { key: 'nav_download', href: '/dashboard/download', icon: Download },
  { key: 'nav_settings', href: '/dashboard/settings', icon: Settings },
] as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const t = useTranslations('dashboard');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/[0.06] bg-surface px-4 py-6">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-2.5 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan">
            <span className="font-heading text-sm font-bold text-white">H</span>
          </div>
          <span className="font-heading text-lg font-semibold text-white">
            Human<span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">Link</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm transition-colors ${
                  isActive
                    ? 'bg-accent-purple/10 text-accent-purple'
                    : 'text-white/50 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {t(item.key)}
              </Link>
            );
          })}

          {isAdmin && (
            <>
              <div className="mx-3 my-3 h-px bg-white/[0.06]" />
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                <Shield className="h-4 w-4" />
                {t('nav_admin')}
              </Link>
            </>
          )}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-white/[0.06] pt-4">
          <p className="mb-3 truncate px-3 font-body text-xs text-white/40">{user.email}</p>
          <button
            onClick={async () => {
              await signOut();
              router.push('/');
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 px-8 py-8">
        {children}
      </main>
    </div>
  );
}
