import { render, screen } from '@testing-library/react'
import { Provider } from '../../store'
import App from './App'

describe('App component', () => {
  test('App component renders', () => {
    render(
      <Provider>
        <App>
          <p>Test child</p>
        </App>
      </Provider>
    )

    const element = screen.getByText('Test child')

    expect(element).toBeInTheDocument()
  })
})
