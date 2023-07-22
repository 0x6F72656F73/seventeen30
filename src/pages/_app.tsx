import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Anton } from 'next/font/google'
 
const anton = Anton({ weight: '400', subsets: ['latin'] })

// import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, }: AppProps) {
  return (
    <main className={anton.className}>
      <Component {...pageProps} />
    </main>
  )
}
