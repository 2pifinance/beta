import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Drawer from '../../components/Drawer'
import VaultSummary from './VaultSummary'
import VaultDetails from './VaultDetails'

const Vault = ({ vault, connected, onUpdate }) => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <React.Fragment>
      <VaultSummary vault={vault} active={isOpen} connected={connected}
                    onToggle={() => setIsOpen(!isOpen)} />

      <Drawer active={isOpen}>
        <VaultDetails vault={vault} connected={connected} onUpdate={onUpdate} />
      </Drawer>
    </React.Fragment>
  )
}

Vault.propTypes = {
  vault:     PropTypes.object.isRequired,
  connected: PropTypes.bool.isRequired,
  onUpdate:  PropTypes.func
}

export default Vault
