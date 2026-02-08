import { Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'

export default function LanguageToggle() {
  const { language, toggleLanguage, supportedLanguages } = useLanguage()
  const t = useTranslation()

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-xl)] bg-white/60 hover:bg-white/80 text-slate-deep transition-colors text-sm font-medium border border-white/40"
      aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
      title={`Switch to ${language === 'en' ? 'French' : 'English'}`}
    >
      <Languages className="w-4 h-4" />
      <span>{supportedLanguages[language === 'en' ? 'fr' : 'en']}</span>
    </button>
  )
}

