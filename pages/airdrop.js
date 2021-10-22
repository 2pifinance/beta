import React from 'react'
import Head from 'next/head'
import Airdrop from '../src/components/airdrop'

const AirdropPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>2PI - Airdrop</title>
      </Head>

      <Airdrop />
    </React.Fragment>
  )
}

export default AirdropPage
