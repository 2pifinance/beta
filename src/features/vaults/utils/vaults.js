import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SUPPORTED_CHAINS } from '../../../data/constants'
import { getVaults as doGetVaults } from '../../../data/vaults'
import { loopWithBackOff } from '../../../lib/function'
import { errorToastAdded } from '../../toastsSlice'
import { toDailyRate } from '../../../lib/math'

const FETCH_INTERVAL = 30 * 1000

export const getVaults = async (chainId, wallet) => {
  const vaults = await doGetVaults(chainId, wallet)

  for (const vault of vaults) {
    vault.daily = toDailyRate(vault.apy)
  }

  return vaults
}

export const useVaults = (chainId, wallet) => {
  const dispatch = useDispatch()
  const [ vaults, setVaults ] = useState()

  useEffect(() => {
    if (! SUPPORTED_CHAINS.includes(chainId)) return

    const delay     = (wallet) ? FETCH_INTERVAL : FETCH_INTERVAL * 6
    const getData   = ()     => getVaults(chainId, wallet)
    const onSuccess = vaults => setVaults(vaults)
    const onError   = ()     => dispatch(fetchErrorAdded())

    // Start fetch loop
    const cancelLoop = loopWithBackOff(getData, { delay, onSuccess, onError })

    return cancelLoop
  }, [ chainId, wallet, dispatch ])

  return [ vaults, setVaults ]
}

const fetchErrorAdded = () => {
  const title = 'Data loading error'
  const msg   = 'We can’t reach out some resources, please refresh the page and try again'

  return errorToastAdded(title, msg)
}
