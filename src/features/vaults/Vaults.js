import React, { useState, useEffect } from 'react'
import { DEFAULT_CHAIN } from '../../data/constants'
import { networks, isSupportedNetwork } from '../../data/networks'
import { addChain } from '../../data/wallet'
import { useStore } from '../../store'
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

  // Get chain id from wallet
  useEffect(() => {
    if (!wallet || !isSupportedNetwork(wallet.chainId)) return

    setChainId(wallet.chainId)
  }, [ wallet ])

  // Get chain id from network selector
  const onChainChange = chainId  => {
    if (wallet) {
      const network      = networks[chainId]
      const errorHandler = () => dispatch(unsupportedNetworkError(network.chainName))

      // Prompt wallet to add the current chain.
      // Avoid awaiting here, it hangs without error on some clients.
      addChain(wallet, network).catch(errorHandler)
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

      {(isConnected) ? <Mint /> : null }

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

const unsupportedNetworkError = name => {
  return notifyError('wallet', `Add the ${name} network to your wallet to operate.`)
}
