import { render, screen } from '@testing-library/react'
import VaultItem from './vaultItem'

test('renders vault', () => {
  const props = {
    apy:       undefined,
    balance:   undefined,
    color:     'info',
    deposited: undefined,
    earn:      'xDAI',
    price:     undefined,
    symbol:    'DAI',
    token:     'dai',
    tvl:       undefined,
    uses:      'aave',
    vaultId:   'dai'
  }

  render(<VaultItem {...props}/>)

  const tokenHeaderElement = screen.getByText(props.symbol)
  const usesHeaderElement  = screen.getByText(props.uses)

  expect(tokenHeaderElement).toBeInTheDocument()
  expect(usesHeaderElement).toBeInTheDocument()
})
