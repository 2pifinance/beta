import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer component', () => {
  test('Footer component renders', () => {
    render(
      <Footer />
    )

    const linkElement = screen.getByTitle(/Tweet us/i)

    expect(linkElement).toBeInTheDocument()
  })
})
