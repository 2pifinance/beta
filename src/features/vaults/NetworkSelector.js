import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { classNames } from '../../lib/html'

const NetworkSelector = ({ chains, value, onChange }) => {
  chains = putFirst(value, chains)

  const networks                  = getNetworks(chains)
  const menuRef                   = useRef(null)
  const [ isActive, setIsActive ] = useState(false)

  if (! isActive) {
    onChange = undefined
  }

  // Close menu when clicking outside
  useEffect(() => {
    // Avoid subscribing to document clicks when menu is closed
    if (! isActive) return

    const onClickOutside = ({ target }) => {
      const menuElement = menuRef.current

      if (menuElement && !menuElement.contains(target)) {
        setIsActive(false)
      }
    }

    // Set `useCature` true in case other click handlers use `stopPropagation()`
    document.addEventListener('click', onClickOutside, true)

    return () => document.removeEventListener('click', onClickOutside, true)
  }, [ isActive ])

  return (
    <div className="network-selector">
      <ul className={classNames({ 'network-selector-list': true, 'is-active': isActive })}
          ref={menuRef} onClick={() => setIsActive(!isActive)}>
        {networks.map(network =>
          <NetworkOption key={network.chainId} network={network} onClick={onChange} />
        )}
      </ul>
    </div>
  )
}

NetworkSelector.propTypes = {
  chains:   PropTypes.array.isRequired,
  value:    PropTypes.number.isRequired,
  onChange: PropTypes.func
}

export default NetworkSelector

const NetworkOption = ({ network, onClick }) => {
  const { chainId, name, logo } = network

  const logoSrc  = `/images/networks/${logo}.svg`
  const _onClick = (onClick) ? () => onClick(chainId) : undefined

  return  (
    <li className="network-selector-item">
      <button className="network-selector-button" type="button" onClick={_onClick}>
        <Image src={logoSrc} alt={name} width="32" height="32" unoptimized={true} />
        <span className="ms-3">{name}</span>
      </button>
    </li>
  )
}

NetworkOption.propTypes = {
  network:  PropTypes.object.isRequired,
  onClick:  PropTypes.func
}



// -- HELPERS --

const networks = {
  0:      { chainId: 0,      name: 'Unsupported network', logo: 'unsupported' },
  1337:   { chainId: 1337,   name: 'Local',               logo: 'localhost' },
  42161:  { chainId: 42161,  name: 'Arbitrum',            logo: 'arbitrum' },
  421611: { chainId: 421611, name: 'Arbitrum test',       logo: 'arbitrum' },
  137:    { chainId: 137,    name: 'Polygon',             logo: 'polygon' },
  80001:  { chainId: 80001,  name: 'Polygon test',        logo: 'polygon' }
}

const getNetworks = chains => {
  return chains.map(chainId => networks[chainId] || networks[0])
}

const putFirst = (item, list) => {
  return [ item, ...list.filter(i => i !== item) ]
}
