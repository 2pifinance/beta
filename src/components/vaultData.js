import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Back from './back'
import VaultDetails from './vaultDetails'
import { selectVaults } from '../features/vaultsSlice'
import { constantVaultFetch } from '../helpers/vaults'
import { selectAddress, selectChainId } from '../features/walletSlice'

const render = vault => {
  if (vault) {
    return <VaultDetails vault={vault} />
  } else {
    return (
      <div className="alert alert-warning">
        <p className="mb-0">
          Vault not found
        </p>
      </div>
    )
  }
}

const VaultData = props => {
  const address  = useSelector(selectAddress)
  const chainId  = useSelector(selectChainId)
  const vaults   = useSelector(selectVaults)
  const dispatch = useDispatch()
  const vault    = (vaults[chainId] || []).find(vault => vault.key === props.id)

  useEffect(() => {
    return constantVaultFetch(address, chainId, dispatch)
  }, [address, chainId, dispatch])

  return (
    <div className="row justify-content-center">
      <div className="col-lg-9 col-xl-7">
        <div className="card my-4 shadow-none">
          <div className="card-body bg-blur border border-primary border-2 rounded px-lg-5 py-lg-4">
            <div className="text-start mb-0">
              <Back />
            </div>

            <div className="mt-4">
              {render(vault)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

VaultData.propTypes = {
  id: PropTypes.string.isRequired
}

export default VaultData
