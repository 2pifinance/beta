import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectWallet, selectChainId, setChainAsync } from '../walletSlice'
import { getVaults, useVaults } from './utils/vaults'
import VaultsHeader from './VaultsHeader'
import VaultsTable from './VaultsTable'
import Mint from '../mint/Mint'

const Vaults = () => {
  const dispatch              = useDispatch()
  const chainId               = useSelector(selectChainId)
  const wallet                = useSelector(selectWallet)
  const isConnected           = (wallet !== undefined)
  const [ vaults, setVaults ] = useVaults(chainId, wallet)

  const onChainChange = chainId  => {
    dispatch(setChainAsync(chainId))
  }

  const onUpdate = async () => {
    const vaults = await getVaults(chainId, wallet)

    setVaults(vaults)
  }

  return (
    <React.Fragment>
      <VaultsHeader chainId={chainId} vaults={vaults} connected={isConnected}
                    onChainChange={onChainChange} />

      {(isConnected) ? <Mint /> : null }

      {(vaults)
         ? <VaultsTable vaults={vaults} connected={isConnected} onUpdate={onUpdate} />
         : <Loading />
      }
    </React.Fragment>
  )
}

export default Vaults

const Loading = () => (
  <div className="text-center my-8">
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
)
