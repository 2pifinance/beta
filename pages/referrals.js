import React from 'react'
import Head from 'next/head'
import Referrals from '../src/components/referrals'

const ReferralsPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>2PI - Referrals</title>
      </Head>

      <Referrals />
    </React.Fragment>
  )
}

export default ReferralsPage
