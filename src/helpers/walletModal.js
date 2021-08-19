import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { networks } from '../data/networks'
import { walletConnect, walletLink } from './walletProviders'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import {
  addressChanged,
  chainChanged,
  defaultChain,
  disconnectAsync,
  supportedChains
} from '../features/walletSlice'

const providerOptions = {
  walletconnect:       walletConnect,
  'custom-walletlink': walletLink
}

const subscribe = (provider, dispatch) => {
  if (provider.on) {
    provider.on('close', () => {
      dispatch(disconnectAsync())
    })

    provider.on('disconnect', async () => {
      dispatch(disconnectAsync())
    })

    provider.on('accountsChanged', _accounts => {
      if (provider.selectedAddress) {
        const address = provider.selectedAddress

        dispatch(addressChanged({ address }))
      } else {
        dispatch(addressChanged({ address: undefined }))
      }
    })

    provider.on('chainChanged', chainId => {
      dispatch(chainChanged({ chainId }))
    })
  }
}

const extend = web3 => {
  web3.eth.extend({
    methods: [
      {
        name:            'chainId',
        call:            'eth_chainId',
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  })
}

const request = async (walletChainId, dispatch) => {
  const provider  = window.ethereum
  const supported = supportedChains.includes(walletChainId)
  const chainId   = supported ? walletChainId : defaultChain
  const settings  = networks[chainId]
  const chainName = settings?.chainName

  if (settings && provider?.request) {
    const toastTitle = `Network ${chainName} must be added to your wallet`

    dispatch(toastDestroyed(toastTitle))

    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [settings]
    }).catch(error => {
      dispatch(
        toastAdded({
          title:    toastTitle,
          body:     error.message,
          icon:     'exclamation-triangle',
          style:    'danger',
          autohide: true
        })
      )
    })
  }
}

const WalletModal = {
  async connect (dispatch) {
    const modalOpts = { cacheProvider: true, theme: 'dark', providerOptions }
    const modal     = new Web3Modal(modalOpts)
    const provider  = await modal.connect()
    const web3      = new Web3(provider)
    const [address] = await web3.eth.getAccounts()
    const chainId   = await web3.eth.getChainId()

    dispatch(chainChanged({ chainId }))
    extend(web3)
    subscribe(provider, dispatch)

    await request(chainId, dispatch)

    return { address, chainId, modal, provider, web3 }
  }
}

export default WalletModal
