import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState([])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const addChatMessage = useCallback((role, content) => {
    setChatHistory((prev) => [...prev, { role, content, id: Date.now() }])
  }, [])

  const clearChatHistory = useCallback(() => {
    setChatHistory([])
  }, [])

  const value = {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    chatHistory,
    addChatMessage,
    clearChatHistory,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
