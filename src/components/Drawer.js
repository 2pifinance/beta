import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'

export const Drawer = ({ active, children }) => {
  const ref                   = useRef(null)
  const [ height, setHeight ] = useState(0)

  useEffect(() => {
    const newHeight = (active) ? ref.current.scrollHeight : 0

    setHeight(newHeight)
  })

  return (
    <div className="drawer" style={{ height: `${height}px`}}>
      <div ref={ref} style={{ overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}

Drawer.propTypes = {
  active:   PropTypes.bool,
  children: PropTypes.node
}

export default Drawer
