import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { infoToastAdded, successToastAdded, errorToastAdded } from '../toastsSlice'
import { selectWallet } from '../walletSlice'

const Mint = () => {
  const dispatch = useDispatch()
  const wallet   = useSelector(selectWallet)
  const provider = wallet && new Web3Provider(wallet.provider)
  const signer   = provider?.getSigner()
  const contract = signer && new ethers.Contract(address, abi, signer)

  const mint = async () => {
    try {
      const transaction = await contract.mint()

      dispatch(mintSent(transaction.hash))

      const receipt = await transaction.wait()

      dispatch(mintSuccess(receipt.transactionHash))
    } catch (error) {
      dispatch(mintError(error))
    }
  }

  return (
    <button className="btn btn-sm btn-outline-primary" onClick={mint} disabled={! wallet}>
      Mint test tokens
    </button>
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
  return infoToastAdded('Mint sent', 'Test tokens mint has been sent.')
}

const mintSuccess = () => {
  return successToastAdded('Success', 'The mint was successful.')
}

const mintError = error => {
  const message = error?.message || 'An error occurred.'

  return errorToastAdded('Mint rejected', message)
}
