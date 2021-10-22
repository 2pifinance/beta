import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { fromWei } from '../helpers/wei'
import { formatAmount, toPercentage } from '../helpers/format'

const VaultItem = props => {
  return (
    <div className={`card border border-${props.color} border-2 bg-blur my-4`}>
      <div className="card-body ms-2">
        <div className="row align-items-center cursor-pointer">
          <div className="col-3 col-md-2 col-lg-2 pt-1">
            <Image src={`/images/tokens/${props.token}.svg`} alt={props.token} height="48" width="48" unoptimized={true} />
          </div>
          <div className="col-9 col-md-10 col-lg-3">
            <Link href={`/vaults/${props.vaultKey}`}>
              <a className="stretched-link text-decoration-none">
                <h3 className="h4 mb-1">
                  {props.symbol}
                </h3>
              </a>
            </Link>
            <p className="small text-muted mb-0">
              Earn:
              <span className="ms-2">
                {props.earn}
              </span>
            </p>
            <p className="small text-muted mb-0">
              Uses:
              <span className="ms-2">
                {props.uses}
              </span>
            </p>
          </div>
          <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
            <p className="small text-muted mb-0">
              {props.balanceUsd ? formatAmount(props.balanceUsd, '$') : '-'}
            </p>
            <p className="small text-primary mb-0">
              {props.balance ? formatAmount(fromWei(props.balance, props.decimals), '', 8) : '-'}
            </p>
            <p className="small text-muted mb-0">
              Balance
            </p>
          </div>
          <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
            <p className="small text-muted mb-0">
              {props.depositedUsd ? formatAmount(props.depositedUsd, '$') : '-'}
            </p>
            <p className="small text-primary mb-0">
              {props.deposited ? formatAmount(fromWei(props.deposited, props.decimals), '', 8) : '-'}
            </p>
            <p className="small text-muted mb-0">
              Deposited
            </p>
          </div>
          <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
            <p className="lead text-nowrap mb-0">
              {toPercentage(props.apy)}
            </p>
            <p className="small text-muted mb-0">
              <abbr title="Annual percentage yield">APY</abbr>
            </p>
          </div>
          <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
            <p className="text-nowrap mb-0">
              {toPercentage((props.apy || 0.0) / 365)}
            </p>
            <p className="small text-muted mb-0">
              Daily
            </p>
          </div>
          <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
            <p className="small text-nowrap mb-0">
              {props.tvlUsd ? formatAmount(props.tvlUsd, '$') : '-'}
            </p>
            <p className="small text-muted mb-0">
              <abbr title="Total assets">TA</abbr>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

VaultItem.propTypes = {
  apy:          PropTypes.number,
  balance:      PropTypes.object,
  balanceUsd:   PropTypes.object,
  color:        PropTypes.string.isRequired,
  decimals:     PropTypes.object,
  deposited:    PropTypes.object,
  depositedUsd: PropTypes.object,
  earn:         PropTypes.string.isRequired,
  symbol:       PropTypes.string.isRequired,
  token:        PropTypes.string.isRequired,
  tvlUsd:       PropTypes.object,
  uses:         PropTypes.string.isRequired,
  vaultKey:     PropTypes.string.isRequired
}

export default VaultItem
