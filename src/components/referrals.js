import Header from './Header'
import Footer from './Footer'
import Toasts from './toasts'
import Referral from './referral'

const Referrals = () => {
  return (
    <div className="container">
      <Header />
      <Referral />
      <Toasts />
      <Footer />
    </div>
  )
}

export default Referrals
