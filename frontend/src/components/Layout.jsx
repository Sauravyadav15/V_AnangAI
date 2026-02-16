import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, LogIn, LogOut, Shield } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useTranslation } from '../hooks/useTranslation'
import Sidebar from './Sidebar'
import LanguageToggle from './LanguageToggle'

const logoImg = new URL('../../frontendimages/ANANG_logo.png', import.meta.url).href

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = { type: 'tween', duration: 0.3, ease: 'easeOut' }

export default function Layout({ children }) {
  const { toggleSidebar } = useApp()
  const { isAdmin, logout } = useAdminAuth()
  const navigate = useNavigate()
  const t = useTranslation()

  const handleAdminLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 md:px-8 bg-[var(--color-glass-bg)] backdrop-blur-md border-b border-[var(--color-glass-border)]">
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2.5 rounded-[var(--radius-xl)] hover:bg-white/60 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-slate-deep" />
        </button>
        <Link
          to="/"
          className="flex items-center gap-2.5 font-[var(--font-serif)] font-bold text-slate-deep text-lg hover:text-slate-deep/80"
        >
          <img
            src={logoImg}
            alt=""
            className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-white/50 shadow-sm"
          />
          <span>AnangAI</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          {isAdmin ? (
            <button
              type="button"
              onClick={handleAdminLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-xl)] text-slate-deep hover:bg-white/60 transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              {t('common.adminLogout')}
            </button>
          ) : (
            <Link
              to="/admin/login"
              className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-xl)] bg-sage text-white hover:bg-sage-light transition-colors text-sm font-medium"
            >
              <Shield className="w-4 h-4" />
              {t('common.adminLogin')}
            </Link>
          )}
        </div>
      </header>

      <motion.main
        className="flex-1"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {children}
      </motion.main>

      <Sidebar />
    </div>
  )
}

export { pageVariants, pageTransition }
