import BigNumber from 'bignumber.js'
import * as Client from '../lib/client'
import { toHuman, toNative } from '../lib/math'

export const getVaults = async (chainId, wallet) => {
  const [ prices, ...data ] = await Promise.all([
    Client.getPrices(chainId),
    ...Client.getVaults(chainId, wallet).map(toVaultData)
  ])

  try {
    const apys = await Client.getApys()

    // Set missing APY for the Curve BTC vault
    const btcCurve = data.find(v => v.id === 'polygon-btc-curve')
    if (btcCurve) { btcCurve.apy = (apys['curve-poly-ren'] || {}).totalApy }

  } catch (error) {}

  // Add prices
  for (const item of data) {
    item.price = prices[item.priceId]
    delete item.priceId
  }

  return data
}

export const approve = async (wallet, vault, amount) => {
  const { id, tokenDecimals } = vault

  const instance     = getVaultInstance(id, wallet)
  const amountNative = toNative(amount, tokenDecimals)

  return instance.approve(amountNative)
}

export const deposit = async (wallet, vault, amount, referral) => {
  const { id, tokenDecimals } = vault

  const instance     = getVaultInstance(id, wallet)
  const amountNative = toNative(amount, tokenDecimals)

  return instance.deposit(amountNative, referral)
}

export const withdraw = async (wallet, vault, amount) => {
  const { id, sharesDecimals, sharePrice } = vault

  const instance     = getVaultInstance(id, wallet)
  const shares       = new BigNumber(amount).div(sharePrice)
  const amountNative = toNative(shares, sharesDecimals)

  return instance.withdraw(amountNative)
}

export const harvest = async (wallet, vault) => {
  const instance = getVaultInstance(vault.id, wallet)

  return instance.harvest()
}



// -- HELPERS --

const getVaultInstance = (vaultId, wallet) => {
  if (! wallet) throw TypeError('Missing signer')

  const vaults = Client.getVaults(wallet.chainId, wallet)
  const vault  = vaults.find(v => v.id === vaultId)

  if (! vault) throw RangeError('Vault not found')

  return vault
}

const getVaultApy = vault => {
  // Avoid the "unimplemented" error on the BTC vault on Curve
  return (vault.id === 'polygon-btc-curve')
    ? undefined
    : vault.apy()
}

const toVaultData = async vault => {
  const [
    apy,
    tvlNative,
    withdrawalFeeNative,
    tokenDecimals,
    wallet
  ] = await Promise.all([
    getVaultApy(vault),
    vault.tvl(),
    vault.withdrawalFee(),
    vault.tokenDecimals(),
    toWalletData(vault)
  ])

  const { id, chainId, priceId, symbol, token, earn, uses } = vault

  const tvl           = toHuman(tvlNative, tokenDecimals)
  const withdrawalFee = toHuman(withdrawalFeeNative, 2)

  const {
    allowance,
    balance,
    deposited,
    sharesDecimals,
    sharePrice,
    twoPiEarned
  } = wallet

  return {
    // Static data
    id,
    chainId,
    priceId,
    symbol,
    token,
    tokenDecimals,
    earn,
    uses,

    // Vault data
    apy,
    tvl,
    withdrawalFee,

    // Wallet data
    allowance,
    balance,
    deposited,
    sharesDecimals,
    sharePrice,
    twoPiEarned,
  }
}

const toWalletData = async vault => {
  if (! vault.canSign()) return {}

  const [
    sharesNative,
    sharesDecimals,
    pricePerFullShare,
    balanceNative,
    allowanceNative,
    pendingPiTokens,
    tokenDecimals
  ] = await Promise.all([
    vault.shares(),
    vault.decimals(),
    vault.pricePerFullShare(),
    vault.balance(),
    vault.allowance(),
    vault.pendingPiTokens(),
    vault.tokenDecimals()
  ])

  const balance     = toHuman(balanceNative, tokenDecimals)
  const shares      = toHuman(sharesNative, sharesDecimals)
  const sharePrice  = toHuman(pricePerFullShare, tokenDecimals)
  const deposited   = shares.times(sharePrice)
  const allowance   = toHuman(allowanceNative, tokenDecimals)
  const twoPiEarned = toHuman(pendingPiTokens, 18)

  return { allowance, balance, deposited, sharesDecimals, sharePrice, twoPiEarned }
}
