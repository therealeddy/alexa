import 'regenerator-runtime/runtime'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import GlobalConfig from './config/globalConfig.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <GlobalConfig />
  </React.StrictMode>,
)
