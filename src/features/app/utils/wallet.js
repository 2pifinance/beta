import { useEffect } from 'react'
import { useStore, connection } from '../../../store'

export const useWallet = () => {
  const [ { wallet }, dispatch ] = useStore()

  useEffect(() => {
    if (! wallet) return

    // Subscribe to wallet changes
    const onWalletChange  = newWallet => dispatch(connection(newWallet))
    const cancelWalletSub = walletSub(wallet, onWalletChange)

    return cancelWalletSub
  }, [ wallet, dispatch ])
}



// -- HELPERS --

const walletSub = (wallet, handler) => {
  const provider = wallet.provider

  const onDisconnect = () => {
    handler(null)
  }

  const onChainChanged = chainId => {
    // Hex to decimal conversion
    chainId = +chainId

    handler({ chainId, ...wallet })
  }

  const onAccountsChanged = () => {
    const address = provider.selectedAddress || undefined

    handler({ address, ...wallet })
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
}
