import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connectAsync, selectStatus } from '../features/walletSlice'

const Connect = () => {
  const status   = useSelector(selectStatus)
  const dispatch = useDispatch()

  const buttonLabel = () => {
    if (status === 'loading') {
      return 'Connecting...'
    } else if (status === 'success') {
      return 'Connected'
    } else {
      return 'Connect'
    }
  }

  return (
    <React.Fragment>
      <div className="row justify-content-center my-4">
        <div className="col-lg-6">
          <div className="d-grid gap-2 mb-3 mb-lg-0">
            <button type="button"
                    className="btn btn-outline-primary"
                    disabled={['loading', 'success'].includes(status)}
                    onClick={() => { dispatch(connectAsync()) }}>
              {buttonLabel()}
            </button>
          </div>
        </div>
      </div>

      <hr className="border border-info border-1 opacity-100" />
    </React.Fragment>
  )
}

export default Connect
