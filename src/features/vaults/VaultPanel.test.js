import BigNumber from 'bignumber.js'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import VaultPanel from './VaultPanel'

const mockStore = configureStore([])

const vault = {
  id:            'polygon-dai-aave',
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

describe('VaultPanel component', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: { chainId: 137 }
    }

    store = mockStore(initialState)
  })

  test('VaultPanel component renders', () => {
    const props = { vault, connected: true }

    render(
      <Provider store={store}>
        <VaultPanel {...props} />
      </Provider>
    )

    const elements = [
      ...screen.getAllByText(/Deposit/),
      ...screen.getAllByText(/Withdraw/)
    ]

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
