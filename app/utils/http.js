import { compose, concat, join, map, toPairs } from 'ramda'
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

export const isMobileDevice = () => {
  const useragent = navigator.userAgent

  if (
    useragent.match(/Android/i) ||
    useragent.match(/webOS/i) ||
    useragent.match(/iPhone/i) ||
    useragent.match(/iPod/i) ||
    useragent.match(/iPad/i) ||
    useragent.match(/Windows Phone/i) ||
    useragent.match(/SymbianOS/i) ||
    useragent.match(/RIM/i) ||
    useragent.match(/BB/i)
  ) {
    return true
  } else {
    return false
  }
}
