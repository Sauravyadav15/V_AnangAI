import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Mail, Lock, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Layout, { pageVariants, pageTransition } from '../components/Layout'

const inputBase =
  'w-full rounded-[var(--radius-xl)] border border-[var(--color-glass-border)] bg-white/80 px-4 py-3 text-slate-deep placeholder:text-slate-deep/50 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state?.message

  useEffect(() => {
    if (message) toast.success(message)
  }, [message])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email.trim(), password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err.message ?? 'Login failed.'
      setError(msg)
      if (err.message?.toLowerCase().includes('invalid') || err.message === 'Invalid credentials') {
        toast.error('Invalid Credentials')
      } else {
        toast.error(msg)
      }
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
        <h1 className="font-[var(--font-serif)] text-3xl md:text-4xl font-bold text-slate-deep mb-2">
          Login
        </h1>
        <p className="text-slate-deep/70 mb-8">
          Sign in with your email to access your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              role="alert"
              className="rounded-[var(--radius-xl)] bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800"
            >
              {error}
            </div>
          )}
          <label className="block">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
              <Mail className="w-4 h-4" /> Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={inputBase}
              placeholder="you@example.com"
              disabled={loading}
            />
          </label>
          <label className="block">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
              <Lock className="w-4 h-4" /> Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={inputBase}
              placeholder="••••••••"
              disabled={loading}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-[var(--radius-xl)] bg-sage text-white hover:bg-sage-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Login
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-deep/70">
          New partner? Submit an application on Get Featured, then log in here to track your status.
        </p>
        <p className="mt-2 text-center">
          <Link to="/" className="text-sage font-medium hover:underline">
            Back to home
          </Link>
        </p>
      </motion.div>
    </Layout>
  )
}
