const localhostVauls = [
  {
    id:      'local-2pi-2pi',
    token:   '2pi',
    earn:    '2PI',
    uses:    'Aave',
    pool:    'aave',
    symbol:  '2PI',
    pid:     '0',
    color:   'primary',
  }
]

const polygonVaults = [
  {
    id:      'polygon-btc-curve',
    token:   'btc',
    earn:    'BTC',
    uses:    'Curve',
    pool:    'curve',
    symbol:  'BTC',
    pid:     '1111', // Should be fixed
    color:   'info',
  },
  {
    id:      'polygon-dai-aave',
    token:   'dai',
    earn:    'DAI',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'DAI',
    pid:     '1',
    color:   'primary',
  },
  {
    id:      'polygon-matic-aave',
    token:   'matic',
    earn:    'MATIC',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'MATIC',
    pid:     '0',
    color:   'primary-dark',
  },
  {
    id:      'polygon-btc-aave',
    token:   'btc',
    earn:    'BTC',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'BTC',
    pid:     '5',
    color:   'info',
  },
  {
    id:      'polygon-eth-aave',
    token:   'eth',
    earn:    'ETH',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'ETH',
    pid:     '4',
    color:   'primary',
  },
  {
    id:      'polygon-usdc-aave',
    token:   'usdc',
    earn:    'USDC',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'USDC',
    pid:     '3',
    color:   'primary-dark',
  },
  {
    id:      'polygon-usdt-aave',
    token:   'usdt',
    earn:    'USDT',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'USDT',
    pid:     '2',
    color:   'info',
  }
]

const vaults = {
  1337: localhostVauls,

  // Arbitrum
  42161:  [],
  421611: [],

  // Polygon
  137:   polygonVaults.filter(v => v.pool),
  80001: polygonVaults.filter(v => v.pool === 'aave' || v.pool === undefined)
}

export default vaults
