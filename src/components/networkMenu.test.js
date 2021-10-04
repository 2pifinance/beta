import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import NetworkMenu from './networkMenu'

const mockStore = configureStore([])

describe('network menu component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {
        chainId: 137
      }
    }

    store = mockStore(initialState)
  })

  test('renders network menu', () => {
    render(
      <Provider store={store}>
        <NetworkMenu />
      </Provider>
    )

    const arbitrumElement = screen.getByText('Arbitrum')
    const polygonElement  = screen.getByText('Polygon')

    expect(arbitrumElement).toBeInTheDocument()
    expect(polygonElement).toBeInTheDocument()
  })
})
