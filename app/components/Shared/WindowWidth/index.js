/**
*
* WindowWidth
*
*/

import React, { PureComponent } from 'react'
import { isMobileDevice } from 'utils/http'

export default function WindowWidth (WrapperComponent) {
  class WindowWidthComponent extends PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor (props) {
      super(props)
      this.state = {
        width: document.documentElement.clientWidth
      }
      this._handleWidthResize = this._handleWidthResize.bind(this)
    }

    _handleWidthResize () {
      this.setState({
        width: window.innerWidth
      })
    }

    _isMobileDevice = () => {
      return isMobileDevice()
    }

    // componentDidMount () {
    //   window.addEventListener('resize', this._handleWidthResize)
    // }

    // componentWillUnmount () {
    //   window.removeEventListener('resize', this._handleWidthResize)
    // }

    render () {
      const { width } = this.state
      return (
        <WrapperComponent
          windowWidth={width}
          isMobileDevice={this._isMobileDevice}
          {...this.props}
        />
      )
    }
  }

  return WindowWidthComponent
}
