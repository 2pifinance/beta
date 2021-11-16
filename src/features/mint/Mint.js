import { Contract } from 'ethers'
import { useStore, dropNotificationGroup } from '../../store'
import { notify, notifySuccess, notifyError } from '../../store/notifications'

const Mint = () => {
  const [ { wallet }, dispatch ] = useStore()
  const signer                   = wallet?.provider.getSigner()
  const contract                 = signer && new Contract(address, abi, signer)

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

  return (
    <div className="alert alert-info bg-blur text-center mb-5 py-3">
      <span className="me-3">Get some test tokens and try the app: </span>

      <button className="btn btn-sm btn-primary" onClick={mint}>
        Mint test tokens
      </button>
    </div>
  )
}

export default Mint



// STATIC CONTRACT DATA

const address = '0x90305218d28f3A75fDAA288c0ed143Fa6F2efC88'
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
