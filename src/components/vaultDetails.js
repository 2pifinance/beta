import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import VaultActions from './vaultActions'
import Claim from './claim'
import { toDailyRate } from '../lib/math'
import { formatAmount, toPercentage } from '../helpers/format'

const VaultDetails = ({ vault }) => {
  const { apy, balance, deposited, price, token, tvl } = vault

  const daily        = toDailyRate(apy || 0)
  const depositedUsd = deposited?.times(price)
  const tvlUsd       = tvl?.times(price)

  return (
    <React.Fragment>
      <div className="text-center">
        <Image src={`../images/tokens/${token}.svg`} alt={token} height="48" width="48" unoptimized={true} />

        <h3 className="h4 mt-2 mb-1">
          {vault.symbol}
        </h3>

        <p className="small text-muted mb-0">
          Uses:
          <span className="ms-2">
            {vault.uses}
          </span>
        </p>

        <hr className="border border-primary border-1 opacity-100" />

        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-7">
            <div className="row my-2">
              <div className="col-6 text-start">
                <p className="text-muted fw-bold mb-0">
                  Balance
                </p>
              </div>
              <div className="col-6 text-end">
                <p className="fw-bold mb-0">
                  {balance ? formatAmount(balance, '', 8) : '-'}
                </p>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-6 text-start">
                <p className="text-muted fw-bold mb-0">
                  Deposited
                </p>
              </div>
              <div className="col-6 text-end">
                <p className="fw-bold mb-0">
                  {deposited ? formatAmount(deposited, '', 8) : '-'}
                </p>
              </div>
            </div>

            <Claim vault={vault} />

            <div className="row my-2">
              <div className="col-6 text-start">
                <p className="text-muted fw-bold mb-0">
                  APY
                </p>
              </div>
              <div className="col-6 text-end">
                <p className="fw-bold mb-0">
                  {toPercentage(vault.apy)}
                </p>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-6 text-start">
                <p className="text-muted fw-bold mb-0">
                  Daily
                </p>
              </div>
              <div className="col-6 text-end">
                <p className="fw-bold mb-0">
                  {toPercentage(daily)}
                </p>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-6 text-start">
                <p className="text-muted fw-bold mb-0">
                  <abbr title="Total assets">TA</abbr>
                </p>
              </div>
              <div className="col-6 text-end">
                <p className="fw-bold mb-0">
                  {tvlUsd ? formatAmount(tvlUsd, '$') : '-'}
                </p>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-6 text-start">
                <p className="text-muted fw-bold mb-0">
                  Earn
                </p>
              </div>
              <div className="col-6 text-end">
                <p className="fw-bold mb-0">
                  {vault.earn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-primary border-1 opacity-100" />

      <VaultActions vault={vault} />

      <div className="text-center mt-4">
        <h3 className="h6 text-muted text-uppercase">
          Your balance
        </h3>

        <p className="fw-bold mb-0">
          {depositedUsd ? formatAmount(depositedUsd, '$') : '-'}
        </p>
      </div>
    </React.Fragment>
  )
}

VaultDetails.propTypes = {
  vault: PropTypes.object.isRequired
}

export default VaultDetails
