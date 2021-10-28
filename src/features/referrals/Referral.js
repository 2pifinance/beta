import Link from 'next/link'
import { useStore } from '../../store'
import ReferralLink from './ReferralLink'
import ReferralUnlock from './ReferralUnlock'

const Referral = () => {
  const [ { wallet } ] = useStore()
  const isConnected    = (wallet !== undefined)

  return (
    <div className="card bg-blur shadow-none my-4">
      <div className="card-body text-center border border-info border-2 rounded px-lg-5 py-lg-4">
        <div className="text-start mb-0">
          <Link href="/">
            <a className="text-decoration-none">
              <div className="d-flex align-items-center">
                <div className="h4 mb-0">
                  <i className="bi-arrow-left"></i>
                </div>
                <div className="ms-2">
                  Back
                </div>
              </div>
            </a>
          </Link>
        </div>

        <h2 className="h1 text-info mt-4 mb-0">
          2pi.network
        </h2>

        <h3 className="h1 text-info">
          Referral program
        </h3>

        <div className="row justify-content-md-center">
          <div className="col-lg-7">
            <p className="lead mt-4">
              Share the referral link below to invite your friends and earn 1% of your friends earnings.
            </p>
          </div>
        </div>

        {(isConnected) ? <ReferralLink /> : <ReferralUnlock />}
      </div>
    </div>
  )
}

export default Referral
