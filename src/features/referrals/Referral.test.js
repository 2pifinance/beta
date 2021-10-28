import { render, screen } from '@testing-library/react'
import { Provider } from '../../store'
import Referral from './Referral'

describe('Connected Referral component', () => {
  const state = {
    wallet: {
      address:  '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      chainId:  80001,
      provider: undefined,
      web3:     undefined,
      modal:    undefined
    }
  }

  test('Connected Referral component renders', () => {
    render(
      <Provider state={state}>
        <Referral />
      </Provider>
    )

    const copyButton = screen.getByText('Copy')

    expect(copyButton).toBeInTheDocument()
  })
})

describe('Disconnected Referral component', () => {
  const state = {}

  test('Disconnected Referral component renders', () => {
    render(
      <Provider state={state}>
        <Referral />
      </Provider>
    )

    const unlockButton = screen.getByText('Unlock')

    expect(unlockButton).toBeInTheDocument()
  })
})
