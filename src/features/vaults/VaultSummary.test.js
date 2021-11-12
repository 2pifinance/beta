import { render, screen } from '@testing-library/react'
import { buildVault } from '../../../test/support/vaultsFactory'
import VaultSummary from './VaultSummary'

describe('VaultSummary component', () => {
  test('VaultSummary component renders', () => {
    const props = { vault: buildVault(), connected: true }

    render(<VaultSummary {...props} />)

    const elements = screen.getAllByText(/Uses/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
