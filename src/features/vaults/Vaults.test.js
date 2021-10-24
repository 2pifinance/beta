import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Vaults from './Vaults'

const mockStore = configureStore([])

describe('Vaults component', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: { chainId: 137 }
    }

    store = mockStore(initialState)
  })

  test('Vaults component renders', () => {
    render(
      <Provider store={store}>
        <Vaults />
      </Provider>
    )

    const elements = screen.getAllByText(/TVL/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
