import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppStudent from './routes/AppStudent'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppStudent />
  </StrictMode>,
)
