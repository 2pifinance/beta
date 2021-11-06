import { toPositiveOrZero, toHuman } from '../../lib/math'

export const toData = async vault => {
  const [ vaultData, walletData, staticData ] = await Promise.all([
    toStaticData(vault),
    toVaultData(vault),
    toWalletData(vault)
  ])

  return { ...staticData, ...vaultData, ...walletData }
}



// -- HELPERS --

const getVaultApy = vault => {
  // Avoid the "unimplemented" error on the BTC vault on Curve
  return (vault.id === 'polygon-btc-curve')
    ? undefined
    : vault.apy()
}

const toStaticData = vault => {
  const { id, chainId, priceId, address, symbol, token, earn, uses } = vault

  return { id, chainId, priceId, address, symbol, token, earn, uses }
}

const toVaultData = async vault => {
  const [
    tokenDecimalsBN,
    unsafeVaultApy,
    unsafeRewardsApy,
    tvlNative,
    withdrawalFeeNative
  ] = await Promise.all([
    vault.tokenDecimals(),
    getVaultApy(vault),
    vault.rewardsApy(),
    vault.tvl(),
    vault.withdrawalFee()
  ])

  const tokenDecimals = parseInt(tokenDecimalsBN.toString())

  // Ensure positive `BigNumber`s
  const vaultApy      = toPositiveOrZero(unsafeVaultApy)
  const rewardsApy    = toPositiveOrZero(unsafeRewardsApy)
  const apy           = vaultApy.plus(rewardsApy)
  const tvl           = toPositiveOrZero(toHuman(tvlNative, tokenDecimals))
  const withdrawalFee = toPositiveOrZero(toHuman(withdrawalFeeNative, 2))

  return { apy, vaultApy, rewardsApy, tokenDecimals, tvl, withdrawalFee }
}

const toWalletData = async vault => {
  if (! vault.canSign()) return {}

  const [
    tokenDecimalsBN,
    sharesNative,
    sharesDecimalsBN,
    pricePerFullShare,
    allowanceNative,
    balanceNative,
    pendingPiTokens
  ] = await Promise.all([
    vault.tokenDecimals(),
    vault.shares(),
    vault.decimals(),
    vault.pricePerFullShare(),
    vault.allowance(),
    vault.balance(),
    vault.pendingPiTokens()
  ])

  const tokenDecimals  = parseInt(tokenDecimalsBN.toString())
  const sharesDecimals = parseInt(sharesDecimalsBN.toString())
  const shares         = toHuman(sharesNative, sharesDecimals)
  const sharePrice     = toHuman(pricePerFullShare, tokenDecimals)

  // Ensure positive `BigNumber`s
  const allowance   = toPositiveOrZero(toHuman(allowanceNative, tokenDecimals))
  const balance     = toPositiveOrZero(toHuman(balanceNative, tokenDecimals))
  const deposited   = toPositiveOrZero(shares.times(sharePrice))
  const twoPiEarned = toPositiveOrZero(toHuman(pendingPiTokens, 18))

  return { allowance, balance, deposited, sharesDecimals, sharePrice, twoPiEarned }
}
