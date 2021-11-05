import React from 'react'
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Vaults from '../src/features/vaults/Vaults'

const Index = () => (
  <React.Fragment>
    <Head>
      <title>2PI</title>
    </Head>

    <Header />

    <div className="container flex-grow-1">
      <Vaults />
    </div>

    <Footer />
  </React.Fragment>
)

export default Index
