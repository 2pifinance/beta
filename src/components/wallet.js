import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

    const onClose        = ()      => dispatch(disconnectAsync())
    const onDisconnect   = ()      => dispatch(disconnectAsync())
    const onChainChanged = chainId => dispatch(chainChanged({ chainId }))

    const onAccountsChanged = () => {
      const address = provider.selectedAddress || undefined

      dispatch(addressChanged({ address }))
    }

    provider.on('close', onClose)
    provider.on('disconnect', onDisconnect)
    provider.on('chainChanged', onChainChanged)
    provider.on('accountsChanged', onAccountsChanged)

    return () => {
      provider.removeListener('close', onClose)
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
