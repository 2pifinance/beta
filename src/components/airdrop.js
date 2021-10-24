import Header from './Header'
import AirdropClaim from './airdropClaim'
import Footer from './Footer'
import Toasts from './toasts'

const Airdrop = () => {
  return (
    <div className="container">
      <Header />
      <AirdropClaim />
      <Toasts />
      <Footer />
    </div>
  )
}

export default Airdrop
