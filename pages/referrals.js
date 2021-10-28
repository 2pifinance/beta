import React from 'react'
import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Referral from '../src/features/referrals/Referral'

const Referrals = () => {
  return (
    <React.Fragment>
      <Head>
        <title>2PI - Referrals</title>
      </Head>

      <div className="container">
        <Header />
        <Referral />
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Referrals
