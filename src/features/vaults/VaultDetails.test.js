import { render, screen } from '@testing-library/react'
import { buildVault } from '../../../test/support/vaultsFactory'
import { Provider } from '../../store'
import VaultDetails from './VaultDetails'

describe('VaultDetails component', () => {
  test('VaultDetails component renders', () => {
    const props = { vault: buildVault(), connected: true }

    render(
      <Provider>
        <VaultDetails {...props} />
      </Provider>
    )

    const elements = [
      ...screen.getAllByText('Deposit'),
      ...screen.getAllByText('Withdraw')
    ]

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
