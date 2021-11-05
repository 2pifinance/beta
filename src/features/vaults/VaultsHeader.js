import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'
import { SUPPORTED_CHAINS } from '../../data/constants'
import { toCurrency } from '../../lib/locales'
import NetworkSelector from './NetworkSelector'

const VaultsHeader = ({ chainId, vaults, connected = false, onChainChange }) => {
  const tvl       = (vaults) ? aggregateTvl(vaults) : undefined
  const deposited = (vaults && connected) ? aggregateDeposits(vaults) : undefined

  return (
    <header className="vaults-header box-rounded box-ruler bg-blur mb-5 py-3 px-5 px-lg-7">
      <div className="vaults-header-network mb-3 mb-lg-0">
        <p className="d-none d-lg-block vaults-header-network-label">
          Select network
        </p>

        <NetworkSelector chains={SUPPORTED_CHAINS} value={chainId} onChange={onChainChange} />
      </div>

      <div className="box-corners text-lg-end pb-5 py-xl-2 px-xl-7">
        <div className="mb-2">
          <p className="vaults-header-stat fs-1">
            {(tvl) ? toCurrency(tvl, { precision: 0 }) : <Placeholder />}
          </p>
          <p className="vaults-header-stat-label">TVL</p>
        </div>

        <div className="mb-2">
          <p className="vaults-header-stat fs-2">
            {(deposited) ? toCurrency(deposited, { compact: true }) : <Placeholder />}
          </p>
          <p className="vaults-header-stat-label">Deposited</p>
        </div>

        <small className="d-block text-muted ms-xl-5 mb-xl-n3 me-xl-n7">
          This app is experimental, please do your own research.
        </small>
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
