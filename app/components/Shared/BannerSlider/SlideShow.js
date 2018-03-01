/**
*
* BannerSlider
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Image } from 'semantic-ui-react'

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

  render () {
    const { settings, images } = this.props

    return (
      <Slider
        ref={this._innerSliderRef}
        {...settings}>
        {
          images &&
          images.map((item, index) => {
            return (
              <div key={index}>
                {
                  (typeof item === 'string' ? <Image alt='CLiQQ' src={item} /> : '')
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
