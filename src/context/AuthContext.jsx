import { createContext, useContext, useState, useCallback } from 'react'
import { getStoredUser, setStoredUser, loginApi } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  const login = useCallback(async (email, password) => {
    const userData = await loginApi(email, password)
    setUser(userData)
    setStoredUser(userData)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setStoredUser(null)
  }, [])

  const value = { user, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
