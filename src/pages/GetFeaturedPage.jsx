import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Layout, { pageVariants, pageTransition } from '../components/Layout'
import {
  Building2,
  Mail,
  FileText,
  Phone,
  FileCheck,
  Loader2,
  CheckCircle2,
  Store,
  Sparkles,
} from 'lucide-react'
import { submitApplication } from '../lib/api'

const BUSINESS_TYPES = ['Cafe', 'Restaurant', 'Producer', 'Market', 'Retail', 'Service', 'Other']

const inputBase =
  'w-full rounded-[var(--radius-xl)] border border-[var(--color-glass-border)] bg-white/80 px-4 py-3 text-slate-deep placeholder:text-slate-deep/50 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors'

export default function GetFeaturedPage() {
  const navigate = useNavigate()
  const [choseYes, setChoseYes] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [licenseFile, setLicenseFile] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    businessName: '',
    businessType: '',
    businessDescription: '',
    contact: '',
  })

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleYes = () => setChoseYes(true)
  const handleNo = () => navigate('/licensing-info')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitting(true)
    try {
      await submitApplication(form, licenseFile)
      setSuccessModalOpen(true)
    } catch (err) {
      setSubmitError(err.message ?? 'Could not submit application.')
    } finally {
      setSubmitting(false)
    }
  }

  const closeModal = () => setSuccessModalOpen(false)

  return (
    <Layout>
      <motion.div
        className="px-4 py-8 md:px-8 md:py-12 max-w-3xl mx-auto"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-[var(--font-serif)] text-3xl md:text-4xl font-bold text-slate-deep mb-4">
            Get Featured
          </h1>
          <p className="text-slate-deep/80 text-lg max-w-2xl mx-auto leading-relaxed">
            We believe in local prosperity, sustainability, and cultural heritage. Help us showcase
            Kingston&apos;s businesses and makers—or learn how to join them.
          </p>
        </div>

        {/* The Fork */}
        {choseYes === null && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch"
          >
            <button
              type="button"
              onClick={handleYes}
              className="flex flex-col items-center gap-3 px-8 py-10 rounded-[var(--radius-2xl)] bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] hover:bg-sage/10 hover:border-sage/40 transition-all group"
            >
              <Store className="w-12 h-12 text-sage group-hover:scale-110 transition-transform" />
              <span className="font-[var(--font-serif)] font-bold text-xl text-slate-deep">
                Yes, I own a local business
              </span>
              <span className="text-sm text-slate-deep/70">Apply to be featured on the portal</span>
            </button>
            <button
              type="button"
              onClick={handleNo}
              className="flex flex-col items-center gap-3 px-8 py-10 rounded-[var(--radius-2xl)] bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] hover:bg-sage/10 hover:border-sage/40 transition-all group"
            >
              <Sparkles className="w-12 h-12 text-sage group-hover:scale-110 transition-transform" />
              <span className="font-[var(--font-serif)] font-bold text-xl text-slate-deep">
                No, but I want to open one
              </span>
              <span className="text-sm text-slate-deep/70">Go to the Civic Guide (licensing steps)</span>
            </button>
          </motion.div>
        )}

        {/* Yes flow: form */}
        <AnimatePresence mode="wait">
          {choseYes === true && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-[var(--radius-2xl)] bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] p-6 md:p-8"
            >
              <h2 className="font-[var(--font-serif)] text-2xl font-bold text-slate-deep mb-6">
                Application to be featured
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                    <span>Name</span>
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={inputBase}
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                    <Mail className="w-4 h-4" /> Email
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    required
                    className={inputBase}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                    <Building2 className="w-4 h-4" /> Business Name
                  </span>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => update('businessName', e.target.value)}
                    required
                    className={inputBase}
                    placeholder="e.g. Sage & Stone Café"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-deep mb-1 block">Category</span>
                  <select
                    value={form.businessType}
                    onChange={(e) => update('businessType', e.target.value)}
                    required
                    className={`${inputBase} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%232D3748%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-11`}
                  >
                    <option value="">Select category...</option>
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                    <FileText className="w-4 h-4" /> Description
                  </span>
                  <textarea
                    value={form.businessDescription}
                    onChange={(e) => update('businessDescription', e.target.value)}
                    rows={4}
                    className={`${inputBase} min-h-[100px] resize-y`}
                    placeholder="Describe your business and what makes it unique..."
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                    <Phone className="w-4 h-4" /> Contact
                  </span>
                  <input
                    type="text"
                    value={form.contact}
                    onChange={(e) => update('contact', e.target.value)}
                    className={inputBase}
                    placeholder="Phone or alternate contact"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                    <FileCheck className="w-4 h-4" /> Business License / Identity document
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    onChange={(e) => setLicenseFile(e.target.files?.[0] ?? null)}
                    className="block w-full text-sm text-slate-deep file:mr-3 file:py-2 file:px-4 file:rounded-[var(--radius-xl)] file:border-0 file:bg-sage/20 file:text-sage file:font-medium"
                  />
                  <p className="text-xs text-slate-deep/60 mt-1">PDF or image. Optional at this stage.</p>
                </label>

                {submitError && (
                  <div role="alert" className="rounded-[var(--radius-xl)] bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                    {submitError}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setChoseYes(null)}
                    disabled={submitting}
                    className="px-4 py-2.5 rounded-[var(--radius-xl)] text-slate-deep hover:bg-white/60 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-[var(--radius-xl)] bg-sage text-white hover:bg-sage-light flex items-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      'Submit application'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success modal */}
        <AnimatePresence>
          {successModalOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-slate-deep/40 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-title"
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(420px,90vw)] rounded-[var(--radius-2xl)] bg-white shadow-2xl border border-[var(--color-glass-border)] p-8 z-50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="flex flex-col items-center text-center">
                  <CheckCircle2 className="w-16 h-16 text-sage mb-4" />
                  <h2 id="success-title" className="font-[var(--font-serif)] text-2xl font-bold text-slate-deep mb-2">
                    Application submitted!
                  </h2>
                  <p className="text-slate-deep/80 mb-6">
                    Watch for an email from <strong>admin@anangai.com</strong> regarding your verification status.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2.5 rounded-[var(--radius-xl)] bg-sage text-white hover:bg-sage-light"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  )
}
