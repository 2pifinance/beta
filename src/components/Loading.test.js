import { render, screen } from '@testing-library/react'
import Loading from './Loading'

describe('Loading component', () => {
  test('Loading component renders', () => {
    render(<Loading />)

    const spanElement = screen.getByText('Loading...')

    expect(spanElement).toBeInTheDocument()
  })
})
