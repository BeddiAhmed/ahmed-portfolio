import enMsgs from '@/messages/en.json'
import frMsgs from '@/messages/fr.json'
import arMsgs from '@/messages/ar.json'

export type Locale = 'en' | 'fr' | 'ar'

export const locales: Locale[] = ['en', 'fr', 'ar']
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
}

export const localeDir: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fr: 'ltr',
  ar: 'rtl',
}

const allMessages = { en: enMsgs, fr: frMsgs, ar: arMsgs }

export type Messages = typeof enMsgs

export function getMessages(locale: Locale): Messages {
  return allMessages[locale] as Messages
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
