import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Glass_Antiqua } from 'next/font/google'
 
const inter = Glass_Antiqua({ weight: '400', subsets: ['latin'] })

// import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
