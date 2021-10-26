import Head from 'next/head'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/react'
import '../styles/app.scss'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../src/app/store'
import { dsn, integrations } from '../src/data/sentry'
import Wallet from '../src/components/wallet'
import Loading from '../src/components/loading'

const release = process.env.NEXT_PUBLIC_SENTRY_RELEASE

if (release) {
  Sentry.init({ dsn, release, integrations, tracesSampleRate: 1.0 })
}

const App = ({ Component, pageProps }) => {
  const loading = useLoading()

  useReferral()

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Wallet>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </Wallet>
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default App

const useLoading = () => {
  const router                  = useRouter()
  const [ loading, setLoading ] = useState(false)

  const handleRouteStart    = () => { setLoading(true) }
  const handleRouteComplete = () => { setLoading(false) }

  useEffect(() => {
    const routerEvents = router.events

    routerEvents.on('routeChangeStart', handleRouteStart)
    routerEvents.on('routeChangeComplete', handleRouteComplete)

    return () => {
      routerEvents.off('routeChangeStart', handleRouteStart)
      routerEvents.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  return loading
}

const useReferral = () => {
  const router   = useRouter()
  const referral = router.query?.ref

  useEffect(() => {
    // Prevent overriding the referral if it already exists
    if (!referral || localStorage.getItem('referral')) return

    localStorage.setItem('referral', referral)
  }, [ referral ])
}
