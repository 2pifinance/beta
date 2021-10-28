import { render, screen } from '@testing-library/react'
import { Provider } from '../../store'
import Vaults from './Vaults'

describe('Vaults component', () => {
  test('Vaults component renders', () => {
    render(
      <Provider>
        <Vaults />
      </Provider>
    )

    const elements = screen.getAllByText(/TVL/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
