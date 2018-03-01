import React, { Component, PropTypes } from 'react'
// import styled from 'styled-components'

// const AffixWrapper = styled.div`
//   ${
//     props =>
//     props.affix
//     ? 'position: absolute;top: ' + props.top + 'px;width: 100%;'
//     : 'position: fixed;width: 50.5%;@media (min-width: 1025px){width: 31%!important;}'
//   }
// `

class Affix extends Component {
  static propTypes = {
    offset: PropTypes.number
  };

  static defaultProps = {
    offset: 0
  };

  constructor () {
    super()
    this.state = {
      affix: false
    }
  }

  handleScroll = () => {
    const affix = this.state.affix
    const offset = this.props.offset
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (!affix && scrollTop >= offset) {
      this.setState({
        affix: true
      })
    }

    if (affix && scrollTop < offset) {
      this.setState({
        affix: false
      })
    }
  };

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    const affix = this.state.affix ? 'affix' : ''
    const { className, top, ...props } = this.props

    return (
      <div id='affix-element' {...props} className={`${className || ''} ${affix}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Affix
