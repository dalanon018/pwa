import { slice } from 'ramda'

export const categoriesGroup = (data) => {
  const fil = data.reduce((acc, current, key) => {
    const group = slice(0, 1, current.get('name'))
    if (typeof acc[group] === 'undefined') {
      acc[group] = []
    }
    acc[group].push(current)
    return acc
  }, {})

  return fil
}
