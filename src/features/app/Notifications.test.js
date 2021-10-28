import { render, screen } from '@testing-library/react'
import { Provider } from '../../store'
import Notifications from './Notifications'

const notification = {
  type:    'success',
  id:      Date.now(),
  group:   'deposits',
  message: 'Your deposit was successful'
}

const state = { notifications: [ notification ] }

describe('Notifications component', () => {
  test('Notifications component renders', () => {
    render(
      <Provider state={state}>
        <Notifications />
      </Provider>
    )

    const element = screen.getByText('Your deposit was successful')

    expect(element).toBeInTheDocument()
  })
})
