const localhostVauls = [
  {
    key:     '2pi',
    token:   '2pi',
    earn:    '2PI',
    priceId: 'dai',
    uses:    'Aave',
    pool:    'aave',
    symbol:  '2PI',
    pid:     '0',
    color:   'primary',
    borrow:  { depth: 0, percentage: 0.73 }
  }
]

const polygonVaults = [
  {
    key:     '2Pi',
    token:   '2Pi',
    earn:    '2PI',
    priceId: 'dai',
    uses:    '2Pi',
    symbol:  '2PI',
    color:   'primary',
    borrow:  { depth: 0, percentage: 0 }
  },
  // {
  //   key:     'btc-curve',
  //   token:   'btc',
  //   earn:    'BTC',
  //   priceId: 'bitcoin',
  //   uses:    'Curve',
  //   pool:    'curve',
  //   symbol:  'BTC',
  //   pid:     '1111', // Should be fixed
  //   color:   'info',
  //   borrow:  {}
  // },
  {
    key:     'dai',
    token:   'dai',
    earn:    'DAI',
    priceId: 'dai',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'DAI',
    pid:     '1',
    color:   'primary',
    borrow:  { depth: 8, percentage: 0.73 }
  },
  // {
  //   key:     'matic',
  //   token:   'matic',
  //   earn:    'MATIC',
  //   priceId: 'matic-network',
  //   uses:    'Aave',
  //   pool:    'aave',
  //   symbol:  'MATIC',
  //   pid:     '0',
  //   color:   'primary-dark',
  //   borrow:  { depth: 8, percentage: 0.48 }
  // },
  // {
  //   key:     'btc',
  //   token:   'btc',
  //   earn:    'BTC',
  //   priceId: 'bitcoin',
  //   uses:    'Aave',
  //   pool:    'aave',
  //   symbol:  'BTC',
  //   pid:     '5',
  //   color:   'info',
  //   borrow:  { depth: 8, percentage: 0.68 }
  // },
  // {
  //   key:     'eth',
  //   token:   'eth',
  //   earn:    'ETH',
  //   priceId: 'ethereum',
  //   uses:    'Aave',
  //   pool:    'aave',
  //   symbol:  'ETH',
  //   pid:     '4',
  //   color:   'primary',
  //   borrow:  { depth: 8, percentage: 0.78 }
  // },
  // {
  //   key:     'usdc',
  //   token:   'usdc',
  //   earn:    'USDC',
  //   priceId: 'usd-coin',
  //   uses:    'Aave',
  //   pool:    'aave',
  //   symbol:  'USDC',
  //   pid:     '3',
  //   color:   'primary-dark',
  //   borrow:  { depth: 8, percentage: 0.78 }
  // },
  // {
  //   key:     'usdt',
  //   token:   'usdt',
  //   earn:    'USDT',
  //   priceId: 'tether',
  //   uses:    'Aave',
  //   pool:    'aave',
  //   symbol:  'USDT',
  //   pid:     '2',
  //   color:   'info',
  //   borrow:  { depth: 0, percentage: 0 }
  // }
]

const vaults = {
  137:   polygonVaults,
  1337:  localhostVauls,
  80001: polygonVaults // .filter(vault => vault.pool === 'aave')
}

export default vaults
