import BigNumber from 'bignumber.js'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Deposit from './Deposit'

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

describe('Deposit component', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('Deposit component renders', () => {
    render(
      <Provider store={store}>
        <Deposit vault={vault} />
      </Provider>
    )

    const elements = screen.getAllByText(/Deposit/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
