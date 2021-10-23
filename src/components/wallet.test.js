import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Wallet from './wallet'

const mockStore = configureStore([])

describe('wallet component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders wallet', () => {
    render(
      <Provider store={store}>
        <Wallet>
          <p>Test child</p>
        </Wallet>
      </Provider>
    )

    const childElement = screen.getByText('Test child')

    expect(childElement).toBeInTheDocument()
  })
})
