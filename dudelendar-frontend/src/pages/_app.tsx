import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global';
import { Navbar } from '../components/Navbar';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Navbar />
        <CssBaseline />
        <GlobalStyle />
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
