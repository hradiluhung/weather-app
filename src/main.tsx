import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoutes from './routes/routes.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { AuthProvider } from './context/auth-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
