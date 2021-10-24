import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Header from './Header'

const mockStore = configureStore([])

describe('header component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders 2pi network link', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    const linkElement = screen.getAllByText(/Vaults/i)[0]

    expect(linkElement).toBeInTheDocument()
  })
})
