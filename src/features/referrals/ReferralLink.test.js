import { render, screen } from '@testing-library/react'
import { Provider } from '../../store'
import ReferralLink from './ReferralLink'

describe('ReferralLink component', () => {
  const state = {
    wallet: {
      address:  '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      chainId:  80001,
      provider: undefined,
      web3:     undefined,
      modal:    undefined
    }
  }

  test('ReferralLink component renders', () => {
    render(
      <Provider state={state}>
        <ReferralLink />
      </Provider>
    )

    const copyButton = screen.getByText('Copy')

    expect(copyButton).toBeInTheDocument()
  })
})
