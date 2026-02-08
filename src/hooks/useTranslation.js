import { useLanguage } from '../context/LanguageContext'
import enTranslations from '../locales/en.json'
import frTranslations from '../locales/fr.json'

const translations = {
  en: enTranslations,
  fr: frTranslations,
}

/**
 * Hook to get translations for the current language
 * Usage: const t = useTranslation(); t('home.title')
 * Or with nested keys: t('home.suggestions.bestRestaurants')
 */
export function useTranslation() {
  const { language } = useLanguage()

  const t = (key, fallback = '') => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return fallback || key
      }
    }

    return value || fallback || key
  }

  return t
}

