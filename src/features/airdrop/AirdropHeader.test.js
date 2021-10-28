import { render, screen } from '@testing-library/react'
import AirdropHeader from './Airdrop'

describe('AirdropHeader component', () => {
  test('AirdropHeader component renders', () => {
    render(<AirdropHeader />)

    const element = screen.getByText('Comming soon!')

    expect(element).toBeInTheDocument()
  })
})
