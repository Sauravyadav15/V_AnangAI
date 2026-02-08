import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import AdminRoute from './components/AdminRoute'
import HomePage from './pages/HomePage'
import DiscoveryPage from './pages/DiscoveryPage'
import GetFeaturedPage from './pages/GetFeaturedPage'
import LicensingInfoPage from './pages/LicensingInfoPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

function App() {
  return (
    <AdminAuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/discovery" element={<DiscoveryPage />} />
              <Route path="/get-featured" element={<GetFeaturedPage />} />
              <Route path="/licensing-info" element={<LicensingInfoPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AppProvider>
    </AdminAuthProvider>
  )
}

export default App
