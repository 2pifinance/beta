import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getClientBuildManifest } from 'next/dist/client/route-loader'
import { removePathTrailingSlash } from 'next/dist/client/normalize-trailing-slash'
import { getRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../src/components/Header'
import Toasts from '../src/components/toasts'
import Footer from '../src/components/Footer'
import Back from '../src/components/back'

const cleanPath = path => {
  return removePathTrailingSlash(path).replace(/\.html$/, '')
}

const validatePath = async path => {
  const manifest = await getClientBuildManifest()
  const pages    = manifest.sortedPages.filter(page => !page.startsWith('/_'))
  const isValid  = pages.some(page => getRouteRegex(page).re.test(path))

  if (! isValid) throw new Error('Invalid path')
}

const NotFoundPage = () => {
  const router = useRouter()

  useEffect(() => {
    const path = cleanPath(router.asPath)

    // Specifically requested this page
    if (path === '/404') return

    // If the path matches a route (is valid), redirect to it.
    // If not, just continue showing this error page.
    validatePath(path).then(() => router.push(path))
  }, [router])

  return (
    <div className="container">
      <Head>
        <title>2PI - Not found</title>
      </Head>

      <Header />
      <NotFound />
      <Toasts />
      <Footer />
    </div>
  )
}

const NotFound = () => {
  return (
    <div className="card my-4 shadow-none">
      <div className="card-body text-center bg-blur border border-primary border-2 rounded px-lg-5 py-lg-4">
        <div className="text-start mb-0">
          <Back />
        </div>

        <h2 className="h1 text-primary mt-4 mb-0">
          Not found
        </h2>

        <p className="text-center lead my-4">
          The page that you are looking for doesn’t exist.
        </p>

        <Link href="/">
          <a className="btn btn-outline-primary bg-dark text-primary fw-bold my-4">
            Go home
          </a>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
