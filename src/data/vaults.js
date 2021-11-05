import * as Client from '../lib/client'
import { toBigNumber, toNative } from '../lib/math'
import { toData } from './vaults/vault'

export const getVaults = async (chainId, wallet) => {
  const [ prices, ...data ] = await Promise.all([
    Client.getPrices(chainId),
    ...Client.getVaults(chainId, wallet).map(toData)
  ])

  try {
    const apys     = await Client.getApys()
    const btcCurve = data.find(v => v.id === 'polygon-btc-curve')

    if (btcCurve) {
      // Set missing APY for the Curve BTC vault
      btcCurve.apy = (apys['curve-poly-ren'] || {}).totalApy
    }
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
  const shares       = toBigNumber(amount).div(sharePrice)
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
