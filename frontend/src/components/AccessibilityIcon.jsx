import { UserCheck } from 'lucide-react'

/**
 * AccessibilityIcon component displays an icon based on accessibility level
 * Full Access = green check, Partial Access = yellow, Limited = orange, null = gray
 */
export default function AccessibilityIcon({ accessibility, size = 'w-4 h-4', className = '' }) {
  if (!accessibility || accessibility === 'null' || accessibility.toLowerCase() === 'null') {
    return (
      <UserCheck className={`${size} text-slate-400 ${className}`} />
    )
  }

  const accessLower = accessibility.toLowerCase()
  let colorClass = 'text-slate-400' // Default gray

  if (accessLower.includes('full')) {
    colorClass = 'text-green-600'
  } else if (accessLower.includes('partial')) {
    colorClass = 'text-yellow-600'
  } else if (accessLower.includes('limited')) {
    colorClass = 'text-orange-600'
  }

  return (
    <UserCheck className={`${size} ${colorClass} ${className}`} />
  )
}

