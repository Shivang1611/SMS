import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { StudentProvider } from './context/StudentContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeProvider>
      <StudentProvider>
      <App/>
    
      </StudentProvider>
    </ThemeProvider>
  </StrictMode>,
)
