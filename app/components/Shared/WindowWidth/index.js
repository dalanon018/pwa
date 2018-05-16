/**
*
* WindowWidth
*
*/

import React, { PureComponent } from 'react'

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
          {...this.props}
        />
      )
    }
  }

  return WindowWidthComponent
}
