import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

const messageImports = {
  pt: () => import('../../messages/pt.json'),
  en: () => import('../../messages/en.json'),
  es: () => import('../../messages/es.json'),
  fr: () => import('../../messages/fr.json'),
} as const;

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  const importMessages = messageImports[locale as keyof typeof messageImports];
  const messages = (await importMessages()).default;
  return {
    locale,
    messages
  };
});
