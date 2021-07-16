import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import VaultDetails from './vaultDetails'

const mockStore = configureStore([])

describe('vault details', () => {
  let store

  beforeEach(() => {
    const initialState = {
      vaults: {
        value: {
          137: [
            {
              key:    'dai',
              symbol: 'xDAI'
            }
          ]
        }
      },
      wallet: {
        chainId: 137
      }
    }

    store = mockStore(initialState)
  })

  test('renders vault', () => {
    const props = {
      vault: {
        key:     'dai',
        token:   'dai',
        earn:    'DAI',
        priceId: 'dai',
        uses:    'Aave',
        pool:    'aave',
        symbol:  'xDAI',
        pid:     '3',
        color:   'primary',
        borrow:  { depth: 8, percentage: 0.73 }
      }
    }

    render(
      <Provider store={store}>
        <VaultDetails {...props}/>
      </Provider>
    )

    const earnElement = screen.getByText(props.vault.symbol)

    expect(earnElement).toBeInTheDocument()
  })
})
