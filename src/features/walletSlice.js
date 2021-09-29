import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DEFAULT_CHAIN } from '../data/constants'
import WalletModal from '../helpers/walletModal'



// -- STATE --

const initialState = {
  address:  undefined,
  chainId:  DEFAULT_CHAIN,
  modal:    undefined,
  provider: undefined,
  status:   'idle',
  web3:     undefined
}

export const selectAddress  = state => state.wallet.address
export const selectChainId  = state => state.wallet.chainId
export const selectModal    = state => state.wallet.modal
export const selectProvider = state => state.wallet.provider
export const selectStatus   = state => state.wallet.status
export const selectWeb3     = state => state.wallet.web3



// -- ACTIONS --

export const connectAsync = createAsyncThunk('wallet/connectAsync',
  (_, { dispatch }) => WalletModal.connect(dispatch)
)

export const disconnectAsync = createAsyncThunk('wallet/disconnectAsync',
  async (_, { getState }) => {
    const state    = getState()
    const provider = selectProvider(state)
    const modal    = selectModal(state)

    if (provider?.close) {
      await provider.close()
    }

    if (modal?.clearCachedProvider) {
      await modal.clearCachedProvider()
    }
  }
)



// -- REDUCER --

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,

  reducers: {
    addressChanged: (state, action) => {
      state.address = action.payload.address
    },

    chainChanged: (state, action) => {
      state.chainId = +action.payload.chainId
    }
  },

  extraReducers: {
    [connectAsync.pending]: state => {
      state.status = 'loading'
    },

    [connectAsync.fulfilled]: (state, action) => {
      state.address  = action.payload.address
      state.chainId  = +action.payload.chainId
      state.modal    = action.payload.modal
      state.provider = action.payload.provider
      state.status   = 'success'
      state.web3     = action.payload.web3
    },

    [connectAsync.rejected]: (state, action) => {
      console.error(action.error.name, action.error.message)
      state.status = 'failed'
    },

    [disconnectAsync.pending]: state => {
      state.status = 'loading'
    },

    [disconnectAsync.fulfilled]: state => {
      state.address  = undefined
      state.chainId  = DEFAULT_CHAIN
      state.provider = undefined
      state.status   = 'success'
      state.web3     = undefined
    },

    [disconnectAsync.rejected]: (state, action) => {
      console.error(action.error.name, action.error.message)
      state.status = 'failed'
    }
  }
})

export const {
  addressChanged,
  chainChanged
} = walletSlice.actions

export default walletSlice.reducer
