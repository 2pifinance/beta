import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { SUPPORTED_CHAINS } from '../data/constants'
import { selectStatus } from '../features/vaultsSlice'
import Approve from './approve'
import Connect from './connect'
import Deposit from './deposit'
import Withdraw from './withdraw'
import {
  selectAddress,
  selectChainId,
  selectWeb3,
} from '../features/walletSlice'

const VaultActions = props => {
  const status              = useSelector(selectStatus)
  const address             = useSelector(selectAddress)
  const chainId             = useSelector(selectChainId)
  const web3                = useSelector(selectWeb3)
  const [action, setAction] = useState('deposit')

  const getTokenData = () => {
    if (SUPPORTED_CHAINS.includes(chainId)) {
      return require(`../abis/tokens/${chainId}/${props.token}`).default
    }
  }

  const getVaultData = () => {
    if (SUPPORTED_CHAINS.includes(chainId)) {
      if (chainId === 80001) {
        if (props.token === '2Pi') {
          return require(`../abis/main/${chainId}/2Pi`).default
        } else {
          return require(`../abis/main/${chainId}/archimedes`).default
        }
      } else {
        return require(`../abis/vaults/${chainId}/${props.pool}-${props.token}`).default
      }
    }
  }

  const tokenContract = (token) => {
    return () => {
      if (token.abi) {
        return new web3.eth.Contract(token.abi, token.address)
      }
    }
  }

  const vaultContract = (vault) => {
    return () => {
      return new web3.eth.Contract(vault.abi, vault.address)
    }
  }

  const canDeposit = () => {
    return props.allowance.comparedTo(props.balance) > 0
  }

  const tokenData = getTokenData()
  const vaultData = getVaultData()

  const renderBalanceAction = () => {
    const { balance, decimals, pid, symbol, token } = props

    if (canDeposit()) {
      return <Deposit address={address}
                      balance={balance}
                      decimals={decimals}
                      pid={pid}
                      symbol={symbol}
                      token={token}
                      vaultContract={vaultContract(vaultData)} />
    } else {
      return <Approve address={address}
                      balance={balance}
                      decimals={decimals}
                      symbol={symbol}
                      token={token}
                      tokenContract={tokenContract(tokenData)}
                      vault={vaultData}
                      web3={web3} />
    }
  }

  const renderAction = () => {
    if (action === 'deposit') {
      return renderBalanceAction()
    } else {
      return <Withdraw address={address}
                       apy={props.apy}
                       decimals={props.decimals}
                       deposited={props.deposited}
                       pid={props.pid}
                       pricePerFullShare={props.pricePerFullShare}
                       symbol={props.symbol}
                       token={props.token}
                       vaultContract={vaultContract(vaultData)}
                       vaultDecimals={props.vaultDecimals} />
    }
  }

  const renderActions = () => {
    if (['loaded', 'loading', 'succeded'].includes(status) && props.deposited) {
      return (
        <React.Fragment>
          <ul className="nav nav-pills mb-3">
            <li className="nav-item">
              <button type="button"
                      className={`nav-link ${action === 'deposit' ? 'active' : ''}`}
                      onClick={() => setAction('deposit')}>
                Deposit
              </button>
            </li>
            <li className="nav-item">
              <button type="button"
                      className={`nav-link ${action === 'withdraw' ? 'active' : ''}`}
                      onClick={() => setAction('withdraw')}>
                Withdraw
              </button>
            </li>
          </ul>

          {renderAction()}
        </React.Fragment>
      )
    } else {
      return <Connect />
    }
  }

  return (
    <React.Fragment>
      {renderActions()}
    </React.Fragment>
  )
}

VaultActions.propTypes = {
  allowance:         PropTypes.object,
  apy:               PropTypes.number,
  balance:           PropTypes.object,
  decimals:          PropTypes.object,
  deposited:         PropTypes.object,
  pid:               PropTypes.string,
  pool:              PropTypes.string,
  pricePerFullShare: PropTypes.object,
  symbol:            PropTypes.string.isRequired,
  token:             PropTypes.string.isRequired,
  vaultDecimals:     PropTypes.object
}

export default VaultActions
