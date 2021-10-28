import React, { useEffect } from 'react'
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Vaults from '../src/features/vaults/Vaults'

const Index = () => {
  useEffect(() => {
    document && require('bootstrap/dist/js/bootstrap')
  })

  return (
    <React.Fragment>
      <Head>
        <title>2PI</title>
      </Head>

      <Header />

      <div className="container">
        <Vaults />
      </div>

      <Footer />
    </React.Fragment>
  )
}

export default Index
