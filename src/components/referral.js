import Back from './back'
import ReferralLink from './referralLink'
import ReferralUnlock from './referralUnlock'
import { useSelector } from 'react-redux'
import { selectStatus } from '../features/walletSlice'

const Referral = () => {
  const status = useSelector(selectStatus)

  return (
    <div className="card my-4 shadow-none">
      <div className="card-body text-center bg-blur border border-primary border-2 rounded px-lg-5 py-lg-4">
        <div className="text-start mb-0">
          <Back />
        </div>

        <h2 className="h1 text-primary mt-4 mb-0">
          2pi.network
        </h2>

        <h3 className="h1 text-primary">
          Referral program
        </h3>

        <div className="row justify-content-md-center">
          <div className="col-lg-7">
            <p className="lead mt-4">
              Share the referral link below to invite your friends and earn 1% of your friends earnings.
            </p>
          </div>
        </div>

        {status === 'success' ? <ReferralLink /> : <ReferralUnlock />}
      </div>
    </div>
  )
}

export default Referral
