import Web3 from 'web3'
import { SUPPORTED_CHAINS } from '../../data/constants'
import { networks } from '../../data/networks'
import { createWalletModal } from './modal'

let connection

export const connect = async () => {
  const modal       = createWalletModal()
  const provider    = await modal.requestProvider()
  const web3        = new Web3(provider)
  const chainId     = await web3.eth.getChainId()
  const [ address ] = await web3.eth.getAccounts()

  connection = { modal, provider, web3 }

  return { address, chainId, modal, provider, web3 }
}

export const disconnect = async () => {
  if (! connection) return

  const { modal, provider } = connection

  if (provider?.close) {
    await provider.close()
  }

  if (modal.clearCachedProvider) {
    await modal.clearCachedProvider()
  }

  connection = undefined
}

// NOTE: Don't rely on this ever resolving.
// On some clients `provider.request` _hangs_ without error.
export const addChain = async (chainId) => {
  if (chainId === 1337 || !SUPPORTED_CHAINS.includes(chainId)) return

  // Avoid requesting the user to add a network when
  // the wallet is not connected (bad practice).
  if (! connection) return

  const provider = connection.provider
  const settings = networks[chainId]
  const method   = 'wallet_addEthereumChain'

  await provider.request({ method, params: [ settings ] })
}
