import Web3 from 'web3'
import { createWalletModal } from '../lib/wallet'

export const createSession = async () => {
  const modal       = createWalletModal()
  const provider    = await modal.requestProvider()
  const web3        = new Web3(provider)
  const chainId     = await web3.eth.getChainId()
  const [ address ] = await web3.eth.getAccounts()

  // Return current wallet state
  return { address, chainId, provider, web3, modal }
}

export const destroySession = async wallet => {
  if (! wallet) return

  const { modal, provider } = wallet

  if (provider.close) {
    await provider.close()
  }

  if (modal.clearCachedProvider) {
    await modal.clearCachedProvider()
  }

  // Return current wallet state
  return null
}

// NOTE: Don't rely on this ever resolving.
// On some clients `provider.request` _hangs_ without error.
export const addChain = async (wallet, networkSettings) => {
  const provider = wallet.provider
  const method   = 'wallet_addEthereumChain'

  await provider.request({ method, params: [ networkSettings ] })
}
