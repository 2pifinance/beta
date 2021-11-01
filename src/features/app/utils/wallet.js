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
  }, [ wallet ])
}



// -- HELPERS --

const walletSub = (wallet, handler) => {
  // Ethers providers don't emit EIP-1193 events ("wallet events"),
  // use the original wrapped provider instead.
  // https://github.com/ethers-io/ethers.js/issues/1396#issuecomment-806380431
  const provider = wallet.provider.provider

  // Not all wallets provide an `on` method.
  if (! provider.on) return

  const onAccountsChanged = ([ address ]) => {
    // Wallet is locked or the user disconnected all accounts
    if (! address) {
      return handler(null)
    }

    handler({ ...wallet, address })
  }

  const onChainChanged = chainId => {
    // Hex to decimal conversion
    chainId = +chainId

    handler({ ...wallet, chainId })
  }

  // EIP-1139 events (wallet events)
  // https://eips.ethereum.org/EIPS/eip-1193#events-1
  provider.on('accountsChanged', onAccountsChanged)
  provider.on('chainChanged', onChainChanged)

  return () => {
    provider.removeListener('accountsChanged', onAccountsChanged)
    provider.removeListener('chainChanged', onChainChanged)
  }
}
