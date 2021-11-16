import PropTypes from 'prop-types'
import { useState } from 'react'
import { withdraw } from '../../data/vaults'
import { toNumber } from '../../lib/locales'
import { useStore, dropNotificationGroup } from '../../store'
import { classNames, preventDefault } from '../../utils/view'
import { txSent, txSuccess, txError } from './utils/transactions'
import { validateWithdraw } from './utils/validations'

const Withdraw = ({ vault, onUpdate }) => {
  const [ { wallet }, dispatch ]             = useStore()
  const [ value, setValue ]                  = useState('')
  const [ error, setError ]                  = useState()
  const [ isPending, setIsPending ]          = useState(false)
  const { symbol, deposited, withdrawalFee } = vault

  const buttonLabel = (isPending)
    ? 'Withdrawing...'
    : 'Withdraw'

  const onChange = ({ target }) => setValue(target.value)
  const onMax    = () => setValue(deposited.toFixed())

  const onSubmit = async () => {
    const chainId = vault.chainId
    const error   = validateWithdraw(vault, value)

    // Update the displayed error message and abort if there's an error
    setError(error)
    if (error) return

    setIsPending(true)

    try {
      const transaction = await withdraw(wallet, vault, value)

      setValue('')
      setIsPending(false)
      dispatch(dropNotificationGroup('withdraws'))
      dispatch(withdrawSent(chainId, transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(dropNotificationGroup('withdraws'))
      dispatch(withdrawSuccess(chainId, receipt.transactionHash))

    } catch (error) {
      setIsPending(false)
      dispatch(dropNotificationGroup('withdraws'))
      dispatch(withdrawError(chainId, error))
    }
  }

  return (
    <form onSubmit={preventDefault(onSubmit)}>
      <header className="d-flex justify-content-between">
        <label htmlFor="withdraw" className="fs-5 fw-bolder">Withdraw</label>

        <p className="vault-panel-highlight">
          Available to withdraw:{' '}

          <span title={`${deposited.toFixed()} ${symbol}`}>
            {toNumber(deposited, { precision: { max: 8 } })} {symbol}
          </span>
        </p>
      </header>

      <fieldset className="input-group has-validation" disabled={isPending}>
        <input name="withdraw" type="number" value={value} onChange={onChange}
               className={classNames({ 'form-control': true, 'is-invalid': error })} />

        <button type="button" className="btn btn-outline-primary" onClick={onMax}>Max</button>

        <div className="invalid-feedback">{error}</div>
      </fieldset>

      <div className="d-flex flex-column align-items-center mt-4">
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {buttonLabel}
        </button>

        <small className="mt-2 text-muted">Withdraw fee: {`${withdrawalFee}%`}</small>
      </div>
    </form>
  )
}

Withdraw.propTypes = {
  vault:    PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

export default Withdraw



// -- HELPERS --

const withdrawSent = (chainId, hash) => {
  return txSent('withdraws', 'withdraw', chainId, hash)
}

const withdrawSuccess = (chainId, hash) => {
  return txSuccess('withdraws', 'withdraw', chainId, hash)
}

const withdrawError = (chainId, error) => {
  return txError('withdraws', 'withdraw', chainId, error)
}
