import PropTypes from 'prop-types'
import { useStore, dropNotification } from '../../store'

export const Notifications = () => {
  const [ { notifications }, dispatch ] = useStore()

  const toNotification = ({ id, type, message }) => {
    const onClose = () => dispatch(dropNotification(id))

    return <Notification key={id} type={type} message={message} onClose={onClose} />
  }

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-5"
         aria-live="polite" aria-atomic="true">
      {notifications.map(toNotification)}
    </div>
  )
}

export default Notifications

const Notification = ({ type, message, onClose }) => {
  const color = toColor(type)

  return (
    <div className={`toast d-flex align-items-center bg-black text-${color} border border-${color}`}
         role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-body">
        <i className={`${toIcon(type)} me-2`}></i>

        {message}
      </div>

      <button className={`btn-close btn-close-white m-auto me-3`}
              type="button" aria-label="Close" onClick={onClose}></button>
    </div>
  )
}

Notification.propTypes = {
  type:    PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
}



// -- HELPERS --

const toColor = type => {
  switch (type) {
    case 'info':    return 'primary'
    case 'success': return 'success'
    case 'error':   return 'danger'
    default:        return ''
  }
}

const toIcon = type => {
  switch (type) {
    case 'info':    return 'bi-exclamation-circle'
    case 'success': return 'bi-check-circle'
    case 'error':   return 'bi-exclamation-triangle'
    default:        return ''
  }
}
