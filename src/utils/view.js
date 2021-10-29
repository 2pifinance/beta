export const classNames = names => {
  return Object.keys(names).filter(key => names[key]).join(' ')
}

export const preventDefault = handler => event => {
  event.preventDefault()

  return handler(event)
}
