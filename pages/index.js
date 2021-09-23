import React, { useEffect } from 'react'
import Head from 'next/head'
import App from '../src/components/app'

const Index = () => {
  useEffect(() => {
    document && require('bootstrap/dist/js/bootstrap')
  })

  return (
    <React.Fragment>
      <Head>
        <title>2PI</title>
      </Head>

      <App />
    </React.Fragment>
  )
}

export default Index
