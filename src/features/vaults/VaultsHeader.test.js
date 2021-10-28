import BigNumber from 'bignumber.js'
import { render, screen } from '@testing-library/react'
import { Provider } from '../../store'
import VaultsHeader from './VaultsHeader'

const vaults = [
  { deposited: new BigNumber(10), tvl: new BigNumber(20), price: new BigNumber(1) },
  { deposited: new BigNumber(50), tvl: new BigNumber(89), price: new BigNumber(1.5) },
  { deposited: new BigNumber(30), tvl: new BigNumber(15), price: new BigNumber(17) }
]

describe('VaultsHeader component', () => {
  test('VaultsHeader component renders', () => {
    const props = { vaults, chainId: 137, connected: true }

    render(
      <Provider>
        <VaultsHeader {...props} />
      </Provider>
    )

    const elements = screen.getAllByText(/Polygon/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
