import { render, screen } from '@testing-library/react'
import AirdropPhases from './AirdropPhases'

describe('AirdropPhases component', () => {
  test('AirdropPhases component renders', () => {
    render(<AirdropPhases />)

    const elements = screen.getAllByText(/Phase/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
