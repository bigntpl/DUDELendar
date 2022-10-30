import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <CssBaseline />
        <GlobalStyle />
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
