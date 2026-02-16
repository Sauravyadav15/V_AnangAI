import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Check, X, Loader2, RefreshCw } from 'lucide-react'
import Layout, { pageVariants, pageTransition } from '../components/Layout'
import { useAdminAuth } from '../context/AdminAuthContext'
import {
  getAdminApplications,
  adminApproveApplication,
  adminRejectApplication,
} from '../lib/api'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

export default function AdminDashboardPage() {
  const { adminToken } = useAdminAuth()
  const [data, setData] = useState({ applications: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actingId, setActingId] = useState(null)

  const load = () => {
    if (!adminToken) return
    setLoading(true)
    setError('')
    getAdminApplications(adminToken)
      .then(setData)
      .catch((e) => setError(e.message ?? 'Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [adminToken])

  const appKey = (app) => app.id || app.email

  const handleApprove = async (app) => {
    const key = appKey(app)
    if (!key || actingId) return
    setActingId(key)
    try {
      await adminApproveApplication(adminToken, key)
      load()
    } catch (e) {
      setError(e.message ?? 'Approve failed')
    } finally {
      setActingId(null)
    }
  }

  const handleReject = async (app) => {
    const key = appKey(app)
    if (!key || actingId) return
    setActingId(key)
    try {
      await adminRejectApplication(adminToken, key)
      load()
    } catch (e) {
      setError(e.message ?? 'Reject failed')
    } finally {
      setActingId(null)
    }
  }

  const applications = data.applications ?? []

  return (
    <Layout>
      <motion.div
        className="px-4 py-8 md:px-8 md:py-12 max-w-6xl mx-auto"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-[var(--font-serif)] text-3xl font-bold text-slate-deep">
              Founder&apos;s Portal
            </h1>
            <p className="text-slate-deep/70 mt-1">Manage Get Featured applications</p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xl)] bg-sage/20 text-sage hover:bg-sage/30 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div role="alert" className="rounded-[var(--radius-xl)] bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 mb-6">
            {error}
          </div>
        )}

        {loading && applications.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-sage" />
          </div>
        ) : applications.length === 0 ? (
          <p className="text-slate-deep/60 text-center py-12">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--color-glass-border)]">
                  <th className="px-4 py-3 text-sm font-semibold text-slate-deep">Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-deep">Email</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-deep">Contact</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-deep">Business</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-deep">Category</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-deep">Status</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-deep">Document</th>
                  <th className="px-4 py-3 text-sm font-semibold text-slate-deep">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id ?? app.email ?? `row-${app.email}-${Math.random()}`}
                    className="border-b border-[var(--color-glass-border)] last:border-0 hover:bg-white/40"
                  >
                    <td className="px-4 py-3 text-sm text-slate-deep">{app.name || '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-deep">{app.email || '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-deep">{app.contact || '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-deep">{app.biz_name || '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-deep">{app.biz_cat || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                          app.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {app.license_url ? (
                        <a
                          href={`${API_BASE}/api/uploads/${app.license_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sage hover:underline text-sm"
                        >
                          View <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {app.status === 'pending' && (app.id || app.email) ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleApprove(app)}
                            disabled={actingId !== null}
                            className="p-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50"
                            title="Approve"
                          >
                            {actingId === appKey(app) ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(app)}
                            disabled={actingId !== null}
                            className="p-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-200 disabled:opacity-50"
                            title="Reject"
                          >
                            {actingId === appKey(app) ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </Layout>
  )
}
