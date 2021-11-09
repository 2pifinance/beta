import PropTypes from 'prop-types'
import { useState } from 'react'
import { harvest } from '../../data/vaults'
import { toNumber } from '../../lib/locales'
import { useStore, dropNotificationGroup } from '../../store'
import { txSent, txSuccess, txError } from './utils/transactions'

export const Claim = ({ vault, onUpdate }) => {
  const [ { wallet }, dispatch ]    = useStore()
  const [ isPending, setIsPending ] = useState(false)

  const twoPiEarned = vault.twoPiEarned
  const isZero      = !twoPiEarned.isGreaterThan(0)
  const buttonLabel = (isPending) ? 'Claiming...' : 'Claim'

  const onClaim = async () => {
    const chainId = vault.chainId

    setIsPending(true)

    try {
      const transaction = await harvest(wallet, vault)

      dispatch(dropNotificationGroup('claims'))
      dispatch(claimSent(chainId, transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(dropNotificationGroup('claims'))
      dispatch(claimSuccess(chainId, receipt.transactionHash))

    } catch (error) {
      dispatch(dropNotificationGroup('claims'))
      dispatch(claimError(chainId, error))

    } finally {
      setIsPending(false)
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

const claimSent = (chainId, hash) => {
  return txSent('claims', 'claim', chainId, hash)
}

const claimSuccess = (chainId, hash) => {
  return txSuccess('claims', 'claim', chainId, hash)
}

const claimError = (chainId, error) => {
  return txError('claims', 'claim', chainId, error)
}
