import PropTypes from 'prop-types'
import React from 'react'
import { useReferral } from './utils/referral'
import { useWallet } from './utils/wallet'
import Notifications from './Notifications'

const App = ({ children }) => {
  useWallet()
  useReferral()

  return (
    <React.Fragment>
      {children}

      <Notifications />
    </React.Fragment>
  )
}

App.propTypes = {
  children: PropTypes.node
}

export default App
