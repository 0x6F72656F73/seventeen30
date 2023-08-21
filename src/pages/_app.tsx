import type { AppProps } from 'next/app'
import { useState } from 'react'

import { Analytics } from '@vercel/analytics/react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

import '@/styles/globals.css'
import Layout from '@/components/Layout';


// import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps,}: AppProps<{initialSession: Session }>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </SessionContextProvider>
  )
}

