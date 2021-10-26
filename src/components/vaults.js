import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import VaultItem from './vaultItem'
import { selectVaults } from '../features/vaultsSlice'
import { constantVaultFetch } from '../helpers/vaults'
import { selectAddress, selectChainId } from '../features/walletSlice'

const renderVault = vault => (
  <VaultItem key={vault.id}
             apy={vault.apy}
             balance={vault.balance}
             color={vault.color}
             deposited={vault.deposited}
             earn={vault.earn}
             price={vault.price}
             symbol={vault.symbol}
             token={vault.token}
             tvl={vault.tvl}
             uses={vault.uses}
             vaultId={vault.id} />
)

const Vaults = () => {
  const dispatch      = useDispatch()
  const address       = useSelector(selectAddress)
  const chainId       = useSelector(selectChainId)
  const vaults        = useSelector(selectVaults)
  const currentVaults = vaults[chainId] || []

  useEffect(() => {
    return constantVaultFetch(address, chainId, dispatch)
  }, [address, chainId, dispatch])

  return (
    <div className="mt-1 pt-3 pt-lg-0">
      <div className="d-flex my-4">
        <h2 className="h2 fw-bold flex-grow-1 mb-0">
          Vaults
        </h2>

        <p className="small text-muted text-right align-self-end mb-0 ms-4">
          Withdrawal Fee: 0.1%.
        </p>

        <p className="small text-muted text-right align-self-end mb-0 ms-1">
          Deposit Fee: 0%.
        </p>
      </div>

      <div className="mt-3">
        {currentVaults.map(renderVault)}
      </div>
    </div>
  )
}

export default Vaults
