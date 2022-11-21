import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/global'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="flex">
        <div className="flex">
          <Navbar />
        </div>
        <div className="flex-grow">
          <CssBaseline />
          <GlobalStyle />
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}

export default MyApp
