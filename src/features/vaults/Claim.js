import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { harvest } from '../../data/vaults'
import { toNumber } from '../../lib/locales'
import { infoToastAdded, successToastAdded, errorToastAdded } from '../toastsSlice'
import { selectWallet } from '../walletSlice'

export const Claim = ({ vault, onUpdate }) => {
  const dispatch                    = useDispatch()
  const wallet                      = useSelector(selectWallet)
  const [ isPending, setIsPending ] = useState(false)

  const isZero             = !vault.twoPiEarned?.gt(0)
  const twoPiEarned        = (isZero) ? 0 : vault.twoPiEarned
  const compactTwoPiEarned = toNumber(twoPiEarned, { precision: { max: 6 } })
  const buttonLabel        = (isPending) ? 'Claiming...' : 'Claim'

  const onClaim = async () => {
    setIsPending(true)

    try {
      const transaction = await harvest(wallet, vault)

      setIsPending(false)
      dispatch(claimSent(transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(claimSuccess(receipt.transactionHash))

    } catch (error) {
      setIsPending(false)
      dispatch(claimError(error))
    }
  }

  return (
    <p className='text-primary m-0'>
      2PI Earned:{' '}

      <strong title={`${twoPiEarned} 2PI`}>{compactTwoPiEarned}</strong>

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
  return infoToastAdded('Claim sent', 'Your claim has been sent.')
}

const claimSuccess = () => {
  return successToastAdded('Success', 'Your claim was successful.')
}

const claimError = error => {
  const message = error?.message || 'An error occurred.'

  return errorToastAdded('Claim rejected', message)
}
