import React from 'react'
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import AirdropHeader from '../src/features/airdrop/AirdropHeader'
import AirdropPhases from '../src/features/airdrop/AirdropPhases'

const Airdrop = () => (
  <React.Fragment>
    <Head>
      <title>2PI - Airdrop</title>
    </Head>

    <Header />

    <div className="container">
      <AirdropHeader />
      <AirdropPhases />
    </div>

    <Footer />
  </React.Fragment>
)

export default Airdrop
