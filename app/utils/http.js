import {
  adjust,
  compose,
  concat,
  fromPairs,
  join,
  map,
  replace,
  split,
  toPairs
} from 'ramda'
/**
 * Query serialization
 * @param {*} params
 */
export const fnSearchParams = (params) => compose(
  concat('?'),
  join('&'),
  map(join('=')),
  toPairs
)(params)

/**
 * from Query to Object
 */
export const fnQueryObject = (queryParams) => {
  const handeDecodeError = (data) => {
    try {
      const partiallyDecoded = decodeURI(data)
      // we need to clean and replace % to empty if its not converted correclty
      return decodeURIComponent(partiallyDecoded).replace('%', '')
    } catch (e) {
      return ''
    }
  }

  const parseQueryString = compose(
    fromPairs,
    map(compose(
      adjust(handeDecodeError, 1),
      split('=')
    )),
    split('&'),
    replace('?', '')
  )

  return parseQueryString(queryParams)
}

export const getBrowserInfo = () => {
  let ua = navigator.userAgent
  let tem
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return {name: 'IE ', version: (tem[1] || '')}
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) { return {name: 'Opera', version: tem[1]} }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]) }
  return {
    name: M[0],
    version: M[1]
  }
}

export const isIphone = () => {
  const useragent = navigator.userAgent
  if (
    useragent.match(/iPhone/i) ||
    useragent.match(/iPod/i) ||
    useragent.match(/iPad/i)
  ) {
    return true
  }

  return false
}

export const isMobileDevice = () => {
  const useragent = navigator.userAgent

  if (
    useragent.match(/Android/i) ||
    useragent.match(/webOS/i) ||
    useragent.match(/Windows Phone/i) ||
    useragent.match(/SymbianOS/i) ||
    useragent.match(/RIM/i) ||
    useragent.match(/BB/i) ||
    isIphone()
  ) {
    return true
  } else {
    return false
  }
}
