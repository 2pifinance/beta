import { arbitrumMainnet, arbitrumTestnet } from './arbitrum'
import { polygonMainnet, polygonTestnet } from './polygon'

export const networks = {
  // Arbitrum
  42161:  arbitrumMainnet,
  421611: arbitrumTestnet,

  // Polygon
  137:    polygonMainnet,
  80001:  polygonTestnet
}

export const getRpcUrl = chainId => {
  const network = networks[chainId]

  return network?.rpcUrls.find(_ => true)
}

export const getBlockExplorerUrl = chainId => {
  const network = networks[chainId]

  return network?.blockExplorerUrls.find(_ => true)
}
