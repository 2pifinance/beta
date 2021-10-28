import { render, screen } from '@testing-library/react'
import { Provider } from '../store'
import WalletButton from './WalletButton'

describe('WalletButton component', () => {
  test('WalletButton component renders', () => {
    render(
      <Provider>
        <WalletButton />
      </Provider>
    )

    const buttonElement = screen.getByText(/Connect/i)

    expect(buttonElement).toBeInTheDocument()
  })
})
