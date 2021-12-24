//
// Avalanche
//

export const avalancheTestnet = {
  chainId:   `0x${parseInt(43113).toString(16)}`,
  chainName: 'Avalanche Testnet (Fuji)',
  nativeCurrency: {
    name:     'AVAX',
    symbol:   'AVAX',
    decimals: 18,
  },
  rpcUrls:           [ 'https://api.avax-test.network/ext/bc/C/rpc' ],
  blockExplorerUrls: [ 'https://testnet.snowtrace.io/' ]
}
