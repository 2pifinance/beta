import React from 'react'
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Referral from '../src/features/referrals/Referral'

const Referrals = () => (
  <React.Fragment>
    <Head>
      <title>2PI - Referrals</title>
    </Head>

    <Header />

    <div className="container flex-grow-1">
      <Referral />
    </div>

    <Footer />
  </React.Fragment>
)

export default Referrals
