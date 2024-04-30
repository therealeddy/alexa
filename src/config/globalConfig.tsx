import GlobalStyle from '../styles/global'

import { ToastContainer } from 'react-toastify'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

function GlobalConfig() {
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default GlobalConfig
