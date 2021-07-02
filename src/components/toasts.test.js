import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Toasts from './toasts'

const mockStore = configureStore([])

describe('toasts component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {},
      toasts: [
        {
          title: 'Test toast',
          body:  'Test body',
          icon:  'wallet',
          style: 'success'
        }
      ]
    }

    store = mockStore(initialState)
  })

  test('renders toasts', () => {
    render(
      <Provider store={store}>
        <Toasts />
      </Provider>
    )

    const containerElement = document.querySelector('.toast-container')

    expect(containerElement).toBeInTheDocument()
  })
})
