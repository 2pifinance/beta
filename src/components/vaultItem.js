import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { toDailyRate } from '../lib/math'
import { formatAmount, toPercentage } from '../helpers/format'

const VaultItem = props => {
  const { apy, balance, deposited, price, token, tvl } = props

  const daily        = toDailyRate(apy || 0)
  const balanceUsd   = balance?.times(price)
  const depositedUsd = deposited?.times(price)
  const tvlUsd       = tvl?.times(price)

  return (
    <div className={`card border border-${props.color} border-2 bg-blur my-4`}>
      <div className="card-body ms-2">
        <div className="row align-items-center cursor-pointer">
          <div className="col-3 col-md-2 col-lg-2 pt-1">
            <Image src={`/images/tokens/${token}.svg`} alt={token} height="48" width="48" unoptimized={true} />
          </div>
          <div className="col-9 col-md-10 col-lg-3">
            <Link href={`/vaults/${props.vaultId}`}>
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
              {balanceUsd ? formatAmount(balanceUsd, '$') : '-'}
            </p>
            <p className="small text-primary mb-0">
              {balance ? formatAmount(balance, '', 8) : '-'}
            </p>
            <p className="small text-muted mb-0">
              Balance
            </p>
          </div>
          <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
            <p className="small text-muted mb-0">
              {depositedUsd ? formatAmount(depositedUsd, '$') : '-'}
            </p>
            <p className="small text-primary mb-0">
              {deposited ? formatAmount(deposited, '', 8) : '-'}
            </p>
            <p className="small text-muted mb-0">
              Deposited
            </p>
          </div>
          <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
            <p className="lead text-nowrap mb-0">
              {toPercentage(apy)}
            </p>
            <p className="small text-muted mb-0">
              <abbr title="Annual percentage yield">APY</abbr>
            </p>
          </div>
          <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
            <p className="text-nowrap mb-0">
              {toPercentage(daily)}
            </p>
            <p className="small text-muted mb-0">
              Daily
            </p>
          </div>
          <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
            <p className="small text-nowrap mb-0">
              {tvlUsd ? formatAmount(tvlUsd, '$') : '-'}
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
  apy:       PropTypes.number,
  balance:   PropTypes.object,
  color:     PropTypes.string.isRequired,
  deposited: PropTypes.object,
  earn:      PropTypes.string.isRequired,
  price:     PropTypes.number,
  symbol:    PropTypes.string.isRequired,
  token:     PropTypes.string.isRequired,
  tvl:       PropTypes.object,
  uses:      PropTypes.string.isRequired,
  vaultId:   PropTypes.string.isRequired
}

export default VaultItem
