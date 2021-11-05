import PropTypes from 'prop-types'
import Image from 'next/image'
import * as Locales from '../../lib/locales'

const VaultSummary = ({ vault, active, connected, onToggle }) => {
  const { symbol, uses, price, balance, deposited, tvl } = vault

  const apy            = toPercentage(vault.apy)
  const daily          = toPercentage(vault.daily)
  const rewardsApy     = toPercentage(vault.rewardsApy)
  const tvlUsd         = toCurrency(tvl.times(price))
  const balanceToken   = balance   && toCompact(balance)
  const balanceUsd     = balance   && toCurrency(balance.times(price))
  const depositedToken = deposited && toCompact(deposited)
  const depositedUsd   = deposited && toCurrency(deposited.times(price))

  return (
    <div className="vault-summary row">
      <div className="col d-flex align-items-center py-5 px-5"
           role="gridcell" tabIndex="-1">
        <div>
          <div className="vault-summary-symbol">
            <figure className="vault-summary-logo">
              <VaultLogo vault={vault} />
            </figure>

            <span>{symbol}</span>
          </div>

          <small className="vault-summary-platform">Uses: {uses}</small>
        </div>
      </div>

      {(connected) &&
        <div className="col d-flex align-items-center py-4 px-5"
             role="gridcell" tabIndex="-1">
          <div>
            <small>{balanceUsd}</small>

            <p className="vault-summary-stat"
               title={(balance) ? `${balance.toFixed()} ${symbol}` : ''}>
              {(balance && !balance.isZero()) ? balanceToken : '-.--' }
            </p>
          </div>
        </div>
      }

      {(connected) &&
        <div className="col d-flex align-items-center py-4 px-5"
             role="gridcell" tabIndex="-1">
          <div>
            <small>{depositedUsd}</small>

            <p className="vault-summary-stat"
               title={(deposited) ? `${deposited.toFixed()} ${symbol}` : ''}>
              {(deposited && !deposited.isZero()) ? depositedToken : '-.--' }
            </p>
          </div>
        </div>
      }

      <div className="col d-flex align-items-center py-4 px-5"
           role="gridcell" tabIndex="-1">
          <div>
            <small>2PI APY: {rewardsApy}</small>

            <p className="vault-summary-stat">{apy}</p>
          </div>
      </div>

      <div className="col d-flex align-items-center py-4 px-5"
           role="gridcell" tabIndex="-1">
        <p className="vault-summary-stat">{daily}</p>
      </div>

      <div className="col d-flex align-items-center py-4 px-5"
           role="gridcell" tabIndex="-1">
        <p className="vault-summary-stat">{tvlUsd}</p>
      </div>

      <div className="col d-flex align-items-center justify-content-end py-4"
           role="gridcell" tabIndex="-1">
        <button className={`btn btn-crosshairs me-5 ${(active) ? 'active' : ''}`}
                onClick={onToggle}>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  )
}

VaultSummary.propTypes = {
  vault:     PropTypes.object.isRequired,
  active:    PropTypes.bool,
  connected: PropTypes.bool,
  onToggle:  PropTypes.func
}

export default VaultSummary

const VaultLogo = ({ vault: { token } }) => {
  const logos = token.split('-').map(name => `/images/tokens/${name}.svg`)

  return logos.map((url, i) => (
    <div key={i} className={i === 1 ? 'mt-4 ms-n3' : undefined}>
      <Image src={url} alt={token} height="36" width="36" unoptimized={true} />
    </div>
  ))
}

VaultLogo.propTypes = {
  vault: PropTypes.object.isRequired
}



// -- HELPERS --

const toCompact = number => {
  return Locales.toNumber(number, { compact: true, precision: { max: 3 } })
}

const toCurrency = number => {
  return Locales.toCurrency(number, { compact: true })
}

const toPercentage  = number => {
  return Locales.toPercentage(number, { precision: 3 })
}
