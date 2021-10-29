import { useEffect, useRef } from 'react'

// It’s possible that React provides `usePrevious` out of the box in the future.
// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
export const usePrevious = value => {
  const ref = useRef()

  useEffect(() => ref.current = value)

  return ref.current
}
