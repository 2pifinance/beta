import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Drawer from '../../components/Drawer'
import VaultSummary from './VaultSummary'
import VaultDetails from './VaultDetails'

const Vault = ({ vault, connected, onUpdate }) => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <React.Fragment>
      <VaultMessage vault={vault} />

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

const VaultMessage = ({ vault: { isPaused, isFull } }) => {
  if (isPaused) {
    return (
      <div className="alert alert-danger text-center m-5 mb-n2" role="alert">
        <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
        <strong>Deposits are temporary disabled at this vault.</strong>
      </div>
    )
  }

  if (isFull) {
    return (
      <div className="alert alert-success text-center m-5 mb-n2" role="alert">
        <i className="bi bi-check-circle-fill text-success me-2"></i>
        <strong>Vault at Max Cap:</strong>{' '}
        Stay tuned until the deposits limit is raised.
      </div>
    )
  }

  return null
}

VaultMessage.propTypes = {
  vault: PropTypes.object.isRequired
}
