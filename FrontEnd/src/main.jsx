import { StrictMode } from 'react'
import React from 'react';  // Add this to your main.jsx or other JSX files

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
