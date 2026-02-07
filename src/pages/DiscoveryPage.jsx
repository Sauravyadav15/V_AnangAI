import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Layout, { pageVariants, pageTransition } from '../components/Layout'
import TabNavigation from '../components/TabNavigation'
import ServiceCard from '../components/ServiceCard'
import { getVerifiedBusinesses } from '../lib/api'

const VERIFIED_TABS = [
  { id: 'all', label: 'All' },
  { id: 'Restaurant', label: 'Restaurant' },
  { id: 'Cafe', label: 'Cafe' },
  { id: 'Market', label: 'Market' },
  { id: 'Other', label: 'Other' },
]

export default function DiscoveryPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getVerifiedBusinesses()
      .then((data) => setBusinesses(data.businesses ?? []))
      .catch((e) => {
        setError(e.message)
        setBusinesses([])
      })
      .finally(() => setLoading(false))
  }, [])

  const items = useMemo(() => {
    if (activeTab === 'all') return businesses
    return businesses.filter((b) => (b.category || '').toLowerCase() === activeTab.toLowerCase())
  }, [businesses, activeTab])

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
        <h1 className="font-[var(--font-serif)] text-3xl md:text-4xl font-bold text-slate-deep mb-2">
          Kingston Discovery
        </h1>
        <p className="text-slate-deep/70 mb-8">
          Verified local businesses — restaurants, cafés, markets and more.
        </p>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} tabs={VERIFIED_TABS} />

        {loading && (
          <p className="text-slate-deep/60 text-center py-12">Loading verified businesses…</p>
        )}
        {error && (
          <p className="text-red-600 text-center py-4">Could not load businesses. Make sure the API is running.</p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {!loading && !error && items.length === 0 && (
          <p className="text-slate-deep/60 text-center py-12">
            No verified businesses in this category yet.
          </p>
        )}
      </motion.div>
    </Layout>
  )
}
