import BigNumber from 'bignumber.js'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import VaultsTable from './VaultsTable'

const mockStore = configureStore([])

const dai = {
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

const vaults = [ dai ]

describe('VaultsTable component', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('VaultsTable component renders', () => {
    render(
      <Provider store={store}>
        <VaultsTable vaults={vaults} connected={true} />
      </Provider>
    )

    const elements = screen.getAllByText(/Balance/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
