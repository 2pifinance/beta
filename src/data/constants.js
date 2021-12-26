export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const DEFAULT_CHAIN = 43113

// Includes local and test networks for development
export const SUPPORTED_CHAINS = (process.env.NODE_ENV === 'development')
  ? [ 1337, 42161, 421611, 43113, 43114, 137, 80001 ]
  : [ 43113, 43114, 80001 ]
