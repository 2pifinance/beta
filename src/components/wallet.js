import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SUPPORTED_CHAINS } from '../data/constants'
import { errorToastAdded, toastDestroyed } from '../features/toastsSlice'
import {
  selectProvider,
  disconnectAsync,
  addressChanged,
  chainChanged
} from '../features/walletSlice'

const useProvider = () => {
  const dispatch = useDispatch()
  const provider = useSelector(selectProvider)

  useEffect(() => {
    if (! provider?.on) return

    const onDisconnect = () => {
      dispatch(disconnectAsync())
    }

    const onChainChanged = chainId => {
      // Hex to decimal conversion
      chainId = +chainId

      dispatch(chainChanged({ chainId }))

      if (! SUPPORTED_CHAINS.includes(chainId)) {
        const title   = 'Unsupported network.'
        const message = 'Switch your wallet to a supported network.'

        dispatch(toastDestroyed(title))
        dispatch(errorToastAdded(title, message))
      }
    }

    const onAccountsChanged = () => {
      const address = provider.selectedAddress || undefined

      dispatch(addressChanged({ address }))
    }

    provider.on('close', onDisconnect)
    provider.on('disconnect', onDisconnect)
    provider.on('chainChanged', onChainChanged)
    provider.on('accountsChanged', onAccountsChanged)

    return () => {
      provider.removeListener('close', onDisconnect)
      provider.removeListener('disconnect', onDisconnect)
      provider.removeListener('chainChanged', onChainChanged)
      provider.removeListener('accountsChanged', onAccountsChanged)
    }
  }, [ dispatch, provider ])
}

const Wallet = ({ children }) => {
  useProvider()

  return children
}

export default Wallet
