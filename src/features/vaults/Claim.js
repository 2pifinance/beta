import PropTypes from 'prop-types'
import { useState } from 'react'
import { harvest } from '../../data/vaults'
import { toNumber } from '../../lib/locales'
import { useStore, dropNotificationGroup } from '../../store'
import { notify, notifySuccess, notifyError } from '../../store/notifications'

export const Claim = ({ vault, onUpdate }) => {
  const [ { wallet }, dispatch ]    = useStore()
  const [ isPending, setIsPending ] = useState(false)

  const twoPiEarned = vault.twoPiEarned
  const isZero      = !twoPiEarned.isGreaterThan(0)
  const buttonLabel = (isPending) ? 'Claiming...' : 'Claim'

  const onClaim = async () => {
    setIsPending(true)
    dispatch(dropNotificationGroup('claims'))

    try {
      const transaction = await harvest(wallet, vault)

      setIsPending(false)
      dispatch(claimSent(transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(dropNotificationGroup('claims'))
      dispatch(claimSuccess(receipt.transactionHash))

    } catch (error) {
      setIsPending(false)
      dispatch(claimError(error))
    }
  }

  return (
    <p className='text-primary m-0'>
      2PI Earned:{' '}

      <strong title={`${twoPiEarned.toFixed()} 2PI`}>
        {toNumber(twoPiEarned, { compact: true, precision: { max: 3 } })}
      </strong>

      <button className="btn btn-outline-primary btn-sm ms-3"
              onClick={onClaim} disabled={isZero || isPending}>
        {buttonLabel}
      </button>
    </p>
  )
}

Claim.propTypes = {
  vault:     PropTypes.object.isRequired,
  onUpdate:  PropTypes.func
}

export default Claim



// -- HELPERS --

const claimSent = () => {
  return notify('claims', 'Your claim has been sent.')
}

const claimSuccess = () => {
  return notifySuccess('claims', 'Your claim was successful.')
}

const claimError = error => {
  const message = error?.message || 'An error occurred.'

  return notifyError('claims', message)
}
