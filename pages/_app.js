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

const useLoading = () => {
  const routerEvents          = useRouter().events
  const [loading, setLoading] = useState(false)

  const handleRouteStart    = () => { setLoading(true) }
  const handleRouteComplete = () => { setLoading(false) }

  useEffect(() => {
    routerEvents.on('routeChangeStart', handleRouteStart)
    routerEvents.on('routeChangeComplete', handleRouteComplete)

    return () => {
      routerEvents.off('routeChangeStart', handleRouteStart)
      routerEvents.off('routeChangeComplete', handleRouteComplete)
    }
  }, [routerEvents])

  return loading
}

const App = ({ Component, pageProps }) => {
  const loading = useLoading()

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
