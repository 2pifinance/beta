import { toCompoundRate, toPositiveOrZero, toHuman } from '../../lib/math'

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
    unsafeRewardsApr,
    tvlNative,
    withdrawalFeeNative,
    isPaused,
    quotaNative,
    availableQuotaNative
  ] = await Promise.all([
    vault.tokenDecimals(),
    getVaultApy(vault),
    vault.rewardsApr(),
    vault.tvl(),
    vault.withdrawalFee(),
    vault.paused(),
    vault.depositCap(),
    vault.availableDeposit()
  ])

  const tokenDecimals = Number(tokenDecimalsBN.toString())
  const vaultApy      = Number(unsafeVaultApy.toString()) || 0
  const rewardsApr    = Number(unsafeRewardsApr.toString()) || 0

  // Ensure positive `BigNumber`s
  const withdrawalFee  = toPositiveOrZero(toHuman(withdrawalFeeNative, 2))
  const quota          = toPositiveOrZero(toHuman(quotaNative, tokenDecimals))
  const availableQuota = toPositiveOrZero(toHuman(availableQuotaNative, tokenDecimals))
  const tvl            = toPositiveOrZero(toHuman(tvlNative, tokenDecimals))

  // Total APY. Assumes rewards are claimed manually, swapped,
  // and re-invested daily on the same vault.
  const apy = (1 + toCompoundRate(rewardsApr)) * (1 + vaultApy) - 1

  return {
    apy,
    vaultApy,
    rewardsApr,
    withdrawalFee,
    tokenDecimals,
    quota,
    availableQuota,
    tvl,
    isPaused
  }
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

  const tokenDecimals  = Number(tokenDecimalsBN.toString())
  const sharesDecimals = Number(sharesDecimalsBN.toString())
  const shares         = toHuman(sharesNative, sharesDecimals)
  const sharePrice     = toHuman(pricePerFullShare, tokenDecimals)

  // Ensure positive `BigNumber`s
  const allowance   = toPositiveOrZero(toHuman(allowanceNative, tokenDecimals))
  const balance     = toPositiveOrZero(toHuman(balanceNative, tokenDecimals))
  const deposited   = toPositiveOrZero(shares.times(sharePrice))
  const twoPiEarned = toPositiveOrZero(toHuman(pendingPiTokens, 18))

  return { allowance, balance, deposited, sharesDecimals, sharePrice, twoPiEarned }
}
