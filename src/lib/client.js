import { JsonRpcProvider, getDefaultProvider } from '@ethersproject/providers'
import { TwoPi } from '@2pi-network/js-sdk'
import doGetPrices from '@2pi-network/js-sdk/dist/fetchers/prices'

const APYS_API_URL  = process.env.NEXT_PUBLIC_APYS_API_URL
const clients       = {}
let   currentWallet = undefined

export const getPrices = async chainId => {
  return doGetPrices(getClient(chainId, currentWallet))
}

export const getApys = async () => {
  const cacheInvalidator = Math.trunc(Date.now() / (1000 * 60))

  const url      = `${APYS_API_URL}?_=${cacheInvalidator}`
  const options  = { headers: { 'Content-Type': 'application/json' } }
  const response = await fetch(url, options)

  if (! response.ok)
    throw new TypeError(response.status)

  return response.json()
}

export const getVaults = (chainId, wallet) => {
  return getClient(chainId, wallet).getVaults()
}



// -- HELPERS --

const networks = {
  1337:   { name: 'local',            rpcUrl: 'http://localhost:8545/' },
  42161:  { name: 'arbitrum',         rpcUrl: 'https://arb1.arbitrum.io/rpc/' },
  421611: { name: 'arbitrum-rinkeby', rpcUrl: 'https://rinkeby.arbitrum.io/rpc/' },
  43113:  { name: 'avalanche-fuji',   rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc' },
  137:    { name: 'matic',            rpcUrl: 'https://polygon-rpc.com/' },
  80001:  { name: 'matic-mumbai',     rpcUrl: 'https://matic-mumbai.chainstacklabs.com/' }
}

const getClient = (chainId, wallet) => {
  let client = clients[chainId]

  if (!client || wallet !== currentWallet) {
    const provider = getEthersProvider(chainId, wallet)
    const signer   = wallet && provider.getSigner()

    client = new TwoPi(chainId, provider, signer)

    // Update cache
    currentWallet    = wallet
    clients[chainId] = client
  }

  return client
}

const getEthersProvider = (chainId, wallet) => {
  return (wallet)
    ? wallet.provider
    : getDefaultProvider(getEthersNetwork(chainId))
}

const getEthersNetwork = chainId => {
  const { name, rpcUrl } = networks[chainId]
  const _defaultProvider = () => new JsonRpcProvider(rpcUrl)

  return { name, chainId, _defaultProvider }
}
