import { HashRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './ISLVA_App'
import "./css/all.min.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
    
  </StrictMode>,
)
