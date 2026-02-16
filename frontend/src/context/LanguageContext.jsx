import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

const SUPPORTED_LANGUAGES = {
  en: 'English',
  fr: 'Français'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Load from localStorage or default to English
    const saved = localStorage.getItem('kingston_language')
    return saved && (saved === 'en' || saved === 'fr') ? saved : 'en'
  })

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('kingston_language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'))
  }

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

