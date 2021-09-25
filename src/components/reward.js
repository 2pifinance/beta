import BigNumber from 'bignumber.js'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import { fetchVaultsDataAsync, newVaultFetch } from '../features/vaultsSlice'
import { selectVaults } from '../features/vaultsSlice'
import { formatAmount } from '../helpers/format'
import { transactionSent } from '../helpers/transactions'
import { fromWei } from '../helpers/wei'
import {
  selectAddress,
  selectChainId,
  selectWeb3
} from '../features/walletSlice'

const Reward = () => {
  const address                     = useSelector(selectAddress)
  const chainId                     = useSelector(selectChainId)
  const web3                        = useSelector(selectWeb3)
  const vaults                      = useSelector(selectVaults)
  const dispatch                    = useDispatch()
  const [claimLabel, setClaimLabel] = useState('Claim')
  const [status, setStatus]         = useState('ready')

  if (chainId === 80001) {
    const decimals    = new BigNumber(18) // just to save a call
    const rewardInWei = (vaults[chainId] || []).reduce((acc, vault) => {
      const { pendingTokens } = vault

      return pendingTokens?.isFinite() ? acc.plus(pendingTokens) : acc
    }, new BigNumber('0'))

    const reward = fromWei(rewardInWei, decimals)

    const handleClick = () => {
      const vault      = require(`../abis/main/${chainId}/archimedes`).default
      const archimedes = new web3.eth.Contract(vault.abi, vault.address)

      setClaimLabel('Claim...')
      setStatus('claim')

      archimedes.methods.harvestAll().send({
        from: address
      }).on('transactionHash', hash => {
        transactionSent(hash, dispatch)
      }).then(() => {
        setStatus('ready')
        setClaimLabel('Claim')
        dispatch(toastDestroyed('Claim rejected'))
        dispatch(newVaultFetch())
        dispatch(fetchVaultsDataAsync())
        dispatch(
          toastAdded({
            title:    'Claim approved',
            body:     'Your claim was successful',
            icon:     'check-circle',
            style:    'success',
            autohide: true
          })
        )
      }).catch(() => {
        setStatus('ready')
        setClaimLabel('Claim')
        dispatch(
          toastAdded({
            title:    'Claim rejected',
            body:     'Your claim was rejected, please check the explorer and try again',
            icon:     'exclamation-triangle',
            style:    'danger',
            autohide: true
          })
        )
      })
    }

    return (
      <div className="d-flex justify-content-end mt-4">
        <div className="card">
          <div className="card-body bg-dark py-1">
            <p className="small mb-0">
              <span>Available reward</span>

              <span className="mx-2">
                {formatAmount(reward, '', 6)}
              </span>

              <span>2PI</span>

              <button type="button"
                      className="btn btn-dark btn-sm text-white ms-3"
                      onClick={handleClick}
                      disabled={false && (status !== 'blank' || reward.isZero())}>
                {claimLabel}
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Reward
