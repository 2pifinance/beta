import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getVaults } from '../data/vaults'
import vaultsList from '../data/vaults/list'
import { errorToastAdded } from './toastsSlice'
import {
  selectAddress,
  selectChainId,
  selectProvider,
  selectWeb3
} from './walletSlice'



// -- STATE --

const initialState = {
  order:  0,
  errors: 0,
  status: 'idle',
  value:  vaultsList
}

const selectOrder  = state => state.vaults.order
const selectErrors = state => state.vaults.errors

export const selectStatus = state => state.vaults.status
export const selectVaults = state => state.vaults.value



// -- ACTIONS --

export const fetchVaultsDataAsync = createAsyncThunk('vaults/fetchVaultsData',
  async (_, { dispatch, getState }) => {
    const state    = getState()
    const address  = selectAddress(state)
    const chainId  = selectChainId(state)
    const errors   = selectErrors(state)
    const order    = selectOrder(state)
    const provider = selectProvider(state)
    const web3     = selectWeb3(state)

    const wallet = (address)
      ? { chainId, address, provider, web3 }
      : undefined

    try {
      const vaults = await fetchVaults(chainId, wallet)

      dispatch(vaultsLoaded({ order, vaults }))
    } catch (error) {
      // Don't complain on first fetch error, they are too frequent
      if (errors > 2) {
        dispatch(fetchErrorAdded())
      }

      dispatch(vaultsFetchError())
    }
  }
)

const fetchVaults = async (chainId, wallet) => {
  const base = vaultsList[chainId] || []
  const data = await getVaults(chainId, wallet)

  const vaults = base.map(vault => {
    const vaultData = data.find(item => item.id === vault.id) || {}

    return { ...vault, ...vaultData }
  })

  return { ...vaultsList, [chainId]: vaults }
}

const fetchErrorAdded = () => {
  const title = 'Data loading error'
  const msg   = 'We can’t reach out some resources, please refresh the page and try again'

  return errorToastAdded(title, msg)
}



// -- REDUCER --

export const vaultsSlice = createSlice({
  name: 'vaults',
  initialState,

  reducers: {
    newVaultFetch: state => {
      state.order++
    },

    resetVaults: state => {
      state.status = initialState.status
      state.value  = initialState.value
    },

    vaultsLoaded: (state, action) => {
      if (action.payload.order === state.order) {
        state.status = 'loaded'
        state.value  = action.payload.vaults
        state.errors = 0
      }
    },

    vaultsFetchError: state => {
      state.errors++
    }
  },

  extraReducers: {
    [fetchVaultsDataAsync.pending]: state => {
      state.status = 'loading'
    },

    [fetchVaultsDataAsync.fulfilled]: state => {
      state.status = 'succeded'
    },

    [fetchVaultsDataAsync.rejected]: (state, action) => {
      console.error(action.error.name, action.error.message)
      state.status = 'failed'
    }
  }
})

export const {
  newVaultFetch,
  resetVaults,
  vaultsLoaded,
  vaultsFetchError
} = vaultsSlice.actions

export default vaultsSlice.reducer
