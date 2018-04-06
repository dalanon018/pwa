
/**
 * flatten
 */
export const flattenChildrenArray = (collections) => {
  return collections.reduce((flattenMap, { children, ...rest }) => {
    if (Array.isArray(children)) {
      flattenMap = flattenMap.concat(...flattenChildrenArray(children))
    }
    flattenMap = flattenMap.concat(rest)

    return flattenMap
  }, [])
}
