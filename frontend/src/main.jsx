import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { borderRadius: 'var(--radius-xl)' } }} />
    </LanguageProvider>
  </StrictMode>,
)
