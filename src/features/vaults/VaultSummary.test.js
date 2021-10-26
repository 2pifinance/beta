import BigNumber from 'bignumber.js'
import { render, screen } from '@testing-library/react'
import VaultSummary from './VaultSummary'

const vault = {
  id:            'polygon-dai-aave',
  chainId:       137,
  symbol:        'DAI',
  token:         'dai',
  tokenDecimals: 18,
  earn:          'DAI',
  uses:          'Aave',
  apy:           new BigNumber(0.17),
  allowance:     new BigNumber(0),
  deposited:     new BigNumber(0),
  balance:       new BigNumber(0),
  sharePrice:    new BigNumber(1.5),
  vaultDecimals: 18,
  tvl:           new BigNumber(1000),
  price:         new BigNumber(1),
}

describe('VaultSummary component', () => {
  test('VaultSummary component renders', () => {
    const props = { vault, connected: true }

    render(<VaultSummary {...props} />)

    const elements = screen.getAllByText(/Uses/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
