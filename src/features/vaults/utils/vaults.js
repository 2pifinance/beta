import { useState, useEffect } from 'react'
import { isSupportedNetwork, getBlockExplorerUrl } from '../../../data/networks'
import { getVaults as doGetVaults } from '../../../data/vaults'
import { loopWithBackOff } from '../../../lib/function'
import { toDailyRate } from '../../../lib/math'
import { useStore, dropNotificationGroup } from '../../../store'
import { notifyError } from '../../../store/notifications'
import { usePrevious } from '../../../utils/hooks'

const FETCH_INTERVAL = 30 * 1000

export const getVaults = async (chainId, wallet) => {
  const vaults = await doGetVaults(chainId, wallet)

  for (const vault of vaults) {
    vault.rank   = getRank(vault)
    vault.daily  = toDailyRate(vault.apy)
    vault.isFull = vault.availableQuota.isZero()
  }

  return vaults
}

export const useVaults = (chainId, wallet) => {
  const [ _state, dispatch ]  = useStore()
  const [ vaults, setVaults ] = useState()
  const previousChainId       = usePrevious(chainId)

  useEffect(() => {
    if (chainId !== previousChainId) {
      // Reset to show "loading" state
      setVaults(undefined)
    }

    if (! isSupportedNetwork(chainId)) return

    const delay     = (wallet) ? FETCH_INTERVAL : FETCH_INTERVAL * 6
    const getData   = ()     => getVaults(chainId, wallet)
    const onSuccess = vaults => setVaults(vaults)

    const onError = () => {
      dispatch(dropNotificationGroup('fetchVaults'))
      dispatch(fetchError())
    }

    // Start fetch loop
    const cancelLoop = loopWithBackOff(getData, { delay, onSuccess, onError })

    return cancelLoop
  }, [ chainId, wallet ])

  return [ vaults, setVaults ]
}

export const getContractUrl = ({ address, chainId }) => {
  const explorerUrl = getBlockExplorerUrl(chainId)

  if (!address || !explorerUrl) return ''

  return `${explorerUrl}address/${address}`
}



// -- HELPERS --

const ranks = {
  'polygon-2pi-maxi':        1,
  'polygon-btc-aave':        2,
  'polygon-eth-aave':        3,
  'polygon-dai-aave':        4,
  'polygon-usdc-aave':       5,
  'polygon-usdt-aave':       6,
  'polygon-matic-aave':      7,
  'polygon-eth-2pi-sushi':   8,
  'polygon-dai-2pi-sushi':   9,
  'polygon-matic-2pi-sushi': 10
}

const getRank = ({ id }) => {
  return ranks[id] || 9999
}

const fetchError = () => {
  return notifyError('fetchVaults',
    'We can’t reach out some resources, please refresh the page and try again'
  )
}
