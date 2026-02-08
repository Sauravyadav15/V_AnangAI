import { createContext, useContext, useState, useCallback } from 'react'
import { getStoredAdminToken, setStoredAdminToken, adminLoginApi } from '../lib/api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(() => getStoredAdminToken())

  const login = useCallback(async (email, password) => {
    const { token } = await adminLoginApi(email, password)
    setAdminToken(token)
    setStoredAdminToken(token)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setAdminToken(null)
    setStoredAdminToken(null)
  }, [])

  const isAdmin = !!adminToken

  const value = { isAdmin, adminToken, login, logout }
  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
