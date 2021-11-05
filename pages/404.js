import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getClientBuildManifest } from 'next/dist/client/route-loader'
import { removePathTrailingSlash } from 'next/dist/client/normalize-trailing-slash'
import { getRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

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
    <React.Fragment>
      <Head>
        <title>2PI - Not found</title>
      </Head>

      <Header />

      <div className="container flex-grow-1">
        <NotFound />
      </div>

      <Footer />
    </React.Fragment>
  )
}

const NotFound = () => {
  return (
    <div className="box-rounded bg-blur text-center my-4 px-lg-5 py-lg-4">
      <div className="text-start mb-0">
        <Link href="/">
          <a className="text-decoration-none">
            <div className="d-flex align-items-center">
              <i className="bi-arrow-left"></i>
              <div className="ms-2">Back</div>
            </div>
          </a>
        </Link>
      </div>

      <h2 className="h1 text-highlight mt-4 mb-0">
        Not found
      </h2>

      <p className="text-center lead my-4">
        The page that you are looking for doesn’t exist.
      </p>

      <Link href="/">
        <a className="btn btn-outline-primary my-4">
          Go home
        </a>
      </Link>
    </div>
  )
}

export default NotFoundPage
