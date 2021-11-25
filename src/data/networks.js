import { arbitrumMainnet, arbitrumTestnet } from './networks/arbitrum'
import { avalancheMainnet, avalancheTestnet } from './networks/avalanche'
import { polygonMainnet, polygonTestnet } from './networks/polygon'
import { SUPPORTED_CHAINS } from './constants'

// NOTE: Always add trailing slashes to network URLs.
// https://github.com/MetaMask/metamask-extension/issues/3245
export const networks = {
  // Arbitrum
  42161:  arbitrumMainnet,
  421611: arbitrumTestnet,

  // Avalanche
  43114:  avalancheMainnet,
  43113:  avalancheTestnet,

  // Polygon
  137:    polygonMainnet,
  80001:  polygonTestnet
}

export const isSupportedNetwork = chainId => {
  return SUPPORTED_CHAINS.includes(chainId)
}

export const getRpcUrl = chainId => {
  const network = networks[chainId]

  return network?.rpcUrls.find(_ => true)
}

export const getBlockExplorerUrl = chainId => {
  const network = networks[chainId]

  return network?.blockExplorerUrls.find(_ => true)
}
