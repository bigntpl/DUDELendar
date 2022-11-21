import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/global'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import React from 'react'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
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
      </SessionProvider>
    </>
  )
}

export default MyApp
