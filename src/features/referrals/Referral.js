import PropTypes from 'prop-types'
import React  from 'react'
import { useStore, dropNotificationGroup } from '../../store'
import { notifySuccess } from '../../store/notifications'
import WalletButton from '../../components/WalletButton'

const Referral = () => {
  const [ { wallet } ] = useStore()
  const isConnected    = (wallet !== undefined)

  return (
    <div className="referral box-rounded bg-blur mt-5 pt-6 pb-7 px-5 px-lg-7 px-xl-8">
      <p className="referral-subtitle mb-6">
        Share your referral link and invite friends
        to earn 1% of your friends earnings.
      </p>

      <h1 className="referral-title mb-3 m-lg-0">Your referral link</h1>

      <div className="box-corners py-6 px-3 px-md-6 px-lg-7">
        {(isConnected) ? <ReferralLink /> : <WalletPrompt />}
      </div>
    </div>
  )
}

export default Referral

const WalletPrompt = () => (
  <div className="text-center d-lg-flex align-items-center justify-content-center">
    <div className="text-primary mb-3 mb-lg-0 me-3">
      Connect your wallet to unlock your referral link
    </div>

    <WalletButton />
  </div>
)

const ReferralLink = () => {
  const [ { wallet } ] = useStore()
  const url            = referralUrl(wallet)

  return (
    <div className="input-group">
      <p className="form-control text-nowrap overflow-auto m-0">{url}</p>
      <CopyButton value={url} />
    </div>
  )
}

const CopyButton = ({ value }) => {
  const [ _, dispatch ] = useStore()
  const isDisabled      = !navigator.clipboard

  const onCopy = async () => {
    await navigator.clipboard.writeText(value)

    dispatch(dropNotificationGroup('clipboard'))
    dispatch(copySuccess())
  }

  return (
    <button type="button" className="btn btn-outline-primary"
            onClick={onCopy} disabled={isDisabled}>
      Copy
    </button>
  )
}

CopyButton.propTypes = {
  value: PropTypes.string.isRequired
}



// -- HELPERS --

const referralUrl = ({ address }) => {
  return `https://${window.location.host}/?ref=${address}`
}

const copySuccess = () => {
  return notifySuccess('clipboard', 'Copied to clipboard, now start earning!')
}
