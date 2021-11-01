import BigNumber from 'bignumber.js'
import { render, screen } from '@testing-library/react'
import { Provider } from '../../store'
import Withdraw from './Withdraw'

const vault = {
  id:             'polygon-dai-aave',
  chainId:        137,
  symbol:         'DAI',
  token:          'dai',
  tokenDecimals:  new BigNumber(18),
  earn:           'DAI',
  uses:           'Aave',
  apy:            new BigNumber(0.17),
  price:          new BigNumber(1),
  tvl:            new BigNumber(1000),
  withdrawalFee:  new BigNumber(10),
  allowance:      new BigNumber(0),
  balance:        new BigNumber(0),
  deposited:      new BigNumber(0),
  sharesDecimals: new BigNumber(18),
  sharePrice:     new BigNumber(1.5),
  twoPiEarned:    new BigNumber(10)
}

describe('Withdraw component', () => {
  test('Withdraw component renders', () => {
    render(
      <Provider>
        <Withdraw vault={vault} />
      </Provider>
    )

    const elements = screen.getAllByText(/Withdraw/)

    elements.forEach(element => expect(element).toBeInTheDocument())
  })
})
