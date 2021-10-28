import { render, screen } from '@testing-library/react'
import { Provider } from '../../store'
import ReferralUnlock from './ReferralUnlock'

describe('ReferralUnlock component', () => {
  test('ReferralUnlock component renders', () => {
    render(
      <Provider>
        <ReferralUnlock />
      </Provider>
    )

    const unlockButton = screen.getByText('Unlock')

    expect(unlockButton).toBeInTheDocument()
  })
})
