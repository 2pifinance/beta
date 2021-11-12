import { render, screen } from '@testing-library/react'
import { buildVault } from '../../../test/support/vaultsFactory'
import { Provider } from '../../store'
import Claim from './Claim'

describe('Claim component', () => {
  test('Claim component renders', () => {
    const vault = buildVault()

    render(
      <Provider>
        <Claim vault={vault} />
      </Provider>
    )

    const elements = screen.getAllByText(/Claim/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
