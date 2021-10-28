import React  from 'react'
import { useStore } from '../../store'
import { notifySuccess } from '../../store/notifications'

const ReferralLink = () => {
  const [ { wallet }, dispatch ] = useStore()
  const url                      = referralUrl(wallet)
  const canCopy                  = !!navigator.clipboard

  const onCopy = async () => {
    await navigator.clipboard.writeText(url)

    dispatch(notifySuccess('referrals', 'Copied to clipboard, now start earning!'))
  }

  return (
    <React.Fragment>
      <h4 className="h4 text-info mt-4 mb-3">
        Your referral link
      </h4>

      <div className="mb-3">
        <label htmlFor="referralInput" className="visually-hidden">
          Referral link
        </label>

        <input id="referralInput" type="email" value={url} readOnly={true}
               className="form-control form-control-sm" />
      </div>

      <button className="btn btn-outline-primary"
              disabled={! canCopy} onClick={onCopy}>
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



// -- HELPERS --

const referralUrl = ({ address }) => {
  const { protocol, host } = window.location

  return `${protocol}//${host}/?ref=${address}`
}
