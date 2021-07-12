import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Approve from './approve'
import Connect from './connect'
import Deposit from './deposit'
import Withdraw from './withdraw'
import { selectStatus } from '../features/vaultsSlice'

const VaultActions = props => {
  const status = useSelector(selectStatus)

  const canDeposit = () => {
    return props.allowance.comparedTo(props.balance) > 0
  }

  const renderBalanceAction = () => {
    const {
      address,
      balance,
      decimals,
      pid,
      symbol,
      token,
      tokenContract,
      vault,
      vaultContract,
      web3
    } = props

    if (canDeposit()) {
      return <Deposit address={address}
                      balance={balance}
                      decimals={decimals}
                      pid={pid}
                      symbol={symbol}
                      token={token}
                      vaultContract={vaultContract} />
    } else {
      return <Approve address={address}
                      balance={balance}
                      decimals={decimals}
                      symbol={symbol}
                      token={token}
                      tokenContract={tokenContract}
                      vault={vault}
                      web3={web3} />
    }
  }

  const renderActions = () => {
    if (['loaded', 'loading', 'succeded'].includes(status) && props.deposited) {
      return (
        <div className="row">
          <div className="col-lg-6">
            {renderBalanceAction()}
          </div>

          <div className="col-lg-6">
            <Withdraw address={props.address}
                      apy={props.apy}
                      decimals={props.decimals}
                      deposited={props.deposited}
                      pid={props.pid}
                      pricePerFullShare={props.pricePerFullShare}
                      symbol={props.symbol}
                      token={props.token}
                      vaultContract={props.vaultContract}
                      vaultDecimals={props.vaultDecimals} />
          </div>
        </div>
      )
    } else {
      return <Connect />
    }
  }

  return (
    <React.Fragment>
      <hr />

      {renderActions()}
    </React.Fragment>
  )
}

VaultActions.propTypes = {
  address:           PropTypes.string,
  allowance:         PropTypes.object,
  apy:               PropTypes.number,
  balance:           PropTypes.object,
  decimals:          PropTypes.object,
  deposited:         PropTypes.object,
  pid:               PropTypes.string.isRequired,
  pricePerFullShare: PropTypes.object,
  symbol:            PropTypes.string.isRequired,
  token:             PropTypes.string.isRequired,
  tokenContract:     PropTypes.func,
  vault:             PropTypes.object,
  vaultContract:     PropTypes.func,
  vaultDecimals:     PropTypes.object,
  web3:              PropTypes.object
}

export default VaultActions
