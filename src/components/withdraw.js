import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withdraw } from '../data/vaults'
import { errorToastAdded, successToastAdded, toastDestroyed } from '../features/toastsSlice'
import { fetchVaultsDataAsync, newVaultFetch } from '../features/vaultsSlice'
import { selectWallet } from '../features/walletSlice'
import { formatAmount } from '../helpers/format'

// [TODO]
// - Get transaction hash on deposit success
const Withdraw = ({ vault }) => {
  const { apy, deposited, symbol, token } = vault

  const dispatch                        = useDispatch()
  const wallet                          = useSelector(selectWallet)
  const [ value, setValue ]             = useState('')
  const [ buttonLabel, setButtonLabel ] = useState('Withdraw')
  const [ status, setStatus ]           = useState('blank')

  useEffect(() => {
    if (status === 'withdraw') return

    const isValid = isValidNumber(value) && (+value) > 0 && deposited.gte(value)

    setStatus(isValid ? 'valid' : 'invalid')
  }, [ value, status, deposited ])

  const setMax = () => {
    setValue(deposited)
  }

  const onChange = event => {
    setValue(event.target.value)
  }

  const onWithdrawClick = async () => {
    setStatus('withdraw')
    setButtonLabel('Withdraw...')
    dispatch(toastDestroyed('Withdraw rejected'))

    try {
      await withdraw(wallet, vault, value)

      setValue('')
      setStatus('blank')
      setButtonLabel('Withdraw')

      dispatch(newVaultFetch())
      dispatch(fetchVaultsDataAsync())
      dispatch(withdrawSuccess())
    } catch (error) {
      setStatus('blank')
      setButtonLabel('Withdraw')
      dispatch(withdrawError())
    }
  }

  if (+apy <= 0) {
    return (
      <React.Fragment>
        <div className="alert alert-info py-2 my-4">
          <p className="text-center small mb-0">
            Withdrawals are temporarily disabled
          </p>
        </div>

        <hr className="border border-primary border-1 opacity-100" />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className="input-group mb-1">
        <input type="number"
               className="form-control"
               id={`deposited-${token}`}
               onKeyDown={e => { e.preventDefault(); onChange(e) }}
               onChange={onChange}
               value={value}
               disabled={status === 'withdraw'} />

        <button type="button"
                className="btn btn-link bg-input"
                disabled={deposited?.isZero()}
                onClick={setMax}>
          Max
        </button>
      </div>

      <div className="text-end">
        <label className="small text-uppercase text-decoration-underline-dotted cursor-pointer"
               htmlFor={`deposited-${token}`}
               onClick={setMax}>
          Deposited: {formatAmount(deposited, '', 8)} {symbol}
        </label>
      </div>

      <hr className="border border-primary border-1 opacity-100" />

      <div className="row justify-content-center mt-4 mb-3">
        <div className="col-lg-6">
          <div className="d-grid gap-2 mb-3 mb-lg-0">
            <button type="button"
                    className="btn btn-outline-primary bg-dark text-white fw-bold"
                    disabled={status !== 'valid'}
                    onClick={onWithdrawClick}>
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Withdraw.propTypes = {
  vault: PropTypes.object.isRequired
}

export default Withdraw



// -- HELPERS --

const isValidNumber =
  RegExp.prototype.test.bind(/^\d+\.?\d*$/)

const withdrawSuccess = () => {
  return successToastAdded('Withdraw approved', 'Your withdraw was successful')
}

const withdrawError = () => {
  return errorToastAdded('Withdraw rejected', 'An error occured, your withdraw has been rejected')
}
