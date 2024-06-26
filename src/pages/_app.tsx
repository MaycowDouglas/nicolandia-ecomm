import Layout from '@/components/templates/Layout'
import CartProvider from '@/context/cart/Provider'
import FeedbackProvider from '@/context/feedback/Provider'
import fetchJson from '@/lib/fetchJson'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { useRouter } from 'next/router'
import Script from 'next/script'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      nProgress.start()
    }

    const handleStop = () => {
      nProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <div className={`${inter.variable} font-sans`}>
        <FeedbackProvider>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
              <Script src="https://code.tidio.co/axnm5cdiyv9zjpudy2f31zocgc4ynbek.js" async />
            </Layout>
          </CartProvider>
        </FeedbackProvider>
      </div>
    </SWRConfig>
  )
}
