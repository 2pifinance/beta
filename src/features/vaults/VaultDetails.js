import PropTypes from 'prop-types'
import { getContractUrl } from './utils/vaults'
import WalletButton from '../../components/WalletButton'
import Claim from './Claim'
import Deposit from './Deposit'
import Withdraw from './Withdraw'

const AddLiquidityLink = ({ vault }) => {
  if (vault.tokenInstance.type === 'lp') {
    const url = vault.tokenInstance.addLiquidityUrl()

    return (
      <a className="link-primary ms-3" href={url}
          target="_blank" rel="noreferrer">
        Add liquidity <i className="bi-box-arrow-up-right"></i>
      </a>
    )
  } else {
    return null
  }
}

export const VaultDetails = ({ vault, connected, onUpdate }) => {
  if (! connected)     return <WalletPrompt />
  if (! vault.balance) return <Loading />

  const hasRewards = (vault.token !== '2pi')

  return (
    <div className="vault-details mt-3 mb-5 mx-5 pt-5">
      <div className="row justify-content-lg-start mb-4">
        <div className="col col-4">
          <a className="link-primary" href={getContractUrl(vault)}
             target="_blank" rel="noreferrer">
            Contract <i className="bi-box-arrow-up-right"></i>
          </a>
          <AddLiquidityLink vault={vault} />
        </div>

        <div className="col col-lg-4 text-end text-lg-center">
          {(hasRewards) ? <Claim vault={vault} onUpdate={onUpdate} /> : null}
        </div>
      </div>

      <div className="vault-details-actions row">
        <div className="col-lg pe-lg-5">
          <Deposit vault={vault} onUpdate={onUpdate} />
        </div>

        <div className="col-lg pt-5 pt-lg-0 ps-lg-5">
          <Withdraw vault={vault} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  )
}

VaultDetails.propTypes = {
  vault:     PropTypes.object.isRequired,
  connected: PropTypes.bool,
  onUpdate:  PropTypes.func
}

export default VaultDetails

const WalletPrompt = () => (
  <div className="alert alert-info text-center mt-3 mb-6 mx-8" role="alert">
    <span className="me-3">Connect your wallet to take off</span>

    <WalletButton />
  </div>
)

const Loading = () => (
  <div className="vault-details mt-3 mb-5 mx-5 pt-5">
    <p className="text-center">Loading...</p>
  </div>
)
