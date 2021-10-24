import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('footer component render', () => {
  test('renders 2pi network footer info', () => {
    render(
      <Footer />
    )

    const linkElement = screen.getByTitle(/Tweet us/i)

    expect(linkElement).toBeInTheDocument()
  })
})
