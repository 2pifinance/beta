import React from 'react'
import { useSelector } from 'react-redux'
import { selectToasts } from '../features/toastsSlice'
import Toast from './toast'

const renderToasts = toasts => {
  return toasts.map((toast, i) => {
    return <Toast key={`toast-${i}`}
                  title={toast.title}
                  body={toast.body}
                  icon={toast.icon}
                  style={toast.style}
                  autohide={!! toast.autohide} />
  })
}

const Toasts = () => {
  const toasts = useSelector(selectToasts)

  if (! toasts.length) return null

  return (
    <div aria-live="polite" aria-atomic="true" className="position-fixed top-0 start-0 end-0">
      <div className="toast-container p-3 ms-0 ms-lg-4 mt-5 pt-5">
        {renderToasts(toasts)}
      </div>
    </div>
  )
}

export default Toasts
