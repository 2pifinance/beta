import { Contract } from 'ethers'
import { useStore, dropNotificationGroup } from '../../store'
import { notify, notifySuccess, notifyError } from '../../store/notifications'

const Mint = ({ chainId }) => {
  const [ { wallet }, dispatch ] = useStore()
  const signer                   = wallet?.provider.getSigner()
  const address                  = addresses[chainId]
  const contract                 = signer && address && new Contract(address, abi, signer)

  const mint = async () => {
    dispatch(dropNotificationGroup('mint'))

    try {
      const transaction = await contract.mint()

      dispatch(mintSent(transaction.hash))

      const receipt = await transaction.wait()

      dispatch(dropNotificationGroup('mint'))
      dispatch(mintSuccess(receipt.transactionHash))

    } catch (error) {
      dispatch(mintError(error))
    }
  }

  if (contract) {
    return (
      <div className="alert alert-info bg-blur text-center mb-5 py-3">
        <span className="me-3">Get some test tokens and try the app: </span>

        <button className="btn btn-sm btn-primary" onClick={mint}>
          Mint test tokens
        </button>
      </div>
    )
  } else {
    return null
  }
}

export default Mint



// STATIC CONTRACT DATA

const addresses = {
  43113: '0x49b78c682a2ed1b3b3565dea8f5b81706a028ea7',
  80001: '0x90305218d28f3A75fDAA288c0ed143Fa6F2efC88'
}

const abi     = [
  {
    'inputs':          [],
    'stateMutability': 'nonpayable',
    'type':            'constructor'
  },
  {
    'inputs':          [],
    'name':            'mint',
    'outputs':         [],
    'stateMutability': 'nonpayable',
    'type':            'function'
  }
]



// -- HELPERS --

const mintSent = () => {
  return notify('mint', 'Tokens mint has been sent.')
}

const mintSuccess = () => {
  return notifySuccess('mint', 'Mint was successful.')
}

const mintError = error => {
  const message = error?.message || 'An error occurred.'

  return notifyError('mint', message)
}
