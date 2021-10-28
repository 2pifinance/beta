import { render, screen } from '@testing-library/react'
import Airdrop from './Airdrop'

describe('Airdrop component', () => {
  test('Airdrop component renders', () => {
    render(<Airdrop />)

    const elements = screen.getAllByText(/Phase/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
