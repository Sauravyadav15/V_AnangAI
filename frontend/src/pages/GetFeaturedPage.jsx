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
  MapPin,
  Clock,
  Leaf,
} from 'lucide-react'
import { submitApplication } from '../lib/api'

// Category option: { value: file stem for backend, label: display }
const FEATURED_CATEGORIES = [
  { value: 'bakeries', label: 'Bakeries' },
  { value: 'breweries_pubs', label: 'Breweries & Pubs' },
  { value: 'cafés_coffee_shops', label: 'Cafés & Coffee Shops' },
  { value: 'ice_cream_gelato', label: 'Ice Cream & Gelato' },
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'shops', label: 'Shops' },
]

const GREEN_PLATE_OPTIONS = ['', 'Gold', 'Silver', 'Bronze', 'null']

const inputBase =
  'w-full rounded-[var(--radius-xl)] border border-[var(--color-glass-border)] bg-white/80 px-4 py-3 text-slate-deep placeholder:text-slate-deep/50 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors'
const selectClass =
  `${inputBase} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%232D3748%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-11`

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
    categoryFile: '',
    // Food (restaurants, bakeries, cafes, breweries, ice_cream)
    businessName: '',
    location: '',
    hours: '',
    localSourcing: '',
    vegVegan: '',
    greenPlateCert: '',
    notes: '',
    // Shops only
    storeName: '',
    hoursOperation: '',
    info: '',
    shopCategory: '',
    // Common
    contact: '',
  })

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))
  const isShops = form.categoryFile === 'shops'

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
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">Name</span>
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
                  <span className="text-sm font-medium text-slate-deep mb-1 block">Category</span>
                  <select
                    value={form.categoryFile}
                    onChange={(e) => update('categoryFile', e.target.value)}
                    required
                    className={selectClass}
                  >
                    <option value="">Select category...</option>
                    {FEATURED_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </label>

                {/* Dynamic fields: Shops */}
                {isShops && (
                  <>
                    <label className="block">
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                        <Store className="w-4 h-4" /> Store Name
                      </span>
                      <input
                        type="text"
                        value={form.storeName}
                        onChange={(e) => update('storeName', e.target.value)}
                        required
                        className={inputBase}
                        placeholder="e.g. A One Clothing Store"
                      />
                    </label>
                    <label className="block">
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                        <MapPin className="w-4 h-4" /> Location
                      </span>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => update('location', e.target.value)}
                        required
                        className={inputBase}
                        placeholder="e.g. 358 King Street East"
                      />
                    </label>
                    <label className="block">
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                        <Clock className="w-4 h-4" /> Hours of Operation
                      </span>
                      <input
                        type="text"
                        value={form.hoursOperation}
                        onChange={(e) => update('hoursOperation', e.target.value)}
                        required
                        className={inputBase}
                        placeholder="e.g. Mon-Sat: 10:00 AM - 5:30 PM | Sun: Closed"
                      />
                    </label>
                    <label className="block">
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                        <FileText className="w-4 h-4" /> Info
                      </span>
                      <textarea
                        value={form.info}
                        onChange={(e) => update('info', e.target.value)}
                        rows={3}
                        className={`${inputBase} min-h-[80px] resize-y`}
                        placeholder="Describe your store (e.g. Family-owned outdoor lifestyle store...)"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-deep mb-1 block">Category (store type)</span>
                      <input
                        type="text"
                        value={form.shopCategory}
                        onChange={(e) => update('shopCategory', e.target.value)}
                        required
                        className={inputBase}
                        placeholder="e.g. Lifestyle, Women's clothing, Men's Clothing"
                      />
                    </label>
                  </>
                )}

                {/* Dynamic fields: Food (restaurants, bakeries, cafes, etc.) */}
                {!isShops && form.categoryFile && (
                  <>
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
                        placeholder="e.g. Miss Bao"
                      />
                    </label>
                    <label className="block">
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                        <MapPin className="w-4 h-4" /> Location
                      </span>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => update('location', e.target.value)}
                        required
                        className={inputBase}
                        placeholder="e.g. 294 Princess St"
                      />
                    </label>
                    <label className="block">
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                        <Clock className="w-4 h-4" /> Hours
                      </span>
                      <input
                        type="text"
                        value={form.hours}
                        onChange={(e) => update('hours', e.target.value)}
                        required
                        className={inputBase}
                        placeholder="e.g. Thu-Sun 5pm-10pm (Closed Mon-Wed)"
                      />
                    </label>
                    <label className="block">
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                        <Leaf className="w-4 h-4" /> Local Sourcing
                      </span>
                      <input
                        type="text"
                        value={form.localSourcing}
                        onChange={(e) => update('localSourcing', e.target.value)}
                        className={inputBase}
                        placeholder="e.g. Yes, Ontario produce"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-deep mb-1 block">Veg/Vegan Options</span>
                      <input
                        type="text"
                        value={form.vegVegan}
                        onChange={(e) => update('vegVegan', e.target.value)}
                        className={inputBase}
                        placeholder="e.g. Yes, Limited"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-deep mb-1 block">Green Plate Certification</span>
                      <select
                        value={form.greenPlateCert}
                        onChange={(e) => update('greenPlateCert', e.target.value)}
                        className={selectClass}
                      >
                        {GREEN_PLATE_OPTIONS.map((opt) => (
                          <option key={opt || 'none'} value={opt}>{opt || 'None'}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                        <FileText className="w-4 h-4" /> Notes
                      </span>
                      <textarea
                        value={form.notes}
                        onChange={(e) => update('notes', e.target.value)}
                        rows={3}
                        className={`${inputBase} min-h-[80px] resize-y`}
                        placeholder="e.g. Sustainability themed Asian fusion Restaurant"
                      />
                    </label>
                  </>
                )}

                <label className="block">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-deep mb-1">
                    <Phone className="w-4 h-4" /> Contact number
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
                  <p className="text-xs text-slate-deep/60 mt-1">PDF or image. Upload your license or identity document.</p>
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
