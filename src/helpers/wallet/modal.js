import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal'
import { walletConnect, walletLink } from './providers'

const providerOptions = {
  walletconnect:       walletConnect,
  'custom-walletlink': walletLink
}

const modalOptions = {
  providerOptions,
  cacheProvider: true,
  theme:         'dark'
}

export const createWalletModal = () => {
  return new SafeAppWeb3Modal(modalOptions)
}
