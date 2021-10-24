import { env } from 'process'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from '../data/constants'
import { networks } from '../data/networks'
import { connect, disconnect, addChain } from '../helpers/wallet'
import { errorToastAdded, toastDestroyed } from './toastsSlice'



// -- STATE --

const initialState = {
  address:  undefined,
  chainId:  DEFAULT_CHAIN,
  modal:    undefined,
  provider: undefined,
  status:   'idle',
  web3:     undefined
}

export const selectWallet   = ({ wallet }) => (wallet?.address) ? wallet : undefined
export const selectAddress  = state => state.wallet.address
export const selectChainId  = state => state.wallet.chainId
export const selectModal    = state => state.wallet.modal
export const selectProvider = state => state.wallet.provider
export const selectStatus   = state => state.wallet.status
export const selectWeb3     = state => state.wallet.web3



// -- ACTIONS --

export const connectAsync = createAsyncThunk('wallet/connectAsync',
  async (_, { dispatch }) => {
    const title   = 'Unsupported network.'
    const message = 'Switch your wallet to a supported network.'

    // Close previous errors, if any.
    dispatch(toastDestroyed(title))

    // Connect and get wallet info
    const data = await connect()

    if (! SUPPORTED_CHAINS.includes(data.chainId)) {
      // Notify the wallet is set to an unsupported chain
      dispatch(errorToastAdded(title, message))

      // Request adding/swithing to the default chain.
      // NOTE: Avoid awaiting this, it _hangs_ without error on some clients.
      addChain(DEFAULT_CHAIN)
    }

    return data
  }
)

export const disconnectAsync =
  createAsyncThunk('wallet/disconnectAsync', disconnect)

export const setChainAsync = createAsyncThunk('wallet/addChainAsync',
  async (chainId, { dispatch }) => {
    if (! SUPPORTED_CHAINS.includes(chainId)) return

    const network = networks[chainId].chainName
    const title   = 'Unsupported network.'
    const message = `Add the ${network} network to your wallet.`

    // Close previous errors, if any.
    dispatch(toastDestroyed(title))

    // Avoid awaiting, this _hangs_ without error on some clients.
    addChain(chainId).catch(() => dispatch(errorToastAdded(title, message)))

    // Wallet address is the same for all chains, so it's safe to asume wallet
    // network did change, fetch and show balance info.
    return chainId
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
    },

    [setChainAsync.fulfilled]: (state, action) => {
      state.chainId = +action.payload
    }
  }
})

export const {
  addressChanged,
  chainChanged
} = walletSlice.actions

export default walletSlice.reducer
