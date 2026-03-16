import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import GA4React from 'react-ga4'
import { captureUTMParams } from './lib/utm-parser'
import './index.css'
import App from './App'

// Capture UTM parameters from URL early
captureUTMParams()

// Initialize Google Analytics 4
const GA_ID = import.meta.env.VITE_GA4_ID || ''
if (GA_ID) {
  GA4React.initialize(GA_ID)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
