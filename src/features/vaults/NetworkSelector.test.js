import { render, screen } from '@testing-library/react'
import NetworkSelector from './NetworkSelector'

describe('NetworkSelector component', () => {
  test('NetworkSelector component renders', () => {
    const props = { value: 137, chains: [ 137, 80001 ] }

    render(<NetworkSelector {...props} />)

    const elements = screen.getAllByText(/Polygon/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
