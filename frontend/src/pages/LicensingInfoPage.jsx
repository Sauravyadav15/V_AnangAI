import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Mail, ArrowRight } from 'lucide-react'
import Layout, { pageVariants, pageTransition } from '../components/Layout'

const CIVIC_STEPS = [
  {
    id: 1,
    title: 'Join the community',
    description: 'Your digital home is ready. You’re part of the partner pipeline and can track your licensing journey.',
  },
  {
    id: 2,
    title: 'Initial consultation',
    description: 'Speak to a Licensing Agent (613-546-4291 ext. 3150) or email the City to confirm your business type and required permits.',
    link: { label: 'Draft consultation email', href: 'mailto:licensingapplications@cityofkingston.ca?subject=Business%20Licensing%20Consultation', mailto: true },
  },
  {
    id: 3,
    title: 'Provincial registration',
    description: 'Register your business name at Service Ontario (1201 Division St). Your business must be registered provincially before the City can issue a local license.',
    link: { label: 'Open ServiceOntario portal', href: 'https://www.ontario.ca/page/business-services', mailto: false },
  },
  {
    id: 4,
    title: 'Zoning verification',
    description: 'Check if your location is zoned for your business type via Kingston Planning. Zoning ensures your address is permitted for your use—required before final license approval.',
    link: { label: 'Open Kingston zoning map', href: 'https://www.cityofkingston.ca/planning-and-development/zoning-bylaws/zoning-bylaw-map/', mailto: false },
  },
  {
    id: 5,
    title: 'Tax (HST) setup',
    description: 'Register for your HST number with the Canada Revenue Agency (CRA). Many business licenses require proof of HST registration for tax compliance.',
    link: { label: 'Open CRA business portal', href: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/registering-your-business.html', mailto: false },
  },
  {
    id: 6,
    title: 'Safety clearances',
    description: 'Gather Fire & Health inspection documents for your specific business type. Safety clearances protect you and your customers and are required for license issuance.',
    link: { label: 'View fire safety checklists', href: 'https://www.cityofkingston.ca/residents/fire-emergency-services/fire-prevention', mailto: false },
  },
  {
    id: 7,
    title: 'Get your license and go live',
    description: 'Submit your final City Business License. Once verified, your business can be featured on the portal for visitors and locals to discover.',
  },
]

export default function LicensingInfoPage() {
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
        <div className="mb-12">
          <h1 className="font-[var(--font-serif)] text-3xl md:text-4xl font-bold text-slate-deep mb-2">
            Civic Guide
          </h1>
          <p className="text-slate-deep/70">
            A step-by-step guide to getting a Kingston business license. Follow these steps, then apply to get featured on the portal.
          </p>
        </div>

        <ol className="space-y-8">
          {CIVIC_STEPS.map((step, index) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative pl-10 pb-8 border-b border-[var(--color-glass-border)] last:border-0 last:pb-0"
            >
              <span
                className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-sage/20 text-sage font-[var(--font-serif)] font-bold text-sm"
                aria-hidden
              >
                {step.id}
              </span>
              <h2 className="font-[var(--font-serif)] text-xl font-bold text-slate-deep mb-2">
                {step.title}
              </h2>
              <p className="text-slate-deep/80 mb-3">{step.description}</p>
              {step.link && (
                <a
                  href={step.href}
                  target={step.mailto ? undefined : '_blank'}
                  rel={step.mailto ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-2 text-sage hover:underline font-medium text-sm"
                >
                  {step.mailto && <Mail className="w-4 h-4" />}
                  {!step.mailto && <ExternalLink className="w-4 h-4" />}
                  {step.label}
                </a>
              )}
            </motion.li>
          ))}
        </ol>

        <div className="mt-14 pt-10 border-t border-[var(--color-glass-border)] text-center">
          <p className="text-slate-deep/70 mb-4">Ready to get featured?</p>
          <Link
            to="/get-featured"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-xl)] bg-sage text-white hover:bg-sage-light font-medium"
          >
            Back to Get Featured page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </Layout>
  )
}
