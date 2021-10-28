import { render, screen } from '@testing-library/react'
import { Provider } from '../store'
import Header from './Header'

describe('Header component', () => {
  test('Header component renders', () => {
    render(
      <Provider>
        <Header />
      </Provider>
    )

    const elements = screen.getAllByText(/Vaults/i)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
