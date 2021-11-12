import { render, screen } from '@testing-library/react'
import { buildVault } from '../../../test/support/vaultsFactory'
import { Provider } from '../../store'
import Deposit from './Deposit'

describe('Deposit component', () => {
  test('Deposit component renders', () => {
    const vault = buildVault()

    render(
      <Provider>
        <Deposit vault={vault} />
      </Provider>
    )

    const elements = screen.getAllByText(/Deposit/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
