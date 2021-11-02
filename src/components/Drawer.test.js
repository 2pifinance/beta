import { render, screen } from '@testing-library/react'
import Drawer from './Drawer'

describe('Drawer component', () => {
  test('Drawer component renders', () => {
    render(
      <Drawer>
        <p>Test child</p>
      </Drawer>
    )

    const element = screen.getByText('Test child')

    expect(element).toBeInTheDocument()
  })
})
