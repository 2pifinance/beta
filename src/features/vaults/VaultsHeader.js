import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import { SUPPORTED_CHAINS } from '../../data/constants'
import { toCurrency } from '../../lib/locales'
import NetworkSelector from './NetworkSelector'

const VaultsHeader = ({ chainId, vaults, connected = false, onChainChange }) => {
  const tvl       = (vaults) ? aggregateTvl(vaults) : undefined
  const deposited = (vaults && connected) ? aggregateDeposits(vaults) : undefined

  return (
    <header className="vaults-header mb-5 p-5 py-lg-6 px-lg-7">
      <div className="vaults-header-network">
        <p className="vaults-header-network-label">Select network</p>

        <NetworkSelector chains={SUPPORTED_CHAINS} value={chainId} onChange={onChainChange} />
      </div>

      <div className="text-lg-end pb-5 pb-lg-0">
        <div className="mb-2">
          <p className="vaults-header-stat fs-1">
            {(tvl) ? toCurrency(tvl, { precision: 0 }) : <Placeholder />}
          </p>
          <p className="vaults-header-stat-label">TVL</p>
        </div>

        <div className="">
          <p className="vaults-header-stat fs-2">
            {(deposited) ? toCurrency(deposited, { compact: true }) : <Placeholder />}
          </p>
          <p className="vaults-header-stat-label">Deposited</p>
        </div>

        <p className="text-muted">
          This app is experimental, please do your own research.
        </p>
      </div>
    </header>
  )
}

VaultsHeader.propTypes = {
  chainId:       PropTypes.number,
  vaults:        PropTypes.array,
  connected:     PropTypes.bool,
  onChainChange: PropTypes.func
}

export default VaultsHeader

const Placeholder = () => {
  return <span className="vaults-header-placeholder">***.**</span>
}

const aggregateTvl = vaults => {
  return vaults.reduce((total, { tvl, price }) => {
    const tvlUsd = tvl?.times(price)

    return tvlUsd?.isFinite() ? total.plus(tvlUsd) : total
  }, new BigNumber('0'))
}

const aggregateDeposits = vaults => {
  return vaults.reduce((total, { deposited, price }) => {
    const depositedUsd = deposited?.times(price)

    return depositedUsd?.isFinite() ? total.plus(depositedUsd) : total
  }, new BigNumber('0'))
}
