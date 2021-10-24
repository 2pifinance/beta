import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connectAsync, selectStatus } from '../features/walletSlice'

const AirdropUnlock = () => {
  const status   = useSelector(selectStatus)
  const dispatch = useDispatch()

  const buttonLabel = () => {
    if (status === 'loading') {
      return 'Unlocking...'
    } else if (status === 'success') {
      return 'Unlocked'
    } else {
      return 'Unlock'
    }
  }

  return (
    <React.Fragment>
      <button type="button"
              className="btn btn-outline-primary mt-4"
              disabled={['loading', 'success'].includes(status)}
              onClick={() => { dispatch(connectAsync()) }}>
        {buttonLabel()}
      </button>

      <h4 className="h4 fw-bold mt-4 mb-1">
        Unlock wallet to get your airdrop information
      </h4>
    </React.Fragment>
  )
}

export default AirdropUnlock
