import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TeacherProvider } from './context/TeacherContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeProvider>
      <StudentProvider>
        <TeacherProvider>
        <BrowserRouter>
        <SearchProvider>
          <App/>
      </SearchProvider>
      </BrowserRouter>
      </TeacherProvider>
      
      </StudentProvider>
    </ThemeProvider>
  </StrictMode>,
)
