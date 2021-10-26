import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { approve, deposit } from '../../data/vaults'
import { classNames, preventDefault } from '../../lib/html'
import { toNumber } from '../../lib/locales'
import { errorToastAdded, successToastAdded } from '../toastsSlice'
import { selectWallet } from '../walletSlice'
import { validateDeposit } from './utils/validations'

const Deposit = ({ vault, onUpdate }) => {
  const dispatch                    = useDispatch()
  const wallet                      = useSelector(selectWallet)
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

    try {
      const newVault = await approve(wallet, vault, 1e58)

      onUpdate(newVault)
      dispatch(approveSuccess())

    } catch (error) {
      dispatch(approveError(error))

    } finally {
      setIsPending(false)
    }
  }

  const onDeposit = async () => {
    const error = validateDeposit(vault, value)

    // Update the displayed error message and abort if there's an error
    setError(error)
    if (error) return

    setIsPending(true)

    try {
      const referral = localStorage.getItem('referral')
      const newVault = await deposit(wallet, vault, value, referral)

      setValue('')
      onUpdate(newVault)
      dispatch(depositSuccess())

    } catch (error) {
      dispatch(depositError(error))

    } finally {
      setIsPending(false)
    }
  }

  const onChange = ({ target }) => setValue(target.value)
  const onMax    = () => setValue(balance.toString())
  const onSubmit = (isApproved) ? onDeposit : onApprove

  return (
    <form onSubmit={preventDefault(onSubmit)}>
      <header className="d-flex justify-content-between">
        <label htmlFor="deposit" className="fs-5 fw-bolder">Deposit</label>

        <p className="vault-panel-highlight">
          Balance:{' '}

          <span title={`${balance} ${symbol}`}>
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

const approveSuccess = () => {
  const message = 'The approval was successful, you may deposit now.'

  return successToastAdded('Success', message)
}

const approveError = error => {
  const message = error?.message || 'An error occurred.'

  return errorToastAdded('Approval rejected', message)
}

const depositSuccess = () => {
  return successToastAdded('Success', 'Your deposit was successful')
}

const depositError = error => {
  const message = error?.message || 'An error occurred.'

  return errorToastAdded('Deposit rejected', message)
}
