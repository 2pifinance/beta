import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import VaultActions from './vaultActions'

const mockStore = configureStore([])

describe('vault actions component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      vaults: {
        value: []
      },
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders vault actions', () => {
    const props = {
      allowance:         undefined,
      apy:               10,
      balance:           undefined,
      decimals:          undefined,
      deposited:         undefined,
      pid:               undefined,
      pool:              undefined,
      pricePerFullShare: undefined,
      symbol:            'DAI',
      token:             'dai',
      vaultDecimals:     undefined
    }

    render(
      <Provider store={store}>
        <VaultActions {...props}/>
      </Provider>
    )

    const connectButtonElement = screen.getByText('Connect')

    expect(connectButtonElement).toBeInTheDocument()
  })
})
