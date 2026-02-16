import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

/**
 * Protects admin-only routes. Redirects to home if no admin token in localStorage.
 */
export default function AdminRoute({ children }) {
  const { isAdmin } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAdmin) {
      navigate('/', { replace: true })
    }
  }, [isAdmin, navigate])

  if (!isAdmin) return null
  return children
}
