import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Shield, Loader2 } from 'lucide-react'
import Layout, { pageVariants, pageTransition } from '../components/Layout'
import { useAdminAuth } from '../context/AdminAuthContext'

const inputBase =
  'w-full rounded-[var(--radius-xl)] border border-[var(--color-glass-border)] bg-white/80 px-4 py-3 text-slate-deep placeholder:text-slate-deep/50 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors'

export default function AdminLoginPage() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname ?? '/admin/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message ?? 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <motion.div
        className="px-4 py-8 md:px-8 md:py-12 max-w-md mx-auto"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <div className="rounded-[var(--radius-2xl)] bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] p-8">
          <div className="flex flex-col items-center mb-8">
            <Shield className="w-12 h-12 text-sage mb-3" />
            <h1 className="font-[var(--font-serif)] text-2xl font-bold text-slate-deep">
              Founder&apos;s Portal
            </h1>
            <p className="text-slate-deep/70 text-sm mt-1">Admin only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-deep mb-1 block">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputBase}
                placeholder="admin@anangai.com"
                autoComplete="username"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-deep mb-1 block">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputBase}
                autoComplete="current-password"
              />
            </label>
            {error && (
              <div role="alert" className="rounded-[var(--radius-xl)] bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[var(--radius-xl)] bg-sage text-white hover:bg-sage-light font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </Layout>
  )
}
