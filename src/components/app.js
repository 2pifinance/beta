import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Experimental from './experimental'
import Header from './header'
import ReferralButton from './referralButton'
import Tvl from './tvl'
import Deposited from './deposited'
import Reward from './reward'
import NetworkMenu from './networkMenu'
import Vaults from './vaults'
import Toasts from './toasts'
import Footer from './footer'
import { selectAddress } from '../features/walletSlice'

const App = () => {
  const address = useSelector(selectAddress)
  const router = useRouter()

  useEffect(() => {
    const referral = router?.query?.ref

    if (referral && referral !== address) {
      localStorage.setItem('referral', referral)
    } else if (referral && referral === address) {
      localStorage.removeItem('referral')
    }
  }, [address, router?.query?.ref])

  return (
    <div className="container">
      <Experimental />
      <Header />
      <ReferralButton />
      <Tvl />
      <Deposited />
      <Reward />
      <NetworkMenu />
      <Vaults />
      <Toasts />
      <Footer />
    </div>
  )
}

export default App
