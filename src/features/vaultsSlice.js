import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SUPPORTED_CHAINS } from '../data/constants'
import vaults from '../data/vaults'
import { fetchVaultsData } from './fetchVaultsData'
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
  value:  vaults
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

    if (SUPPORTED_CHAINS.includes(chainId)) {
      fetchVaultsData(address, chainId, provider, web3, dispatch, order, errors)
    }
  }
)



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
