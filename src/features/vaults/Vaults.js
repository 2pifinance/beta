import React, { useState, useEffect } from 'react'
import { DEFAULT_CHAIN } from '../../data/constants'
import { networks, isSupportedNetwork } from '../../data/networks'
import { addChain } from '../../data/wallet'
import { useStore, dropNotificationGroup } from '../../store'
import { notifyError } from '../../store/notifications'
import { getVaults, useVaults } from './utils/vaults'
import VaultsHeader from './VaultsHeader'
import VaultsTable from './VaultsTable'
import Mint from '../mint/Mint'

const Vaults = () => {
  const [ { wallet }, dispatch ] = useStore()
  const [ chainId, setChainId ]  = useState(wallet?.chainId || DEFAULT_CHAIN)
  const [ vaults, setVaults ]    = useVaults(chainId, wallet)
  const isConnected              = (wallet !== undefined)

  const addChainToWallet = chainId => {
    const network = networks[chainId]

    const errorHandler = () => {
      dispatch(dropNotificationGroup('wallet'))
      dispatch(unsupportedNetworkError(network))
    }

    // Avoid awaiting here, it hangs without error on some clients.
    addChain(wallet, network).catch(errorHandler)
  }

  // Get chain id from wallet
  useEffect(() => {
    const newChainId = getChainId(wallet, chainId)

    if (wallet && newChainId === 0) {
      addChainToWallet(chainId || DEFAULT_CHAIN)
    }

    // When the wallet's network is unsupported, prompt the wallet to switch
    // to the current network but change `chainId` anyway and display
    // "Unsupported Network" until the wallet switches to a supported one.
    setChainId(newChainId)
  }, [ wallet ])

  // Get chain id from network selector
  const onChainChange = chainId  => {
    if (wallet) {
      addChainToWallet(chainId)
    }

    setChainId(chainId)
  }

  const onUpdate = async () => {
    const vaults = await getVaults(chainId, wallet)

    setVaults(vaults)
  }

  return (
    <React.Fragment>
      <VaultsHeader chainId={chainId} vaults={vaults} connected={isConnected}
                    onChainChange={onChainChange} />

      {(isConnected && vaults) ? <Mint chainId={chainId} /> : null }

      {(vaults)
         ? <VaultsTable vaults={vaults} connected={isConnected} onUpdate={onUpdate} />
         : <Loading />
      }
    </React.Fragment>
  )
}

export default Vaults

const Loading = () => (
  <div className="text-center my-8">
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
)



// -- HELPERS --

const getChainId = (wallet, currentChainId) => {
  if (! wallet) {
    // Avoid selecting an unsupported network when wallet is not conencted
    return currentChainId || DEFAULT_CHAIN
  }

  return isSupportedNetwork(wallet.chainId) ? wallet.chainId : 0
}

const unsupportedNetworkError = ({ chainName }) => {
  return notifyError('wallet',
    `Please add the ${chainName} network to your wallet in order to operate on it.`
  )
}
