/**
*
* UserAgentRouter
*
*/
import { isMobileDevice } from 'utils/http'

export default function UserAgentRouter (Component) {
  const baseUrl = process.env.APP_BASE_URL && process.env.APP_BASE_URL.split('/')[2]

  const location = window.location
  const host = location.host
  const mainUri = location.host + location.pathname + location.search

  const isMobile = location.protocol + '//m.' + mainUri

  if (isMobileDevice()) {
    if (host === baseUrl) {
      window.location = isMobile
    }
  } else {
    if (host === 'm.' + baseUrl) {
      window.location = location.protocol + '//' + mainUri.split('.')[1]
    }
  }

  return Component
}
