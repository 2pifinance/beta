import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deposit } from '../data/vaults'
import { errorToastAdded, successToastAdded, toastDestroyed } from '../features/toastsSlice'
import { fetchVaultsDataAsync, newVaultFetch } from '../features/vaultsSlice'
import { selectWallet } from '../features/walletSlice'
import { formatAmount } from '../helpers/format'

// [TODO]
// - Get transaction hash on deposit success
const Deposit = ({ vault }) => {
  const { balance, symbol, token } = vault

  const dispatch                        = useDispatch()
  const wallet                          = useSelector(selectWallet)
  const [ value, setValue ]             = useState('')
  const [ buttonLabel, setButtonLabel ] = useState('Deposit')
  const [ status, setStatus ]           = useState('blank')

  useEffect(() => {
    if (status === 'deposit') return

    const isValid = isValidNumber(value) && (+value) > 0 && balance.gte(value)

    setStatus(isValid ? 'valid' : 'invalid')
  }, [ value, status, balance ])

  const setMax = () => {
    const value = (token === 'matic') ? balance.minus(0.25) : balance

    setValue(value)
  }

  const onChange = event => {
    setValue(event.target.value)
  }

  const onDepositClick = async () => {
    setStatus('deposit')
    setButtonLabel('Deposit...')
    dispatch(toastDestroyed('Deposit rejected'))

    try {
      await deposit(wallet, vault, value)

      setValue('')
      setStatus('blank')
      setButtonLabel('Deposit')

      dispatch(newVaultFetch())
      dispatch(fetchVaultsDataAsync())
      dispatch(depositSuccess())
    } catch (error) {
      setStatus('blank')
      setButtonLabel('Deposit')
      dispatch(depositError())
    }
  }

  return (
    <React.Fragment>
      <div className="input-group mb-1">
        <input type="number"
               className="form-control"
               id={`balance-${token}`}
               onKeyDown={e => { e.preventDefault(); onChange(e) }}
               onChange={onChange}
               value={value}
               disabled={status === 'deposit'} />

        <button type="button"
                className="btn btn-link bg-input"
                disabled={balance?.isZero()}
                onClick={setMax}>
          Max
        </button>
      </div>

      <div className="text-end">
        <label className="small text-uppercase text-decoration-underline-dotted cursor-pointer"
               htmlFor={`balance-${token}`}
               onClick={setMax}>
          Wallet balance: {formatAmount(balance, '', 8)} {symbol}
        </label>
      </div>

      <hr className="border border-primary border-1 opacity-100" />

      <div className="row justify-content-center mt-4 mb-3">
        <div className="col-lg-6">
          <div className="d-grid gap-2 mb-3 mb-lg-0">
            <button type="button"
                    className="btn btn-outline-primary bg-dark text-white fw-bold"
                    disabled={status !== 'valid'}
                    onClick={onDepositClick}>
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Deposit.propTypes = {
  vault: PropTypes.object.isRequired
}

export default Deposit



// -- HELPERS --

const isValidNumber =
  RegExp.prototype.test.bind(/^\d+\.?\d*$/)

const depositSuccess = () => {
  return successToastAdded('Deposit approved', 'Your deposit was successful')
}

const depositError = () => {
  return errorToastAdded('Deposit rejected', 'An error occured, your deposit has been rejected')
}
