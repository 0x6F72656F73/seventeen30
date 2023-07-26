import type { AppProps } from 'next/app'

import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.css'
import Layout from '@/components/Layout';


// import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, }: AppProps) {
  return (
    <main>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </main>
  )
}
