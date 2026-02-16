import { Toilet } from 'lucide-react'

/**
 * WashroomIcon component displays an icon based on washroom availability
 * Available = green, Partial Available = yellow, Not Available = red/gray
 */
export default function WashroomIcon({ washrooms, size = 'w-4 h-4', className = '' }) {
  if (!washrooms || washrooms === 'null' || washrooms.toLowerCase() === 'null') {
    return (
      <Toilet className={`${size} text-slate-400 ${className}`} />
    )
  }

  const washroomsLower = washrooms.toLowerCase()
  let colorClass = 'text-slate-400' // Default gray

  if (washroomsLower.includes('available') && !washroomsLower.includes('not') && !washroomsLower.includes('partial')) {
    colorClass = 'text-green-600'
  } else if (washroomsLower.includes('partial')) {
    colorClass = 'text-yellow-600'
  } else if (washroomsLower.includes('not')) {
    colorClass = 'text-red-500'
  }

  return (
    <Toilet className={`${size} ${colorClass} ${className}`} />
  )
}

