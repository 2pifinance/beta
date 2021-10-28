import React from 'react'
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Airdrop from '../src/features/airdrop/Airdrop'

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>2PI - Airdrop</title>
      </Head>

      <Header />

      <div className="container">
        <Airdrop />
      </div>

      <Footer />
    </React.Fragment>
  )
}

export default Index
