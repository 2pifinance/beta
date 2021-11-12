import { render, screen } from '@testing-library/react'
import { buildVault } from '../../../test/support/vaultsFactory'
import { Provider } from '../../store'
import Vault from './Vault'

describe('Vault component', () => {
  test('Vault component renders', () => {
    const props = { vault: buildVault(), connected: true }

    render(
      <Provider>
        <Vault {...props} />
      </Provider>
    )

    const elements = [
      ...screen.getAllByText(/DAI/),
      ...screen.getAllByText(/Aave/)
    ]

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
