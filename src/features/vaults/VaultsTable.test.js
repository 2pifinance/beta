import { render, screen } from '@testing-library/react'
import { buildVault } from '../../../test/support/vaultsFactory'
import { Provider } from '../../store'
import VaultsTable from './VaultsTable'

describe('VaultsTable component', () => {
  test('VaultsTable component renders', () => {
    const vaults = [ buildVault() ]

    render(
      <Provider>
        <VaultsTable vaults={vaults} connected={true} />
      </Provider>
    )

    const elements = screen.getAllByText(/Balance/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
