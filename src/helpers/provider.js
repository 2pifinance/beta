const networkNames = {
  137:   'matic',
  1337:  'local',
  80001: 'matic-mumbai'
}

const rpc = {
  137:   'https://polygon-rpc.com/',
  1337:  'http://localhost:8545',
  80001: 'https://matic-mumbai.chainstacklabs.com/'
}

export const getDefaultProvider = chainId => {
  const name             = networkNames[chainId]
  const url              = rpc[chainId]
  const _defaultProvider = providers => new providers.JsonRpcProvider(url)

  return { name, chainId, _defaultProvider }
}
