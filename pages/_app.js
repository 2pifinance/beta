import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { initSentry } from '../src/data/sentry'
import { Provider } from '../src/store'
import App from '../src/features/app/App'
import Loading from '../src/components/Loading'
import '../styles/app.scss'

initSentry()

const NextApp = ({ Component, pageProps }) => {
  const loading = useLoading()

  return (
    <Provider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <App>
        {(loading) ? <Loading /> : <Component {...pageProps} />}
      </App>
    </Provider>
  )
}

NextApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default NextApp

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
