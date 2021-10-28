import { useStore } from '../store'
import { connectAsync, disconnectAsync } from '../store/wallet'

const WalletButton = () => {
  const [ state, dispatch ] = useStore()

  return (
    <button type="button" onClick={buttonAction(state, dispatch)}
            className="btn btn-outline-primary" disabled={state.isConnecting}>
      <span className="me-2">
        <i className={buttonIcon(state)}></i>
      </span>

      {buttonLabel(state)}
    </button>
  )
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
