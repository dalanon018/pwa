/**
*
* BrowserCheck
*
*/

import React from 'react'
import BrowserSupport, { detectBrowser } from 'react-browser-support'
import { MIN_BROWSER_VERSIONS } from 'containers/App/constants'

export default function BrowserCheck (Component) {
  class BrowserCheckComponent extends React.Component {
    state = {
      browser: {}
    }

    componentDidMount () {
      this.setState({ browser: detectBrowser() })
    }

    render () {
      const { browser: {name, version} } = this.state
      const requiredBrowserVersion = MIN_BROWSER_VERSIONS[name]
      const currentBrowserVersion = Math.abs(parseFloat(version))
      let appComponent

      if (parseFloat(requiredBrowserVersion) > currentBrowserVersion) {
        appComponent = <BrowserSupport
          supported={MIN_BROWSER_VERSIONS}>
          <b>{name} (version: {version}) unsupported</b>
          <div>We don't seem to support your browser 😳</div>
          <div>Update your browser to latest version 😉</div>
        </BrowserSupport>
      } else {
        appComponent = <Component />
      }

      return appComponent
    }
  }

  return BrowserCheckComponent
}
