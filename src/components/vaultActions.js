import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectWallet } from '../features/walletSlice'
import Approve from './approve'
import Connect from './connect'
import Deposit from './deposit'
import Withdraw from './withdraw'

const VaultActions = ({ vault }) => {
  const wallet                = useSelector(selectWallet)
  const [ action, setAction ] = useState('deposit')

  // When connected and vaults are loaded, allowance is always a BigNumber
  if (!wallet || !vault.allowance) {
    return <Connect />
  }

  return (
    <React.Fragment>
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <button type="button"
                  className={`nav-link ${action === 'deposit' ? 'active' : ''}`}
                  onClick={() => setAction('deposit')}>
            Deposit
          </button>
        </li>

        <li className="nav-item">
          <button type="button"
                  className={`nav-link ${action === 'withdraw' ? 'active' : ''}`}
                  onClick={() => setAction('withdraw')}>
            Withdraw
          </button>
        </li>
      </ul>

     {renderAction(action, vault)}
    </React.Fragment>
  )
}

VaultActions.propTypes = {
  vault: PropTypes.object
}

export default VaultActions

const renderAction = (action, vault) => {
  const { allowance, balance } = vault

  if (action === 'withdraw') {
    return <Withdraw vault={vault} />
  }

  if (allowance && allowance.isGreaterThan(balance)) {
    return <Deposit vault={vault} />
  }

  return <Approve vault={vault} />
}
