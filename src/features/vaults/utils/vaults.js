import { useState, useEffect } from 'react'
import { isSupportedNetwork } from '../../../data/networks'
import { getVaults as doGetVaults } from '../../../data/vaults'
import { loopWithBackOff } from '../../../lib/function'
import { toDailyRate } from '../../../lib/math'
import { useStore, dropNotificationGroup } from '../../../store'
import { notifyError } from '../../../store/notifications'

const FETCH_INTERVAL = 30 * 1000

export const getVaults = async (chainId, wallet) => {
  const vaults = await doGetVaults(chainId, wallet)

  for (const vault of vaults) {
    vault.daily = vault.apy && toDailyRate(vault.apy)
  }

  return vaults
}

export const useVaults = (chainId, wallet) => {
  const [ _state, dispatch ]  = useStore()
  const [ vaults, setVaults ] = useState()

  useEffect(() => {
    // Reset to show "loading" state
    setVaults(undefined)

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

const fetchError = () => {
  const msg = 'We can’t reach out some resources, please refresh the page and try again'

  return notifyError('fetchVaults', msg)
}
