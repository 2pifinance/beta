import BigNumber from 'bignumber.js'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall'
import vaults from '../data/vaults'
import { fetchApys, getVaultApy } from '../helpers/apy'
import { getEthersProvider } from '../helpers/ethers'
import { getPrices } from '../helpers/prices'
import { toastAdded, toastDestroyed } from './toastsSlice'
import { vaultsLoaded, vaultsFetchError } from './vaultsSlice'

const chunk = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  )
}

const getMaxVaultApy = (vault, dataProvider, distributionManager, prices) => {
  return Math.max(
    getVaultApy(vault, dataProvider, distributionManager, prices),
    getVaultApy(vault, dataProvider, distributionManager, prices, 0)
  )
}

const call = (promises, keys, chainId, dispatch, order, errors) => {
  Promise.all(promises).then(results => {
    const [ apys, data, prices ] = results
    const extraData = []

    chunk(data, keys.length).forEach((chunkedData, i) => {
      let dataProvider
      let distributionManager = {}

      extraData[i] = {}

      chunkedData.forEach((valueData, j) => {
        switch (keys[j]) {
          case 'dataProvider':
            dataProvider = valueData
            break
          case 'distributionSupply':
            distributionManager['supply'] = valueData
            break
          case 'distributionBorrow':
            distributionManager['borrow'] = valueData
            break
          default:
            extraData[i][keys[j]] = new BigNumber(valueData.toString())
        }
      })

      let vault = {
        ...vaults[chainId][i],
        ...extraData[i],
      }

      // MATIC is the native token so it doesn't need allowance
      if (vault.token === 'matic') {
        extraData[i]['allowance'] = new BigNumber(1e58.toString())
      }

      if (vault.token === '2Pi') {
        extraData[i]['apy'] = 0.1
      } else if (vault.pool === 'curve') {
        extraData[i]['apy'] = (apys['curve-poly-ren'] || {}).totalApy
      } else {
        extraData[i]['apy'] = getMaxVaultApy(vault, dataProvider, distributionManager, prices)
      }
    })

    const vaultsData = vaults[chainId].map((vault, i) => {
      const usdPrice = prices && prices[vault.priceId] && prices[vault.priceId]['usd']

      return {
        ...vault,
        ...extraData[i],
        usdPrice
      }
    })

    dispatch(
      vaultsLoaded({
        order:  order,
        vaults: {
          ...vaults,
          [chainId]: vaultsData
        }
      })
    )
    dispatch(toastDestroyed('Data loading error'))
  }).catch(error => {
    dispatch(vaultsFetchError())

    // Do not complain on first fetch error since they are so frequent
    if (errors > 2) {
      dispatch(
        toastAdded({
          title: 'Data loading error',
          body:  "We can't reach out some resources, please refresh the page and try again",
          icon:  'exclamation-triangle',
          style: 'danger'
        })
      )
    }
  })
}

const getKeys = address => {
  const keys = [
    'decimals',
    'pricePerFullShare',
    'tvl',
    'vaultDecimals',
    'dataProvider',
    'distributionSupply',
    'distributionBorrow'
  ]

  if (address) {
    keys.push(
      'balance',
      'allowance',
      'shares',
      'pendingTokens'
    )
  }

  return keys
}

const vaultAbi = (v, chainId) => {
  if (chainId === 80001) {
    if (v.token === '2Pi') {
      return require(`../abis/main/${chainId}/2Pi`).default
    } else {
      return require(`../abis/main/${chainId}/archimedes`).default
    }
  } else {
    return require(`../abis/vaults/${chainId}/${v.pool}-${v.token}`).default
  }
}

const getCalls = (address, chainId, ethcallProvider, v) => {
  const vault         = vaultAbi(v, chainId)
  const token         = require(`../abis/tokens/${chainId}/${v.token}`).default
  const vaultContract = new Contract(vault.address, vault.abi)

  let results, decimals, balance, allowance

  if (token.abi) {
    const tokenContract = new Contract(token.address, token.abi)

    decimals  = tokenContract.decimals()
    balance   = tokenContract.balanceOf(address)
    allowance = tokenContract.allowance(address, vault.address)
  } else {
    // MATIC is native so it needs other functions
    if (chainId === 80001 && v.token !== '2Pi') {
      decimals = vaultContract.decimals(v.pid) // same decimals
    } else {
      decimals = vaultContract.decimals() // same decimals
    }

    balance   = ethcallProvider.getEthBalance(address)
    allowance = ethcallProvider.getEthBalance(address) // fake allowance
  }

  if (chainId === 80001 && v.token !== '2Pi') {
    results = [
      decimals,
      vaultContract.getPricePerFullShare(v.pid),
      vaultContract.balance(v.pid),
      vaultContract.decimals(v.pid)
    ]
  } else {
    results = [
      decimals,
      vaultContract.getPricePerFullShare(),
      vaultContract.balance(),
      vaultContract.decimals()
    ]
  }

  if (v.pool === 'aave') {
    const pool                        = require(`../abis/pools/${chainId}/${v.pool}`).default
    const dataProviderContract        = new Contract(pool.dataProvider.address, pool.dataProvider.abi)
    const distributionManagerContract = new Contract(pool.distributionManager.address, pool.distributionManager.abi)

    results.push(
      dataProviderContract.getReserveData(token.address),
      distributionManagerContract.assets(vault.aToken.address),
      distributionManagerContract.assets(vault.debtToken.address)
    )
  } else {
    // fake to keep order
    results.push(
      ethcallProvider.getEthBalance(address || token.address),
      ethcallProvider.getEthBalance(address || token.address),
      ethcallProvider.getEthBalance(address || token.address)
    )
  }

  if (address) {
    let balanceCall, pendingTokensCall

    if (chainId === 80001 && vaultContract.pendingPiToken) {
      balanceCall       = vaultContract.balanceOf(v.pid, address)
      pendingTokensCall = vaultContract.pendingPiToken(v.pid, address)
    } else {
      balanceCall       = vaultContract.balanceOf(address)
      pendingTokensCall = vaultContract.balanceOf(address) // _fake_ call
    }

    results.push(balance, allowance, balanceCall, pendingTokensCall)
  }

  return results
}

export async function fetchVaultsData (
  address,
  chainId,
  provider,
  web3,
  dispatch,
  order,
  errors
) {
  // Localhost address
  setMulticallAddress(1337, process.env.NEXT_PUBLIC_LOCAL_MULTICALL_ADDR)

  const ethersProvider  = getEthersProvider(provider, chainId)
  const ethcallProvider = new Provider(ethersProvider)
  const keys            = getKeys(address)

  await ethcallProvider.init()

  const calls = vaults[chainId].flatMap(vault => {
    return getCalls(address, chainId, ethcallProvider, vault)
  })

  const promises = [
    fetchApys(),
    ethcallProvider.all(calls),
    getPrices(vaults[chainId], dispatch)
  ]

  call(promises, keys, chainId, dispatch, order, errors)
}
