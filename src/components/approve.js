import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approve } from '../data/vaults'
import { errorToastAdded, successToastAdded, toastDestroyed } from '../features/toastsSlice'
import { fetchVaultsDataAsync, newVaultFetch } from '../features/vaultsSlice'
import { selectWallet } from '../features/walletSlice'
import { formatAmount } from '../helpers/format'

const Approve = ({ vault }) => {
  const { symbol, balance, token } = vault

  const dispatch                        = useDispatch()
  const wallet                          = useSelector(selectWallet)
  const [ buttonLabel, setButtonLabel ] = useState('Approve')
  const [ status, setStatus ]           = useState('blank')

  const onApproveClick = async () => {
    setStatus('approve')
    setButtonLabel('Approve...')
    dispatch(toastDestroyed('Approve rejected'))

    try {
      await approve(wallet, vault, 1e58)

      setStatus('blank')
      setButtonLabel('Approve')

      dispatch(newVaultFetch())
      dispatch(fetchVaultsDataAsync())
      dispatch(approveSuccess())
    } catch (error) {
      setStatus('blank')
      setButtonLabel('Approve')
      dispatch(approveError())
    }
  }

  return (
    <React.Fragment>
      <div className="input-group mb-1">
        <input type="number"
               className="form-control"
               id={`balance-${token}`}
               disabled={true} />
        <button type="button"
                className="btn btn-link bg-input"
                disabled={true}>
          Max
        </button>
      </div>

      <div className="text-end">
        <label className="small text-uppercase text-decoration-underline-dotted cursor-pointer"
               htmlFor={`balance-${token}`}>
          Wallet balance: {formatAmount(balance, '', 8)} {symbol}
        </label>
      </div>

      <hr className="border border-primary border-1 opacity-100" />

      <div className="row justify-content-center mt-4 mb-3">
        <div className="col-lg-6">
          <div className="d-grid gap-2 mb-3 mb-lg-0">
            <button type="button"
                    className="btn btn-outline-primary bg-dark text-white fw-bold"
                    disabled={status === 'approve'}
                    onClick={onApproveClick}>
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Approve.propTypes = {
  vault: PropTypes.object.isRequired
}

export default Approve



// -- HELPERS --

const approveSuccess = () => {
  return successToastAdded('Approval done', 'The approval was successful, you may deposit now')
}

const approveError = () => {
  return errorToastAdded('Approve rejected', 'An error occured, your approve has been rejected')
}
