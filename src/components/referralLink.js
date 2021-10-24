import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAddress } from '../features/walletSlice'
import { toastAdded } from '../features/toastsSlice'

const ReferralLink = () => {
  const dispatch         = useDispatch()
  const [copy, setCopy]  = useState(false)
  const address          = useSelector(selectAddress)
  const {protocol, host} = window.location
  const url              = `${protocol}//${host}/?ref=${address}`

  useEffect(() => {
    if (navigator.clipboard) {
      setCopy(true)
    }
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      dispatch(
        toastAdded({
          title:    'Copied',
          body:     'Now you can share and earn!',
          icon:     'check-circle',
          style:    'success',
          autohide: true
        })
      )
    })
  }

  return (
    <React.Fragment>
      <h4 className="h4 text-info mt-4 mb-3">
        Your referral link
      </h4>

      <div className="mb-3">
        <label htmlFor="referralInput" className="visually-hidden">Referral link</label>
        <input type="email"
               className="form-control form-control-sm"
               readOnly={true}
               value={url}
               id="referralInput" />
      </div>

      <button className="btn btn-outline-primary"
              disabled={! copy}
              onClick={copyToClipboard}>
        Copy
      </button>

      <h4 className="h4 text-info mt-4 mb-1">
        Total referrals
      </h4>

      <p className="h4">
        0
      </p>
    </React.Fragment>
  )
}

export default ReferralLink
