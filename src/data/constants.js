export const ZERO_ADDRESS       = '0x0000000000000000000000000000000000000000'
export const ARCHIMIDES_ADDRESS = process.env.NEXT_PUBLIC_ARCHIMIDES_ADDRESS

export const DEFAULT_CHAIN = 80001

// Includes local and test networks for development
export const SUPPORTED_CHAINS = (process.env.NODE_ENV === 'development')
  ? [ 1337, 42161, 421611, 137, 80001 ]
  : [ 80001 ]
