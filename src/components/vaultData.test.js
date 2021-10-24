import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import VaultData from './vaultData'

const mockStore = configureMockStore([thunk])

describe('vault data component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      vaults: {
        value: {
          137: [
            {
              id:     'polygon-dai-aave',
              earn:   'xDAI',
              pid:    '0',
              pool:   'aave',
              symbol: 'DAI',
              token:  'dai'
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

  test('renders vault data', () => {
    const props = {
      id:   'polygon-dai-aave',
      earn: 'xDAI'
    }

    render(
      <Provider store={store}>
        <VaultData {...props} />
      </Provider>
    )

    const titleElement = screen.getByText(props.earn)

    expect(titleElement).toBeInTheDocument()
  })
})
