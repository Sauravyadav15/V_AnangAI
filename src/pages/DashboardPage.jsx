import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Check, Lock, Upload, Loader2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { getUser, updateProgress, uploadLicense } from '../lib/api'

const ROADMAP_STEPS = [
  { id: 1, label: 'Create your partner account', autoDone: true },
  { id: 2, label: 'Complete your business profile' },
  { id: 3, label: 'Add business description & category' },
  { id: 4, label: 'Confirm contact details' },
  { id: 5, label: 'Review sustainability commitment' },
  { id: 6, label: 'Accept terms and conditions' },
  { id: 7, label: 'Upload City License to go LIVE' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const email = user?.email

  useEffect(() => {
    if (!user) return
    if (!email) {
      navigate('/login', { replace: true })
      return
    }
    let cancelled = false
    getUser(email)
      .then((data) => { if (!cancelled) setProfile(data) })
      .catch(() => { if (!cancelled) setProfile({ progress: 1, is_verified: false }) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [user, email, navigate])

  const progress = profile?.progress ?? 1
  const isVerified = profile?.is_verified ?? false
  const profileStrength = Math.round((progress / 7) * 100)
  const step7Unlocked = progress >= 6

  const handleMarkDone = async (stepId) => {
    if (stepId === 1 || stepId > 6) return
    const needed = stepId
    if (progress >= needed) return
    try {
      const next = await updateProgress(email)
      setProfile((p) => ({ ...p, progress: next.progress }))
      toast.success('Step Completed!')
    } catch (e) {
      toast.error(e.message ?? 'Could not update')
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !email) return
    setUploading(true)
    try {
      await uploadLicense(email, file)
      setProfile((p) => ({ ...p, progress: 7, is_verified: true }))
      setUploadSuccess(true)
      toast.success('License uploaded! You are now verified.')
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
      setTimeout(() => confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } }), 200)
    } catch (err) {
      toast.error(err.message ?? 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-sage animate-spin" />
        </div>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-sage animate-spin" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-8 md:px-8 md:py-12 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Dashboard Sidebar - Profile Strength + Live Preview */}
        <aside className="md:w-56 shrink-0 space-y-4">
          <div className="rounded-[var(--radius-2xl)] bg-[var(--color-glass-bg)] backdrop-blur-xl border border-[var(--color-glass-border)] p-6 sticky top-24">
            <h2 className="font-[var(--font-serif)] font-bold text-slate-deep mb-4">Profile Strength</h2>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  fill="none"
                  stroke="rgba(45,55,72,0.15)"
                  strokeWidth="2.5"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  fill="none"
                  stroke="var(--color-sage)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 100 - profileStrength }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-deep">
                {profileStrength}%
              </span>
            </div>
            <p className="text-center text-sm text-slate-deep/70 mt-2">
              {isVerified ? 'Verified & LIVE' : `${progress} of 7 steps`}
            </p>
          </div>
          <div className="rounded-[var(--radius-2xl)] bg-[var(--color-glass-bg)] backdrop-blur-xl border border-[var(--color-glass-border)] p-5">
            <h2 className="font-[var(--font-serif)] font-bold text-slate-deep mb-3">Live Preview</h2>
            <p className="text-sm text-slate-deep/80">
              <span className="font-medium">{user.business_name || 'Your business'}</span>
              {user.name && (
                <>
                  <br />
                  <span className="text-slate-deep/70">— {user.name}</span>
                </>
              )}
            </p>
          </div>
        </aside>

        {/* Roadmap */}
        <main className="flex-1 min-w-0">
          <h1 className="font-[var(--font-serif)] text-3xl md:text-4xl font-bold text-slate-deep mb-2">
            Partner Roadmap
          </h1>
          <p className="text-slate-deep/70 mb-8">
            Complete each step to get your business featured on KingstonAI.
          </p>

          <div className="space-y-3">
            {ROADMAP_STEPS.map((step) => {
              const done = step.autoDone || progress >= step.id
              const isStep7 = step.id === 7
              const locked = isStep7 && !step7Unlocked

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-[var(--radius-2xl)] border backdrop-blur-xl p-4 md:p-5 transition-all ${
                    done && !isStep7
                      ? 'bg-green-50/80 border-green-200'
                      : locked
                        ? 'bg-slate-deep/5 border-[var(--color-glass-border)] opacity-75'
                        : 'bg-[var(--color-glass-bg)] border-[var(--color-glass-border)]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        done && !isStep7 ? 'bg-green-500 text-white' : locked ? 'bg-slate-300 text-slate-500' : 'bg-white/80 border border-[var(--color-glass-border)]'
                      }`}
                    >
                      {done && !isStep7 ? <Check className="w-5 h-5" /> : locked ? <Lock className="w-5 h-5" /> : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${done && !isStep7 ? 'text-green-800' : locked ? 'text-slate-deep/60' : 'text-slate-deep'}`}>
                        {step.label}
                      </p>
                      {isStep7 && (
                        <div className="mt-3">
                          {locked ? (
                            <p className="text-sm text-slate-deep/60">Complete steps 1–6 to unlock.</p>
                          ) : isVerified || uploadSuccess ? (
                            <p className="text-sm text-green-700 font-medium">
                              Congratulations! Your business is now LIVE on KingstonAI.
                            </p>
                          ) : (
                            <div className="flex flex-wrap items-center gap-3">
                              <label className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xl)] bg-white/80 border border-[var(--color-glass-border)] cursor-pointer hover:bg-white transition-colors">
                                <Upload className="w-4 h-4 text-sage" />
                                <span className="text-sm font-medium">Upload your official City License to get Featured</span>
                                <input
                                  type="file"
                                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                                  className="sr-only"
                                  onChange={handleUpload}
                                  disabled={uploading}
                                />
                              </label>
                              {uploading && (
                                <span className="text-sm text-slate-deep/70 flex items-center gap-1">
                                  <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {!isStep7 && !step.autoDone && !done && step.id === progress + 1 && (
                      <button
                        type="button"
                        onClick={() => handleMarkDone(step.id)}
                        className="shrink-0 px-4 py-2 rounded-[var(--radius-xl)] bg-sage text-white hover:bg-sage-light text-sm font-medium transition-colors"
                      >
                        Mark as Done
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {uploadSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 rounded-[var(--radius-2xl)] bg-green-50/90 backdrop-blur-xl border border-green-200 p-6 text-center"
            >
              <p className="font-[var(--font-serif)] font-bold text-green-800 text-lg">
                Congratulations! Your business is now LIVE on KingstonAI.
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </Layout>
  )
}
