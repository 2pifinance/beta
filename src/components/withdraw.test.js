import BigNumber from 'bignumber.js'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Withdraw from './withdraw'

const mockStore = configureStore([])

describe('withdraw component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders withdraw', () => {
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

    render(
      <Provider store={store}>
        <Withdraw vault={vault} />
      </Provider>
    )

    const buttonElement = screen.getByText(/Withdraw/i)

    expect(buttonElement).toBeInTheDocument()
  })
})
