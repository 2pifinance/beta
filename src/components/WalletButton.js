import PropTypes from 'prop-types'
import { useStore } from '../store'
import { connectAsync, disconnectAsync } from '../store/wallet'

const WalletButton = ({ className }) => {
  const [ state, dispatch ] = useStore()

  return (
    <button type="button" className={className} disabled={state.isConnecting}
            onClick={buttonAction(state, dispatch)}>
      <span className="me-2">
        <i className={buttonIcon(state)}></i>
      </span>

      {buttonLabel(state)}
    </button>
  )
}

WalletButton.propTypes = {
  className: PropTypes.string
}

export default WalletButton



// -- HELPERS --

const abbreviateAddress = address => {
  return `${address.substr(0, 6)}...${address.substr(38, 42)}`
}

const buttonLabel = ({ isConnecting, wallet }) => {
  if (! wallet)     return 'Connect'
  if (isConnecting) return 'Connecting...'

  return abbreviateAddress(wallet.address)
}

const buttonIcon = ({ wallet }) => {
  return (wallet)
    ? 'bi-wallet-fill'
    : 'bi-plug-fill'
}

const buttonAction = ({ isConnecting, wallet }, dispatch) => {
  if (isConnecting) return undefined

  return (wallet)
    ? () => dispatch(disconnectAsync())
    : () => dispatch(connectAsync())
}
