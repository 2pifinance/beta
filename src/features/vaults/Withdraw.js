import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withdraw } from '../../data/vaults'
import { classNames, preventDefault } from '../../lib/html'
import { toNumber } from '../../lib/locales'
import { infoToastAdded, successToastAdded, errorToastAdded } from '../toastsSlice'
import { selectWallet } from '../walletSlice'
import { validateWithdraw } from './utils/validations'

const Withdraw = ({ vault, onUpdate }) => {
  const dispatch                    = useDispatch()
  const wallet                      = useSelector(selectWallet)
  const [ value, setValue ]         = useState('')
  const [ error, setError ]         = useState()
  const [ isPending, setIsPending ] = useState(false)
  const { symbol, deposited }       = vault

  const buttonLabel = (isPending)
    ? 'Withdrawing...'
    : 'Withdraw'

  const onChange = ({ target }) => setValue(target.value)
  const onMax    = () => setValue(deposited.toString())

  const onSubmit = async () => {
    const error = validateWithdraw(vault, value)

    // Update the displayed error message and abort if there's an error
    setError(error)
    if (error) return

    setIsPending(true)

    try {
      const transaction = await withdraw(wallet, vault, value)

      setValue('')
      setIsPending(false)
      dispatch(withdrawSent(transaction.hash))

      const receipt = await transaction.wait()

      onUpdate()
      dispatch(withdrawSuccess(receipt.transactionHash))

    } catch (error) {
      setIsPending(false)
      dispatch(withdrawError(error))
    }
  }

  return (
    <form onSubmit={preventDefault(onSubmit)}>
      <header className="d-flex justify-content-between">
        <label htmlFor="withdraw" className="fs-5 fw-bolder">Withdraw</label>

        <p className="vault-panel-highlight">
          Available to withdraw:{' '}

          <span title={`${deposited} ${symbol}`}>
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
        <button type="submit" className="btn btn-outline-primary" disabled={isPending}>
          {buttonLabel}
        </button>

        <small className="mt-2 text-muted">Withdraw fee: 0.1%</small>
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

const withdrawSent = () => {
  return infoToastAdded('Withdraw sent', 'Your withdraw has been sent.')
}

const withdrawSuccess = () => {
  return successToastAdded('Success', 'Your withdraw was successful.')
}

const withdrawError = error => {
  const message = error?.message || 'An error occurred.'

  return errorToastAdded('Withdraw rejected', message)
}
