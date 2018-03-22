/**
*
* BannerSlider
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Image } from 'semantic-ui-react'

import { ifElse, gt } from 'ramda'
import { noop } from 'lodash'

import RibbonWrapper from 'components/Shared/RibbonWrapper'

class SlideShow extends React.PureComponent {
  static propTypes = {
    isLowerdots: PropTypes.bool,
    isInfinite: PropTypes.bool,
    images: PropTypes.array.isRequired,
    slidesToShow: PropTypes.number,
    settings: PropTypes.object.isRequired
  }

  state = {
    rightSpace: ''
  }

  assignTimeOut

  _innerSliderRef = (c) => {
    this.slider = c
  }

  _initNextSlide = () => {
    const { innerSlider } = this.slider

    this.assignTimeOut = setTimeout(() => {
      innerSlider.__isMounted && innerSlider.slickNext()
    }, 3500)
  }

  _clearTimeOut = () => {
    clearTimeout(this.assignTimeOut)
  }

  _handleMarginComputation = () => {
    const image = document.getElementById('slick-image-handler')

    this.setState({ rightSpace: image.offsetLeft })
  }

  componentDidMount () {
    const { props } = this.slider
    const shouldSlideNext = ifElse(gt(props.children.length), this._initNextSlide, noop)

    this._handleMarginComputation()
    window.addEventListener('resize', this._handleMarginComputation)
    shouldSlideNext(1)
  }

  componentDidUpdate () {
    this._handleMarginComputation()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._handleMarginComputation)
  }

  render () {
    const { settings, images } = this.props

    return (
      <Slider
        ref={this._innerSliderRef}
        {...settings}
        afterChange={this._clearTimeOut}>
        {
          images &&
          images.map((item, index) => {
            return (
              <div key={index}>
                {
                  (typeof item === 'string'
                  ? <div className='position__relative'>
                    <RibbonWrapper rightSpace={this.state.rightSpace} />
                    <Image id='slick-image-handler' alt='CLiQQ' src={item} />
                  </div>
                  : '')
                }
              </div>
            )
          })
        }
      </Slider>
    )
  }
}

export default SlideShow
