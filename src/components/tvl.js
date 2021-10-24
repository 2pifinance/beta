import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectVaults } from '../features/vaultsSlice'
import { selectChainId } from '../features/walletSlice'

const Tvl = () => {
  const chainId     = useSelector(selectChainId)
  const vaults      = useSelector(selectVaults)
  const chainVaults = vaults[chainId] || []

  const tvl = chainVaults.reduce((total, { tvl, price }) => {
    const amount = tvl?.times(price)

    return amount?.isFinite() ? total.plus(amount) : total
  }, new BigNumber('0'))

  return (
    <div className="row mt-4">
      <div className="col-8 col-sm-9 col-lg-10 text-end border-end pe-3 border-2">
        <h3 className="h4 text-primary fw-bold mb-0">
          ${tvl.isZero() ? ' -' : tvl.toFormat(0)}
        </h3>
      </div>
      <div className="col-4 col-sm-3 col-lg-2">
        <h2 className="h5 fw-bold mb-0 mt-1">
          <abbr title="Total value locked">TVL</abbr>
        </h2>
      </div>
    </div>
  )
}

export default Tvl
