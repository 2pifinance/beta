import React from 'react'
import { useStore } from '../../store'
import { connectAsync } from '../../store/wallet'

const ReferralUnlock = () => {
  const [ state, dispatch ] = useStore()
  const isConnected         = (state.wallet !== undefined)
  const isConnecting        = state.isConnecting
  const isDisabled          = isConnected || isConnecting

  const buttonLabel
    = (isConnected)  ? 'Unlocked'
    : (isConnecting) ? 'Unlocking...'
    : 'Unlock'

  const onClick = (isDisabled)
    ? undefined
    : () => dispatch(connectAsync())

  return (
    <React.Fragment>
      <button type="button" disabled={isDisabled} onClick={onClick}
              className="btn btn-outline-primary mt-4">
        {buttonLabel}
      </button>

      <h4 className="h4 fw-bold mt-4 mb-1">
        Unlock your wallet to get your unique referral link
      </h4>
    </React.Fragment>
  )
}

export default ReferralUnlock
