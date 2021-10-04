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

    const networkNameElement = screen.getByText('Polygon')

    expect(networkNameElement).toBeInTheDocument()
  })
})
