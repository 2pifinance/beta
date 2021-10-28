import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { useStore, dropNotificationGroup } from '../../store'
import { notify, notifySuccess, notifyError } from '../../store/notifications'

const Mint = () => {
  const [ { wallet }, dispatch ] = useStore()
  const provider                 = wallet && new Web3Provider(wallet.provider)
  const signer                   = provider?.getSigner()
  const contract                 = signer && new ethers.Contract(address, abi, signer)

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
    <div className="d-flex align-items-center justify-content-center bg-blur border border-primary rounded mb-5 p-3"
          style={{ boxShadow: 'inset 0px 0px 6px hsl(197, 75%, 55%)' }}>
      <span className="text-primary me-3">Get some test tokens and try the app: </span>

      <button className="btn btn-sm btn-outline-primary" onClick={mint}>
        Mint test tokens
      </button>
    </div>
  )
}

export default Mint



// STATIC CONTRACT DATA

const address = '0x0e478b6a45da53e04d90d52e39c6a7963897d5cf'
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
