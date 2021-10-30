//
// Arbitrum
//

export const arbitrumMainnet = {
  chainId:   `0x${parseInt(42161).toString(16)}`,
  chainName: 'Arbitrum Mainnet',
  nativeCurrency: {
    name:     'ETH',
    symbol:   'ETH',
    decimals: 18,
  },
  rpcUrls:           [ 'https://arb1.arbitrum.io/rpc/' ],
  blockExplorerUrls: [ 'https://arbiscan.io/' ]
}

// Public Arbitrum Testnet
// https://developer.offchainlabs.com/docs/public_testnet
export const arbitrumTestnet = {
  chainId:   `0x${parseInt(421611).toString(16)}`,
  chainName: 'Arbitrum Testnet',
  nativeCurrency: {
    name:     'ETH',
    symbol:   'ETH',
    decimals: 18,
  },
  rpcUrls:           [ 'https://rinkeby.arbitrum.io/rpc/' ],
  blockExplorerUrls: [ 'https://rinkeby-explorer.arbitrum.io/' ]
}
