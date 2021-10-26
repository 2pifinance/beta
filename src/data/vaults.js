import BigNumber from 'bignumber.js'
import * as Client from '../lib/client'
import { toHuman, toNative } from '../lib/math'

export const getVaults = async (chainId, wallet) => {
  const [ prices, apys, ...data ] = await Promise.all([
    Client.getPrices(chainId),
    Client.getApys(),
    ...Client.getVaults(chainId, wallet).map(toVaultData)
  ])

  // Set missing APY for the Curve BTC vault
  const btcCurve = data.find(v => v.id === 'polygon-btc-curve')
  if (btcCurve) { btcCurve.apy = (apys['curve-poly-ren'] || {}).totalApy }

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

  await instance.approve(amountNative)

  return { ...vault, allowance: new BigNumber(amount) }
}

export const deposit = async (wallet, vault, amount) => {
  const { id, balance, deposited, tokenDecimals } = vault

  const instance     = getVaultInstance(id, wallet)
  const amountNative = toNative(amount, tokenDecimals)

  await instance.deposit(amountNative)

  return {
    ...vault,
    balance:   balance.minus(amount),
    deposited: deposited.plus(amount)
  }
}

export const withdraw = async (wallet, vault, amount) => {
  const { id, balance, deposited, sharePrice, vaultDecimals } = vault

  const instance     = getVaultInstance(id, wallet)
  const shares       = new BigNumber(amount).div(sharePrice)
  const amountNative = toNative(shares, vaultDecimals)

  await instance.withdraw(amountNative)

  return {
    ...vault,
    balance:   balance.plus(amount),
    deposited: deposited.minus(amount)
  }
}

export const harvest = async (wallet, vault) => {
  const instance = getVaultInstance(vault.id, wallet)

  await instance.harvest()

  return { ...vault, twoPiEarned: new BigNumber(0) }
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
  const [ apy, tvlNative, tokenDecimals, wallet ] = await Promise.all([
    getVaultApy(vault),
    vault.tvl(),
    vault.tokenDecimals(),
    toWalletData(vault)
  ])

  const { id, chainId, symbol, token, earn, uses, priceId }          = vault
  const { allowance, balance, deposited, sharePrice, vaultDecimals } = wallet

  const tvl = toHuman(tvlNative, tokenDecimals)

  return {
    id,
    chainId,
    symbol,
    token,
    tokenDecimals,
    earn,
    uses,
    apy,
    priceId,
    allowance,
    deposited,
    balance,
    sharePrice,
    vaultDecimals,
    tvl
  }
}

const toWalletData = async vault => {
  if (! vault.canSign()) return {}

  const [
    sharesNative,
    vaultDecimals,
    pricePerFullShare,
    balanceNative,
    allowanceNative,
    tokenDecimals
  ] = await Promise.all([
    vault.shares(),
    vault.decimals(),
    vault.pricePerFullShare(),
    vault.balance(),
    vault.allowance(),
    vault.tokenDecimals()
  ])

  const balance    = toHuman(balanceNative, tokenDecimals)
  const shares     = toHuman(sharesNative, vaultDecimals)
  const sharePrice = toHuman(pricePerFullShare, tokenDecimals)
  const deposited  = shares.times(sharePrice)
  const allowance  = toHuman(allowanceNative, tokenDecimals)

  return { allowance, balance, deposited, sharePrice, vaultDecimals }
}
