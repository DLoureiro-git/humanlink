'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Github, Twitter, MessageCircle } from 'lucide-react';

const locales = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
] as const;

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'X / Twitter' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo + description */}
          <div className="md:col-span-4">
            <span className="font-heading text-xl font-bold text-white">
              HumanLink
            </span>
            <p className="mt-3 text-white/40 text-sm font-body leading-relaxed max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3">
            <h4 className="font-heading text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              {t('links')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#pricing"
                  className="text-white/50 hover:text-white text-sm font-body transition-colors duration-200"
                >
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-white text-sm font-body transition-colors duration-200"
                >
                  {t('terms')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-white text-sm font-body transition-colors duration-200"
                >
                  {t('contact')}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-white/50 hover:text-white text-sm font-body transition-colors duration-200"
                >
                  {t('faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div className="md:col-span-2">
            <h4 className="font-heading text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Social
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-surface-light border border-border flex items-center justify-center text-white/40 hover:text-white hover:border-accent-purple/40 hover:bg-accent-purple/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Language switcher */}
          <div className="md:col-span-3">
            <h4 className="font-heading text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              {t('language')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {locales.map(({ code, label }) => (
                <Link
                  key={code}
                  href={pathname}
                  locale={code as 'pt' | 'en' | 'es' | 'fr'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-all duration-200 ${
                    locale === code
                      ? 'bg-accent-purple/15 border border-accent-purple/30 text-accent-purple'
                      : 'bg-surface-light border border-border text-white/40 hover:text-white hover:border-white/20'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://github.com/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 text-xs font-body hover:text-white/40 transition-colors"
            >
              {t('powered_by')}
            </a>
            <p className="text-center text-white/30 text-xs font-body">
              {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
