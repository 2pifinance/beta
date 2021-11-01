import PropTypes from 'prop-types'
import { useState } from 'react'
import { approve, deposit } from '../../data/vaults'
import { toNumber } from '../../lib/locales'
import { useStore, dropNotificationGroup } from '../../store'
import { notify, notifySuccess, notifyError } from '../../store/notifications'
import { classNames, preventDefault } from '../../utils/view'
import { validateDeposit } from './utils/validations'

const Deposit = ({ vault, onUpdate }) => {
  const [ { wallet }, dispatch ]    = useStore()
  const [ value, setValue ]         = useState('')
  const [ error, setError ]         = useState()
  const [ isPending, setIsPending ] = useState(false)
  const { symbol, balance }         = vault
  const isApproved                  = isTokenApproved(vault)

  const buttonLabel = (isApproved)
    ? (isPending ? 'Depositing...' : 'Deposit')
    : (isPending ? 'Approving...'  : 'Approve')

  const onApprove = async () => {
    setIsPending(true)
    dispatch(dropNotificationGroup('deposits'))

    try {
      const transaction = await approve(wallet, vault, 1e58)

      setIsPending(false)
      dispatch(approveSent(transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(dropNotificationGroup('deposits'))
      dispatch(approveSuccess(receipt.transactionHash))

    } catch (error) {
      setIsPending(false)
      dispatch(approveError(error))
    }
  }

  const onDeposit = async () => {
    const error = validateDeposit(vault, value)

    // Update the displayed error message and abort if there's an error
    setError(error)
    if (error) return

    setIsPending(true)
    dispatch(dropNotificationGroup('deposits'))

    try {
      const referral    = localStorage.getItem('referral')
      const transaction = await deposit(wallet, vault, value, referral)

      setValue('')
      setIsPending(false)
      dispatch(depositSent(transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(dropNotificationGroup('deposits'))
      dispatch(depositSuccess(receipt.transactionHash))

    } catch (error) {
      setIsPending(false)
      dispatch(depositError(error))
    }
  }

  const onChange = ({ target }) => setValue(target.value)
  const onMax    = () => setValue(balance.toFixed())
  const onSubmit = (isApproved) ? onDeposit : onApprove

  return (
    <form onSubmit={preventDefault(onSubmit)}>
      <header className="d-flex justify-content-between">
        <label htmlFor="deposit" className="fs-5 fw-bolder">Deposit</label>

        <p className="vault-panel-highlight">
          Balance:{' '}

          <span title={`${balance.toFixed()} ${symbol}`}>
            {toNumber(balance, { precision: { max: 8 } })} {symbol}
          </span>
        </p>
      </header>

      <fieldset className="input-group has-validation" disabled={!isApproved || isPending}>
        <input name="deposit" type="number" value={value} onChange={onChange}
               className={classNames({ 'form-control': true, 'is-invalid': error })} />

        <button type="button" className="btn btn-outline-primary" onClick={onMax}>Max</button>

        <div className="invalid-feedback">{error}</div>
      </fieldset>

      <div className="d-flex flex-column align-items-center mt-4">
        <button type="submit" className="btn btn-outline-primary" disabled={isPending}>
          {buttonLabel}
        </button>

        <small className="mt-2 text-muted">Deposit fee: 0%</small>
      </div>
    </form>
  )
}

Deposit.propTypes = {
  vault:    PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

export default Deposit



// -- HELPERS --

const isTokenApproved = ({ token, allowance, balance }) => {
  if (token === 'matic') return true

  return allowance.isGreaterThan(balance)
}

const approveSent = () => {
  return notify('deposits', 'Your approve has been sent.')
}

const approveSuccess = () => {
  return notifySuccess('deposits', 'The approval was successful, you may deposit now.')
}

const approveError = error => {
  const message = error?.message || 'An error occurred.'

  return notifyError('deposits', message)
}

const depositSent = () => {
  return notify('deposits', 'Your deposit has been sent.')
}

const depositSuccess = () => {
  return notifySuccess('deposits', 'Your deposit was successful.')
}

const depositError = error => {
  const message = error?.message || 'An error occurred.'

  return notifyError('deposits', message)
}
