import { render, screen } from '@testing-library/react'
import { buildVault } from '../../../test/support/vaultsFactory'
import { Provider } from '../../store'
import Withdraw from './Withdraw'

describe('Withdraw component', () => {
  test('Withdraw component renders', () => {
    const vault = buildVault()

    render(
      <Provider>
        <Withdraw vault={vault} />
      </Provider>
    )

    const elements = screen.getAllByText(/Withdraw/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
