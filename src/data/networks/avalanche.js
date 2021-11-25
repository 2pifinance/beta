//
// Avalanche
//

export const avalancheMainnet = {
  chainId:   `0x${parseInt(43114).toString(16)}`,
  chainName: 'Avalanche Mainnet',
  nativeCurrency: {
    name:     'AVAX',
    symbol:   'AVAX',
    decimals: 18,
  },
  rpcUrls:           [ 'https://api.avax.network/ext/bc/C/rpc/' ],
  blockExplorerUrls: [ 'https://snowtrace.io/' ]
}

export const avalancheTestnet = {
  chainId:   `0x${parseInt(43113).toString(16)}`,
  chainName: 'Avalanche Testnet (Fuji)',
  nativeCurrency: {
    name:     'AVAX',
    symbol:   'AVAX',
    decimals: 18,
  },
  rpcUrls:           [ 'https://api.avax-test.network/ext/bc/C/rpc/' ],
  blockExplorerUrls: [ 'https://testnet.snowtrace.io/' ]
}
