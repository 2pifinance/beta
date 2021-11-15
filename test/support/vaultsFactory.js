import BigNumber from 'bignumber.js'
import { Token } from '@2pi-network/js-sdk'

export const buildVault = (data = {}) => {
  return {
    // Static data
    id:             'polygon-dai-aave',
    chainId:        137,
    address:        '0x3B353b1CBDDA3A3D648af9825Ee34d9CA816FD38',
    symbol:         'DAI',
    token:          'dai',
    earn:           'DAI',
    uses:           'Aave',
    tokenInstance:  new Token({ name: 'dai', chainId: 137 }),

    // Vault data
    apy:            0.17,
    vaultApy:       0.17,
    rewardsApr:     0,
    withdrawalFee:  new BigNumber(10),
    tokenDecimals:  new BigNumber(18),
    price:          new BigNumber(1),
    quota:          new BigNumber(9999),
    availableQuota: new BigNumber(8999),
    tvl:            new BigNumber(1000),
    isPaused:       false,

    // Wallet data
    allowance:      new BigNumber(0),
    balance:        new BigNumber(0),
    deposited:      new BigNumber(0),
    sharesDecimals: new BigNumber(18),
    sharePrice:     new BigNumber(1.5),
    twoPiEarned:    new BigNumber(10),

    // Overwrites
    ...data,
  }
}
