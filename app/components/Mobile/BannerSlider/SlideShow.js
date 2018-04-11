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
import TimerWrapper from 'components/Mobile/TimerWrapper'

class SlideShow extends React.PureComponent {
  static propTypes = {
    isLowerdots: PropTypes.bool,
    isInfinite: PropTypes.bool,
    images: PropTypes.array.isRequired,
    slidesToShow: PropTypes.number,
    settings: PropTypes.object.isRequired
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

  _handleLightBox = imageIndex => () => this.props.toggleLightBox(imageIndex.toString())

  componentDidMount () {
    const { props } = this.slider
    const shouldSlideNext = ifElse(gt(props.children.length), this._initNextSlide, noop)

    shouldSlideNext(1)
  }

  render () {
    const { settings, images, isHome, percentage, isPromo, promo } = this.props

    return (
      <Slider
        ref={this._innerSliderRef}
        {...settings}
        afterChange={this._clearTimeOut}>
        {
          images &&
          images.map((item, index) => {
            return (
              <div key={index} onClick={this._handleLightBox(index)}>
                {
                  (typeof item === 'string'
                  ? <div className='position__relative'>
                    { !isHome && percentage && <RibbonWrapper rightSpace percentage={percentage} /> }
                    { isPromo && <TimerWrapper promo={promo} /> }
                    <Image className='slick-image-handler' alt='CLiQQ' src={item} />
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
