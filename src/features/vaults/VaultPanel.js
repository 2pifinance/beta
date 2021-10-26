import PropTypes from 'prop-types'
import { ARCHIMIDES_ADDRESS } from '../../data/constants'
import { getBlockExplorerUrl } from '../../data/networks'
import WalletButton from '../../components/walletButton'
import Claim from './Claim'
import Deposit from './Deposit'
import Withdraw from './Withdraw'

export const VaultPanel = ({ vault, connected, onUpdate }) => {
  if (! connected)     return <WalletPrompt />
  if (! vault.balance) return <Loading />

  return (
    <div className="vault-panel mt-3 mb-5 mx-5 pt-5">
      <div className="row justify-content-lg-start mb-4">
        <div className="col col-4">
          <ContractLink chainId={vault.chainId} />
        </div>

        <div className="col col-lg-4 text-end text-lg-center">
          <Claim vault={vault} onUpdate={onUpdate} />
        </div>
      </div>

      <div className="vault-panel-actions row">
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

VaultPanel.propTypes = {
  vault:     PropTypes.object.isRequired,
  connected: PropTypes.bool.isRequired,
  onUpdate:  PropTypes.func
}

export default VaultPanel

const WalletPrompt = () => (
  <div className="mt-3 mb-5 mx-5">
    <div className="vault-panel-connect text-center py-4">
      <span className="me-3">Connect your wallet to take off</span>

      <WalletButton />
    </div>
  </div>
)

const Loading = () => (
  <div className="vault-panel mt-3 mb-5 mx-5 pt-5">
    <p className="text-center">Loading...</p>
  </div>
)

const ContractLink = ({ chainId }) => {
  const explorerUrl = getBlockExplorerUrl(chainId)

  if (! explorerUrl) return null

  const url = `${explorerUrl}/address/${ARCHIMIDES_ADDRESS}`

  return (
    <a className="link-primary" href={url} target="_blank" rel="noreferrer">
      Contract <i className="bi-box-arrow-up-right"></i>
    </a>
  )
}

ContractLink.propTypes = {
  chainId: PropTypes.number.isRequired
}
