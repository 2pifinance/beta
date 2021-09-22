import Back from './back'
import AirdropDetails from './airdropDetails'
import AirdropUnlock from './airdropUnlock'
import { useSelector } from 'react-redux'
import { selectStatus } from '../features/walletSlice'

const AirdropClaim = () => {
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
          Airdrop
        </h3>

        <div className="row justify-content-md-center">
          <div className="col-lg-7">
            <p className="lead mt-4">
              Claim your Airdrop here.
            </p>
          </div>
        </div>

        {status === 'success' ? <AirdropDetails /> : <AirdropUnlock />}
      </div>
    </div>
  )
}

export default AirdropClaim
