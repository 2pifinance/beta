import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { SUPPORTED_CHAINS } from '../data/constants'
import { selectChainId, setChainAsync } from '../features/walletSlice'

const putFirst = (item, list) => {
  return [ item, ...list.filter(i => i !== item) ]
}

const classNames = names => {
  return Object.keys(names).filter(key => names[key]).join(' ')
}

const networkName = chainId => {
  const names = {
    1337:   'Local',
    137:    'Polygon',
    80001:  'Polygon test'
  }

  return names[chainId] || 'Unsupported network'
}

const networkLogo = chainId => {
  const logos = {
    1337:   'localhost',
    137:    'polygon',
    80001:  'polygon'
  }

  const basename = logos[chainId] || 'unsupported'

  return `/images/networks/${basename}.svg`
}

const NetworkMenu = () => {
  const [ isActive, setIsActive ] = useState(false)

  const menuRef     = useRef(null)
  const activeChain = useSelector(selectChainId)
  const chains      = putFirst(activeChain, SUPPORTED_CHAINS)

  // Close menu when clicking outside
  useEffect(() => {
    // Avoid subscribing to document clicks when menu is closed
    if (! isActive) return

    const handleClickOutside = ({ target }) => {
      const menuElement = menuRef.current

      if (menuElement && !menuElement.contains(target)) {
        setIsActive(false)
      }
    }

    // Set `useCature` true in case other click handlers use `stopPropagation()`
    document.addEventListener('click', handleClickOutside, true)

    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [ isActive ])

  return (
    <div className="network-menu">
      <ul className={classNames({ 'network-menu-list': true, 'is-active': isActive })}
          ref={menuRef} onClick={() => setIsActive(!isActive)}>
        {chains.map(id =>
          <NetworkItem key={id} chainId={id} disabled={id === activeChain} />
        )}
      </ul>
    </div>
  )
}

const NetworkItem = ({ chainId, disabled }) => {
  const dispatch = useDispatch()
  const name     = networkName(chainId)
  const logo     = networkLogo(chainId)

  const handleClick = (disabled)
    ? null
    : () => dispatch(setChainAsync(chainId))

  return (
    <li key={chainId} className="network-menu-item">
      <button className="network-menu-button" type="button" onClick={handleClick}>
        <Image src={logo} alt={name} width="32" height="32" unoptimized={true} />
        <span className="ms-3">{name}</span>
      </button>
    </li>
  )
}

NetworkItem.propTypes = {
  chainId:  PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default NetworkMenu
