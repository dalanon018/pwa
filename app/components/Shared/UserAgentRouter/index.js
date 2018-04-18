/**
*
* UserAgentRouter
*
*/
import { isMobileDevice } from 'utils/http'
import { DESKTOP_URL, MOBILE_URL } from 'containers/App/constants'

export default function UserAgentRouter (Component) {
  const location = window.location
  const host = location.protocol + '//' + location.host
  const mainUri = location.pathname + location.search

  const urlRedirect = url => { window.location = url + mainUri }
  const triggerUserAgent = url => url && url.indexOf(host) !== -1

  if (isMobileDevice()) {
    if (triggerUserAgent(DESKTOP_URL)) {
      urlRedirect(MOBILE_URL)
    }
  } else {
    if (triggerUserAgent(MOBILE_URL)) {
      urlRedirect(DESKTOP_URL)
    }
  }

  return Component
}
